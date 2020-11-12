import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

import { Preparation, Recipe } from '../../../../../core/models/models';
import { AdminService } from '../../../pages/recipe-admin/services/admin.service';
import { ColumnsGrid } from 'src/app/core/models/ColumnsGrid';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes$: Observable<Recipe[]>;
  public gridApi;
  public gridColumnApi;

  public selectedPrep: Preparation;

  public defaultColDef: any;
  public columnDefs: ColumnsGrid[];
  public rowData: Recipe[];
  private subs: Subscription;
  constructor(@Inject(DOCUMENT)
              private document: Document,
              private service: AdminService,
              private toast: ToastrService,
              private cdr: ChangeDetectorRef ) { }

  @Output()
  public editRecipe = new EventEmitter<Recipe>();

  ngOnInit(): void {
    this.service.newRecipeAdded$.subscribe((rec: Recipe) => {
      this.rowData = this.rowData.filter((reci) => reci.id !== rec.id);
      this.rowData.push(rec);
      this.cdr.markForCheck();
   });
  }

  onDelete(id: string) {
    if (confirm('Esta seguro de eliminar esta receta?')) {
      this.service.deleteRecipe(id).subscribe((res) => {
        this.toast.success('Receta eliminada!');
        this.rowData = this.rowData.filter((rec) => rec.id !== id);
        this.editRecipe.emit(null);
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
    this.editRecipe.emit(selectedRows[0]);
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
      { field: 'name', headerName: 'Receta', width: '400' },
      { field: 'description', headerName: 'Descripcion', width: '350' },
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
    this.subs = this.service.getRecipes().subscribe((recipes) => {
      this.columnDefs = this.prepareGridColumns();
      this.rowData = recipes;
      this.cdr.markForCheck();
    });
  }

}
