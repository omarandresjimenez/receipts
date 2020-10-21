import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/userModel';
import { ColumnsGrid } from 'src/app/core/models/ColumnsGrid';
import { ToastrService } from 'ngx-toastr';


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

  private subs: Subscription;
  constructor(private service: UserService,
              private toast: ToastrService,
              private cdr: ChangeDetectorRef ) { }

  @Output()
  public editUser = new EventEmitter<{}>();

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



  onDelete($event: MouseEvent, userName: string) {
    $event.stopPropagation();
    if (confirm('Are you sure?')) {
      this.service.deleteUser(userName).subscribe((res) => {
        this.toast.success('User removed successfuly');

        this.cdr.markForCheck();
      });
    }
  }

  onEditUser(user: UserModel) {
      this.editUser.emit({user});
  }

}
