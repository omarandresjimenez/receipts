import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { LoggedInGuard } from '../../core/services/logged-in.guard';
import { AdminGuard } from '../../core/services/admin.guard';


const routes: Routes = [{
  path: '',
  component: ContainerComponent,
  children: [
    {
      path: 'users',
      loadChildren: () => import('../admin/pages/user/user.module').then((m) => m.UserModule),
      canLoad: [ AdminGuard ],
      canActivate: [ AdminGuard ],
    },
    {
      path: 'admin-recipe',
      loadChildren: () => import('../admin/pages/recipe-admin/admin-recipe.module').then((m) => m.AdminRecipeModule),
      canLoad: [ AdminGuard ],
      canActivate: [ AdminGuard ],
    },
    {
      path: 'admin-user',
      loadChildren: () => import('../admin/pages/user/user.module').then((m) => m.UserModule),
      canLoad: [ AdminGuard ],
      canActivate: [ AdminGuard ],
    },
    {
      path: 'profile',
      loadChildren: () => import('../admin/pages/userprofile/user-profile.module').then((m) => m.UserProfileModule),
      canLoad: [ LoggedInGuard ],
      canActivate: [ LoggedInGuard ],
    },
    {
      path: 'catalog',
      component: CatalogComponent,
    },
   { path: '', redirectTo: 'catalog', pathMatch: 'full' },
   { path: '**', redirectTo: '/', pathMatch: 'full' },
 ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
