import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterModule } from './register/register.module';
import { CheckoutModule } from './baskets/checkout/checkout.module';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    CheckoutModule,
    OrderModule
  ],
  exports: [BasketsModule],
})
export class ComponentsModule {}
