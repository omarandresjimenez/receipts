import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsularRegionComponent } from './insular.component';





const routes: Routes = [{
  path: '',
  component: InsularRegionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsularRegionRoutingModule { }
