import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmazoniaRegionComponent } from './amazonia.component';





const routes: Routes = [{
  path: '',
  component: AmazoniaRegionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmazoniaRegionRoutingModule { }
