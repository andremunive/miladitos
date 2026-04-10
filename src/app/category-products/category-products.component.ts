import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { trigger, transition, style, animate } from '@angular/animations';
import { PRODUCTS, CATEGORY_NAMES, SUBCATEGORIES_BY_CATEGORY, Product, Subcategory } from '../data/products.data';
import { addToCart } from '../store/cart/cart.actions';
import { CartFabService } from '../services/cart-fab.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
  animations: [
    trigger('subcategoryExpand', [
      transition(':enter', [
        style({ opacity: 0, maxHeight: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ opacity: 1, maxHeight: '4000px' }))
      ]),
      transition(':leave', [
        style({ overflow: 'hidden' }),
        animate('250ms ease-in', style({ opacity: 0, maxHeight: 0 }))
      ])
    ])
  ]
})
export class CategoryProductsComponent {
  categoryId = '';
  categoryName = '';
  subcategories: Subcategory[] = [];
  products: Product[] = [];
  expandedSubcategories: Record<string, boolean> = {};
  productQuantities: Record<string, number> = {};
  selectedSizes: Record<string, string> = {};

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private cartFab: CartFabService,
    private toast: ToastService
  ) {
    const path = this.route.snapshot.routeConfig?.path || '';
    this.categoryId = path;
    this.categoryName = CATEGORY_NAMES[path] || path;
    this.subcategories = SUBCATEGORIES_BY_CATEGORY[path] || [];
    this.products = PRODUCTS.filter(p => p.categoryId === path);

    // Expandir la primera subcategoría por defecto
    if (this.subcategories.length > 0) {
      this.expandedSubcategories[this.subcategories[0].id] = true;
    }

    this.products.forEach(p => {
      this.productQuantities[p.id] = 1;
      if (p.sizes && p.sizes.length > 0) {
        this.selectedSizes[p.id] = p.sizes[0].id;
      }
    });
  }

  isExpanded(subcategoryId: string): boolean {
    return !!this.expandedSubcategories[subcategoryId];
  }

  toggleSubcategory(subcategoryId: string): void {
    this.expandedSubcategories[subcategoryId] = !this.expandedSubcategories[subcategoryId];
  }

  getProductsBySubcategory(subcategoryId: string): Product[] {
    return this.products.filter(p => p.subcategoryId === subcategoryId);
  }

  getQuantity(productId: string): number {
    return this.productQuantities[productId] ?? 1;
  }

  addOne(productId: string): void {
    this.productQuantities[productId] = (this.productQuantities[productId] ?? 1) + 1;
  }

  subtractOne(productId: string): void {
    const current = this.productQuantities[productId] ?? 1;
    if (current <= 1) return;
    this.productQuantities[productId] = current - 1;
  }

  getSelectedSizeId(productId: string): string {
    return this.selectedSizes[productId] || 'grande';
  }

  selectSize(productId: string, sizeId: string): void {
    this.selectedSizes[productId] = sizeId;
  }

  private parsePrice(priceStr: string): number {
    const cleaned = priceStr.replace(/\$/g, '').replace(/\./g, '').trim();
    return parseInt(cleaned, 10) || 0;
  }

  private formatPrice(value: number): string {
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  getDisplayPrice(product: Product): string {
    let unitPrice: number;
    if (product.sizes) {
      const sizeId = this.getSelectedSizeId(product.id);
      const size = product.sizes.find(s => s.id === sizeId);
      unitPrice = this.parsePrice(size?.price || '$0');
    } else {
      unitPrice = this.parsePrice(product.price || '$0');
    }
    const qty = this.getQuantity(product.id);
    return this.formatPrice(unitPrice * qty);
  }

  getSelectedSizeDetail(product: Product): string {
    if (!product.sizes) return '';
    const sizeId = this.getSelectedSizeId(product.id);
    const size = product.sizes.find(s => s.id === sizeId);
    return size?.detail || '';
  }

  addToCart(product: Product): void {
    const quantity = this.getQuantity(product.id);
    let cartId: string;
    let price: string;
    let description: string;

    if (product.sizes) {
      const sizeId = this.getSelectedSizeId(product.id);
      const size = product.sizes.find(s => s.id === sizeId)!;
      cartId = `${product.id}-${sizeId}`;
      price = size.price;
      const subTitle = this.subcategories.find(s => s.id === product.subcategoryId)?.title || '';
      description = `${subTitle} · ${size.detail}`;
    } else {
      cartId = product.id;
      price = product.price!;
      description = product.description;
    }

    this.store.dispatch(addToCart({
      item: {
        productId: cartId,
        name: product.name,
        description,
        price,
        image: product.image,
        quantity
      }
    }));
    this.cartFab.triggerBump();
    this.toast.show(`${product.name} agregado al carrito`, 'success');
    this.productQuantities[product.id] = 1;
  }
}
