import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Preparation } from 'src/app/core/models/models';
import { ColumnsGrid } from 'src/app/core/models/ColumnsGrid';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';





@Component({
  templateUrl: './preparation-list.component.html',
  styleUrls: ['./preparation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreparationListAdminActivationComponent implements OnInit, OnDestroy {
  public gridApi;
  public gridColumnApi;

  public defaultColDef: any;
  public columnDefs: ColumnsGrid[];
  public rowData: Preparation[];

  public selectedPrep: Preparation;

  private subs: Subscription;
  constructor(@Inject(DOCUMENT)
              private document: Document,
              private service: AdminService,
              // private cityService: CitiesService,
              private toast: ToastrService,
              private modal: ModalService,
              private cdr: ChangeDetectorRef ) { }


  ngOnInit(): void {
   //  this.regions$ = this.cityService.getRegions();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
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
      { field: '', headerName: '',
        cellRenderer: (params) => {
          const span = this.document.createElement('span');
          span.innerHTML = '<i class="fas fa-edit" alt="Editar Preparacion"></i>';
          span.className = 'link';
          span.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.onEditPrep(params?.data);
          });
          return span;
       },
       width: '60px', filter: '', floatingFilter: false
      },
      { field: 'id', hide: true },
      { field: 'recipeName', headerName: 'Receta', width: '220' },
      { field: 'name', headerName: 'Nombre Preparacion', width: '220' },
      { field: 'description', headerName: 'Descripción', width: '350' },
      { field: '', headerName: '',
          cellRenderer: (params) => {
            const span = this.document.createElement('span');
            span.innerHTML = params.data?.User?.name  + ' ' + params.data?.User?.lastName;
            span.className = 'link';
            span.addEventListener('click', (event) => {
              event.preventDefault();
              event.stopPropagation();
              this.onClickUser(params?.data.User);
            });
            return span;
        },
        width: '200px',
    },
      { field: 'carrierCommunity', headerName: 'Comunidad portadora', width: '200' },
      { field: 'preparationType', headerName: 'Tipo preparación', width: '200' },
      { field: 'authorName', headerName: 'Autor preparación', width: '200' },

    ];
  }

  onSelectRow($event) {
      const selectedRows = this.gridApi?.getSelectedRows();
      // console.log(selectedRows);
  }

  onDeletePrep(prepId: string) {
    this.service.deletePreparation (prepId).subscribe((res) => {
        this.toast.success('Preparación eliminada');
        this.rowData = this.rowData.filter((p) => p.id !== prepId);
        this.closeModal('prepcard');
        this.cdr.markForCheck();
      });
  }

  onEditPrep($event) {
    this.selectedPrep = $event;
    this.openModal('prepcard');
    this.cdr.markForCheck();
  }

  onClickUser($event) {
    this.selectedPrep = $event;
    this.openModal('prepcard');
    this.cdr.markForCheck();
  }

  onSavePrep(prep: Preparation) {
    this.service.updateAdminPreparation(prep.id, prep.active).subscribe((res) => {
      this.toast.success('Preparación Activada');
      this.rowData = this.rowData.filter(p => p.id !== prep.id);
      this.closeModal('prepcard');
      this.cdr.markForCheck();
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.initGridOptions();
    this.columnDefs = this.prepareGridColumns();
    this.subs = this.service.getInactivePreparations().subscribe( preps => {
      this.rowData = preps;
      this.cdr.markForCheck();
    });
  }


  openModal(id: string) {
    this.modal.open(id);
}

  closeModal(id: string) {
    this.modal.close(id);
}

}
