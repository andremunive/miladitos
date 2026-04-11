import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalCount,
  formatPrice,
} from '../store/cart/cart.selectors';
import { CartItem } from '../store/cart/cart.reducer';
import { clearCart } from '../store/cart/cart.actions';

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

  isSending = false;

  formatPrice = formatPrice;

  constructor(
    private store: Store,
    private location: Location,
    private http: HttpClient,
  ) {
    this.totalAmount$ = this.store.select(selectCartTotalAmount);
    this.cartCount$ = this.store.select(selectCartTotalCount);
  }

  confirmOrder(): void {
    if (this.isSending) {
      return;
    }

    this.store
      .select(selectCartItems)
      .pipe(take(1))
      .subscribe((items) => {
        const message = this.buildWhatsAppMessage(items);
        const subject = this.buildEmailSubject();
        const html = message.replace(/\n/g, '<br />');

        this.isSending = true;

        this.http
          .post('https://miladitos.netlify.app/.netlify/functions/send-order-email', {
            subject,
            html,
          })
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.openWhatsApp(message);
              this.store.dispatch(clearCart());
            },
            error: (error) => {
              console.error('Error al enviar el correo de pedido', error);
              // Aún así permitimos que el usuario continúe con el pedido por WhatsApp
              this.openWhatsApp(message);
            },
            complete: () => {
              this.isSending = false;
            },
          });
      });
  }

  private buildEmailSubject(): string {
    const now = new Date();

    const pad = (value: number) => value.toString().padStart(2, '0');

    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear().toString();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());

    const code = `${day}${month}${year}${hours}${minutes}`;

    return `Orden Miladitos #${code}`;
  }

  private openWhatsApp(message: string): void {
    const url = `https://wa.me/573245709801?text=${encodeURIComponent(message)}`;
    window.location.href = url;
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
      lines.push(`Detalle: ${this.getDetalle(item)}`);
      lines.push(`Preparación: ${this.getPreparacion(item)}`);
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

  private getDetalle(item: CartItem): string {
    if (item.productId.endsWith('-grande')) return 'Bandeja grande';
    if (item.productId.endsWith('-mediana')) return 'Bandeja mediana';
    return 'N/A';
  }

  private getPreparacion(item: CartItem): string {
    if (item.description.includes(' · ')) {
      return item.description.split(' · ')[0];
    }
    if (item.productId.includes('fritos')) return 'Fritos';
    if (item.productId.includes('congelados')) return 'Congelados';
    return 'N/A';
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
