import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy,
         ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

import { Preparation } from 'src/app/core/models/models';
import { PreparationService } from '../../preparation-admin/services/admin.service';
import { ColumnsGrid } from 'src/app/core/models/ColumnsGrid';
import { UserSessionService } from 'src/app/core/services/session.service';



@Component({
  selector: 'app-preparation-list',
  templateUrl: './preparation-list.component.html',
  styleUrls: ['./preparation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreparationListComponent implements OnInit, OnDestroy {
  public preparations$: Observable<Preparation[]>;
  public gridApi;
  public gridColumnApi;

  public selectedPrep: Preparation;

  public defaultColDef: any;
  public columnDefs: ColumnsGrid[];
  public rowData: any[];
  private subs: Subscription;
  constructor(@Inject(DOCUMENT)
              private document: Document,
              private service: PreparationService,
              private sessionService: UserSessionService,
              private toast: ToastrService,
              private cdr: ChangeDetectorRef ) { }

  @Output()
  public editPreparation = new EventEmitter<Preparation>();

  ngOnInit(): void {
    this.service.newpreparationAdded$.subscribe((rec: Preparation) => {
      this.rowData = this.rowData.filter((reci) => reci.id !== rec.id);
      this.rowData.push(rec);
      this.cdr.markForCheck();
   });
  }

  onDelete(id: string) {
    if (confirm('Esta seguro de eliminar esta preparación?')) {
      this.service.deletePreparation(id).subscribe((res) => {
        this.toast.success('Receta eliminada!');
        this.rowData = this.rowData.filter((rec) => rec.id !== id);
        this.cdr.markForCheck();
      });
    }
  }



  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }


  onSelectRow($event) {
    const selectedRows = this.gridApi?.getSelectedRows();
    this.editPreparation.emit(selectedRows[0]);
  }

  private initGridOptions() {
    this.defaultColDef = {
      width: 170,
      editable: false,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
      sortable: true,
    };
  }
  private prepareGridColumns(): ColumnsGrid[] {
    return [
      { field: 'id', hide: true },
      { field: 'recipeName', headerName: 'Receta', width: '220' },
      { field: 'name', headerName: 'Nombre', width: '220' },
      { field: 'description', headerName: 'Descripción', width: '350' },
      { field: 'cookingTechnique', headerName: 'Técnica de cocina usada', width: '200' },
      { field: 'preparationType', headerName: 'Tipo preparación', width: '200' },
      { field: 'userName', headerName: 'Autor preparación', width: '200' },
      { field: 'active', headerName: 'Activo', width: '100',
      cellRenderer: (params) => {
        return params.data?.active ? 'Si' : 'No';
      }
    },
      { field: '', headerName: '',
      cellRenderer: (params) => {
        const span = this.document.createElement('span');
        span.innerHTML = '<i class="far fa-trash-alt fa-lg text-danger" ></i>';
        span.className = 'link';
        span.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.onDelete(params?.data.id);
        });
        return span;
     },
     width: '60px', filter: '', floatingFilter: false
    },
    ];
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.initGridOptions();
    this.subs = this.service.getPreparations(this.sessionService.getCurrentUser()?.id)
                   .subscribe((preparations) => {
                      this.columnDefs = this.prepareGridColumns();
                      this.rowData = preparations.map((prep) => {
                        return { ...prep, userName: prep.author.name + ' ' + prep.author.lastName,
                                 recipeName: prep.recipe.name, cookingTechnique: prep.cookingTechnique.name };
                      });
                      this.cdr.markForCheck();
                    });
  }

}
