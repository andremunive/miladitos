import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { cartReducer, cartMetaReducer } from './store/cart/cart.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    CategoryProductsComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { cart: cartReducer },
      { metaReducers: [cartMetaReducer] }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
