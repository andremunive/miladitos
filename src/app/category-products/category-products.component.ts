import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { trigger, transition, style, animate } from '@angular/animations';
import { PRODUCTS, CATEGORY_NAMES, SUBCATEGORIES_BY_CATEGORY, Product, Subcategory } from '../data/products.data';
import { addToCart } from '../store/cart/cart.actions';
import { CartFabService } from '../services/cart-fab.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
  animations: [
    trigger('subcategoryExpand', [
      transition(':enter', [
        style({ opacity: 0, maxHeight: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ opacity: 1, maxHeight: '2000px' }))
      ]),
      transition(':leave', [
        style({ overflow: 'hidden' }),
        animate('250ms ease-in', style({ opacity: 0, maxHeight: 0 }))
      ])
    ])
  ]
})
export class CategoryProductsComponent {
  categoryId: string = '';
  categoryName: string = '';
  subcategories: Subcategory[] = [];
  products: Product[] = [];
  expandedSubcategories: Record<string, boolean> = {};
  productQuantities: Record<string, number> = {};

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private cartFab: CartFabService
  ) {
    const path = this.route.snapshot.routeConfig?.path || '';
    this.categoryId = path;
    this.categoryName = CATEGORY_NAMES[path] || path;
    this.subcategories = SUBCATEGORIES_BY_CATEGORY[path] || [];
    this.products = PRODUCTS.filter(p => p.categoryId === path);
    this.subcategories.forEach(sub => {
      this.expandedSubcategories[sub.id] = sub.id === 'deditos';
    });
    this.products.forEach(p => {
      this.productQuantities[p.id] = 1;
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

  private parsePrice(priceStr: string): number {
    const cleaned = priceStr.replace(/\$/g, '').replace(/\./g, '').trim();
    return parseInt(cleaned, 10) || 0;
  }

  private formatPrice(value: number): string {
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  getDisplayPrice(product: Product): string {
    const unitPrice = this.parsePrice(product.price);
    const qty = this.getQuantity(product.id);
    return this.formatPrice(unitPrice * qty);
  }

  addToCart(product: Product): void {
    const quantity = this.getQuantity(product.id);
    this.store.dispatch(addToCart({
      item: {
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity
      }
    }));
    this.cartFab.triggerBump();
  }
}
