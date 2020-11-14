import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacificRegionComponent } from './pacific.component';





const routes: Routes = [{
  path: '',
  component: PacificRegionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacificRegionRoutingModule { }
