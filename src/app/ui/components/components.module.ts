import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BasketsComponent } from './baskets/baskets.component';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    //LoginModule,

  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
