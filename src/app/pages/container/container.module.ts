
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container.routing.module';

import { ContainerComponent } from './container.component';

import { HeaderModule } from 'src/app/share/widgets/header/header.module';
import { CatalogModule} from '../catalog/catalog.module';



@NgModule({
  declarations: [
    ContainerComponent,
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    HeaderModule,
    CatalogModule,
  ],
  providers: [],
  bootstrap: []
})
export class ContainerModule { }
