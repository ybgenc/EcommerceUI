import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    DashboardModule,
    NgxSpinnerModule,
    AuthorizeMenuModule

  ]
})
export class ComponentsModule { }
