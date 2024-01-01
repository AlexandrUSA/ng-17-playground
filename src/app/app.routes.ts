import { Routes } from '@angular/router';
import { LayoutAppComponent } from './core/layouts/view/layout-app/layout-app.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/view/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: '',
    component: LayoutAppComponent,
    children: [
      {
        path: 'users',
        loadComponent: () => import('./pages/users/view/users/users.component').then(c => c.UsersComponent),
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
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];
