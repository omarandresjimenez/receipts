import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VirtualMapBaseComponent } from './base.component';
import { VirtualMapComponent } from './virtual-map.component';



const routes: Routes = [{
  path: '',
  component: VirtualMapBaseComponent,
  children: [
    {
      path: '',
      component: VirtualMapComponent,
    },
    {
      path: 'andean-region',
      loadChildren: () => import('./views/andina/andina.module').then((m) => m.AndeanRegionModule),
    },
    {
      path: 'caribean-region',
      loadChildren: () => import('./views/caribe/caribe.module').then((m) => m.CaribeanRegionModule),
    },
    {
      path: 'pacific-region',
      loadChildren: () => import('./views/pacifica/pacific.module').then((m) => m.PacificRegionModule),
    },
    {
      path: 'insular-region',
      loadChildren: () => import('./views/insular/insular.module').then((m) => m.InsularRegionModule),
    },
    {
      path: 'orinoquia-region',
      loadChildren: () => import('./views/orinoquia/orinoquia.module').then((m) => m.OrinoquiaRegionModule),
    },
    {
      path: 'amazonia-region',
      loadChildren: () => import('./views/amazonica/amazonia.module').then((m) => m.AmazoniaRegionModule),
    },

  ],

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualMapRoutingModule { }
