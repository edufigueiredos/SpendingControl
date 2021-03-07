import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./core/pages/dashboard/dashboard.module').then(module => module.DashboardModule) },
  { path: 'category', loadChildren: () => import('./core/pages/category/category.module').then(module => module.CategoryModule)},
  { path: 'income', loadChildren: () => import('./core/pages/income/income.module').then(module => module.IncomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
