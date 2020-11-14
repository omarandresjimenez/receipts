import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaribeanRegionComponent } from './caribe.component';





const routes: Routes = [{
  path: '',
  component: CaribeanRegionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaribeanRegionRoutingModule { }
