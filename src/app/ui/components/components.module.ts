import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    LoginModule,

  ]
})
export class ComponentsModule { }
