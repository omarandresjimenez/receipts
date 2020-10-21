import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/userModel';
import { ColumnsGrid } from 'src/app/core/models/ColumnsGrid';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnDestroy {
  public users$: Observable<[UserModel]>;


  public gridApi;
  public gridColumnApi;

  public defaultColDef: any;
  public columnDefs: ColumnsGrid[];
  public rowData: UserModel[];

  public selectedUser: UserModel;

  private subs: Subscription;
  constructor(@Inject(DOCUMENT)
              private document: Document,
              private service: UserService,
              private toast: ToastrService,
              private modal: ModalService,
              private cdr: ChangeDetectorRef ) { }


  ngOnInit(): void {
    this.initGridOptions();
    this.subs = this.service.getUsers().subscribe((users) => {
      this.columnDefs = this.prepareGridColumns();
      this.rowData = users;
    });
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
          span.innerHTML = '<i class="fas fa-edit" alt="Edit User"></i>';
          span.className = 'link';
          span.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.onEditUser(params?.data);
          });
          return span;
       },
       width: '50px', filter: '', floatingFilter: false
      },
      { field: 'name', headerName: 'Nombres' },
      { field: 'lastName', headerName: 'Apellidos' },
      { field: 'identification', headerName: 'Identificacion' },
      { field: 'age', headerName: 'Edad', filter: 'agNumberColumnFilter' },
      { field: 'email', headerName: 'Email' },
      { field: 'phone', headerName: 'Telefono' },
      { field: 'regionName', headerName: 'Region' },
      { field: 'stateName', headerName: 'Departamento' },
      { field: 'cityName', headerName: 'Ciudad' },
      { field: 'creationDate', headerName: 'Fecha creado' },
      { field: 'role', headerName: 'Role' },
      { field: 'active', headerName: 'Activo' },

    ];
  }

  onSelectRow($event) {
      const selectedRows = this.gridApi?.getSelectedRows();
      // console.log(selectedRows);
  }

  onDeleteUser(userEmail: string) {
    this.service.deleteUser(userEmail).subscribe((res) => {
        this.toast.success('Usuario eliminado');
        this.rowData = this.rowData.filter((user) => user.email !== userEmail);
        this.closeModal('usercard');
        this.cdr.markForCheck();
      });
  }

  onEditUser($event) {
    this.selectedUser = $event;
    this.openModal('usercard');
    this.cdr.markForCheck();
  }

  onSaveUser(user: UserModel) {
    this.service.updateUserAdmin(user.email, user.role, user.active).subscribe((res) => {
      this.toast.success('Usuario actualizado');
      this.rowData = this.rowData.filter((usr) => usr.email !== user.email);
      this.rowData.push(user);
      this.closeModal('usercard');
      this.cdr.markForCheck();
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  openModal(id: string) {
    this.modal.open(id);
}

  closeModal(id: string) {
    this.modal.close(id);
}

}
