import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, filter, startWith } from 'rxjs/operators';
import { ToastService } from './services/toast.service';
import { CartFabService } from './services/cart-fab.service';
import { selectCartTotalCount } from './store/cart/cart.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'miladitos';
  toast$ = this.toast.toast$;
  cartCount$ = this.store.select(selectCartTotalCount);

  showCartFab$: Observable<boolean> = combineLatest([
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    ),
    this.cartCount$
  ]).pipe(
    map(([url, count]) => {
      const isCart = url.includes('carrito');
      const isCheckout = url.includes('checkout');
      return !isCart && !isCheckout && count > 0;
    })
  );

  badgeBump = false;

  constructor(
    public toast: ToastService,
    private router: Router,
    private store: Store,
    private cartFab: CartFabService
  ) {
    this.cartFab.bumpTrigger$.subscribe(() => {
      this.badgeBump = true;
      setTimeout(() => (this.badgeBump = false), 400);
    });
  }
}
