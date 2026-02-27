import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  state => state.items
);

export const selectCartTotalCount = createSelector(
  selectCartItems,
  items => items.reduce((sum, item) => sum + item.quantity, 0)
);

function parsePrice(priceStr: string): number {
  const cleaned = (priceStr || '').replace(/\$/g, '').replace(/\./g, '').trim();
  return parseInt(cleaned, 10) || 0;
}

export const selectCartTotalAmount = createSelector(
  selectCartItems,
  items => items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)
);

export function formatPrice(value: number): string {
  return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
