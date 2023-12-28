import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/view/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/view/products/products.component').then(c => c.ProductsComponent),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-details/view/product-details/product-details.component').then(
        c => c.ProductDetailsComponent,
      ),
  },
];
