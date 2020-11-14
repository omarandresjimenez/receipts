import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrinoquiaRegionComponent } from './orinoquia.component';





const routes: Routes = [{
  path: '',
  component: OrinoquiaRegionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrinoquiaRegionRoutingModule { }
