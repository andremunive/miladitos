import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalCount,
  formatPrice,
} from '../store/cart/cart.selectors';
import { CartItem } from '../store/cart/cart.reducer';
import { clearCart } from '../store/cart/cart.actions';
import { PRODUCTS, CATEGORY_NAMES } from '../data/products.data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  totalAmount$: Observable<number>;
  cartCount$: Observable<number>;
  formData = {
    nombre: '',
    direccion: '',
    celular: '',
    metodoPago: 'efectivo' as 'efectivo' | 'transferencia',
  };

  formatPrice = formatPrice;

  constructor(private store: Store, private location: Location) {
    this.totalAmount$ = this.store.select(selectCartTotalAmount);
    this.cartCount$ = this.store.select(selectCartTotalCount);
  }

  confirmOrder(): void {
    this.store
      .select(selectCartItems)
      .pipe(take(1))
      .subscribe((items) => {
        const message = this.buildWhatsAppMessage(items);
        const url = `https://wa.me/573245709801?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        this.store.dispatch(clearCart());
      });
  }

  private buildWhatsAppMessage(items: CartItem[]): string {
    const lines: string[] = [];
    lines.push('Hola *Miladitos*!!');
    lines.push(
      `Soy ${this.formData.nombre.trim()}, me gustaria hacer este pedido:`,
    );
    lines.push('');
    lines.push('*Detalles del pedido*');
    for (const item of items) {
      lines.push('________________________');
      lines.push(`Producto: ${item.name}`);
      lines.push(`Detalle: ${this.getCategoryLabel(item.productId)}`);
      lines.push(`Cant: ${item.quantity}`);
      lines.push(`Sub. Total: ${this.formatPrice(this.getLineTotal(item))}`);
    }
    lines.push('________________________');
    lines.push(`*Dirección*: ${this.formData.direccion.trim()}`);
    lines.push(`*Celular*: ${this.formData.celular.trim()}`);
    lines.push('________________________');
    const total = items.reduce((sum, item) => sum + this.getLineTotal(item), 0);
    lines.push(`*Subtotal del pedido:* ${this.formatPrice(total)}`);
    const metodoPagoLabel =
      this.formData.metodoPago === 'efectivo' ? 'Efectivo' : 'Transferencia';
    lines.push(`*Metodo de pago:* ${metodoPagoLabel}`);
    lines.push('');
    lines.push('Gracias!');
    return lines.join('\n');
  }

  private getCategoryLabel(productId: string): string {
    const product = PRODUCTS.find((p) => p.id === productId);
    return product ? CATEGORY_NAMES[product.categoryId] : 'N/A';
  }

  private getLineTotal(item: CartItem): number {
    const cleaned = (item.price || '')
      .replace(/\$/g, '')
      .replace(/\./g, '')
      .trim();
    const value = parseInt(cleaned, 10) || 0;
    return value * item.quantity;
  }

  goBack(): void {
    this.location.back();
  }
}
