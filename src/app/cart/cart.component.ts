import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../store/cart/cart.reducer';
import { updateQuantity, removeFromCart } from '../store/cart/cart.actions';
import { selectCartItems, selectCartTotalAmount, selectCartTotalCount, formatPrice } from '../store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;
  cartCount$: Observable<number>;

  constructor(private store: Store, private location: Location) {
    this.items$ = this.store.select(selectCartItems);
    this.totalAmount$ = this.store.select(selectCartTotalAmount);
    this.cartCount$ = this.store.select(selectCartTotalCount);
  }

  formatPrice = formatPrice;

  addOne(item: CartItem): void {
    this.store.dispatch(updateQuantity({
      productId: item.productId,
      quantity: item.quantity + 1
    }));
  }

  subtractOne(item: CartItem): void {
    if (item.quantity <= 1) {
      this.store.dispatch(removeFromCart({ productId: item.productId }));
    } else {
      this.store.dispatch(updateQuantity({
        productId: item.productId,
        quantity: item.quantity - 1
      }));
    }
  }

  removeItem(item: CartItem): void {
    this.store.dispatch(removeFromCart({ productId: item.productId }));
  }

  getLineTotal(item: CartItem): number {
    const unit = (item.price || '').replace(/\$/g, '').replace(/\./g, '').trim();
    const value = parseInt(unit, 10) || 0;
    return value * item.quantity;
  }

  goBack(): void {
    this.location.back();
  }
}
