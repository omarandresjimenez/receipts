import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndeanRegionComponent } from './andina.component';





const routes: Routes = [{
  path: '',
  component: AndeanRegionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndeanRegionRoutingModule { }
