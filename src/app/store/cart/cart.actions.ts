import { createAction, props } from '@ngrx/store';

export interface CartItemPayload {
  productId: string;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

export const addToCart = createAction(
  '[Cart] Add to cart',
  props<{ item: CartItemPayload }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from cart',
  props<{ productId: string }>()
);

export const updateQuantity = createAction(
  '[Cart] Update quantity',
  props<{ productId: string; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear cart');
