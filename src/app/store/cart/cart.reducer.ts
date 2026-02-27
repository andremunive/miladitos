import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, updateQuantity, clearCart, CartItemPayload } from './cart.actions';

export interface CartItem extends CartItemPayload {}

export interface CartState {
  items: CartItem[];
}

const CART_KEY = 'miladitos_cart';

function loadCartFromStorage(): CartState {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) return { items: parsed.items };
    }
  } catch (_) {}
  return { items: [] };
}

export const initialCartState: CartState = loadCartFromStorage();

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { item }) => {
    const existing = state.items.find(i => i.productId === item.productId);
    let newItems;
    if (existing) {
      newItems = state.items.map(i =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      newItems = [...state.items, { ...item }];
    }
    return { items: newItems };
  }),
  on(removeFromCart, (state, { productId }) => ({
    items: state.items.filter(i => i.productId !== productId)
  })),
  on(updateQuantity, (state, { productId, quantity }) => {
    if (quantity < 1) {
      return { items: state.items.filter(i => i.productId !== productId) };
    }
    return {
      items: state.items.map(i =>
        i.productId === productId ? { ...i, quantity } : i
      )
    };
  }),
  on(clearCart, () => ({ items: [] }))
);

export function cartMetaReducer(reducer: (state: any, action: any) => any) {
  return (state: any, action: any) => {
    const nextState = reducer(state, action);
    if (action.type.startsWith('[Cart]')) {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify({ items: nextState.cart?.items ?? [] }));
      } catch (_) {}
    }
    return nextState;
  };
}
