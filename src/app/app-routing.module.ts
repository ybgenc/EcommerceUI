import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';
import { ProductsComponent } from './ui/components/products/products.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'customers',
        loadChildren: () =>
          import('./admin/components/customers/customers.module').then(
            (module) => module.CustomersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./admin/components/orders/orders.module').then(
            (module) => module.OrdersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./admin/components/products/products.module').then(
            (module) => module.ProductsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: `authorize-menu`,
        loadChildren: () =>
          import(
            './admin/components/authorize-menu/authorize-menu.module'
          ).then((module) => module.AuthorizeMenuModule),
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: '', component: ProductsComponent },
  {
    path: 'basket',
    loadChildren: () =>
      import('./ui/components/baskets/baskets.module').then(
        (module) => module.BasketsModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./ui/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'products/:pageNo',
    loadChildren: () =>
      import('./ui/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./ui/components/register/register.module').then(
        (module) => module.RegisterModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./ui/components/login/login.module').then(
        (module) => module.LoginModule
      ),
  },
  {
    path: 'login/ForgotPassword',
    loadChildren: () =>
      import(
        './ui/components/login/forgot-password/forgot-password.module'
      ).then((module) => module.ForgotPasswordModule),
  },
  {
    path: 'update-password/:userId/:resetToken',
    loadChildren: () =>
      import('./ui/components/login/reset-password/reset-password.module').then(
        (module) => module.ResetPasswordModule
      ),
  },
  {
    path: 'checkout/:id',
    loadChildren: () =>
      import('./ui/components/baskets/checkout/checkout.module').then(
        (module) => module.CheckoutModule
      ),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./ui/components/order/order.module').then(
        (module) => module.OrderModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
