import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AdminService } from '../../recipe-admin/services/admin.service';
import { Preparation, Recipe } from '../../../../../core/models/models';
import { DOCUMENT } from '@angular/common';
import { ColumnsGrid } from 'src/app/core/models/ColumnsGrid';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';
import { UserService } from '../../user/services/user.service';
import { combineLatest, from, of } from 'rxjs';
import { map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/UserModel';


@Component({
  selector: 'app-admin-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRecipeFormComponent implements OnInit, OnChanges {
  public newRecipe = true;
  public recipeData: Recipe = { id: '0', name: '', description: '', imageURL: '', preparations: []};

  public avatarBgSize: any = '80%';
  public imageAvatarFile: any = '';
  public imageAvatar: any = '/assets/img/default.png';

  public defaultColDef;
  public columnDefs: ColumnsGrid[];
  public rowPrepData: Preparation[];

  public selectedPrep: Preparation;

  constructor(@Inject(DOCUMENT)
              private document: Document,
              private service: AdminService,
              private userService: UserService,
              private toast: ToastrService,
              private modal: ModalService,
              private cdr: ChangeDetectorRef,
              private sanitizer: DomSanitizer,
              ) { }

  @Input()
  public recipeToEdit: any = {};

  ngOnInit(): void {
    this.initGridOptions();
  }

  ngOnChanges() {
    if (this.recipeToEdit) {
      this.newRecipe = false;
      this.recipeData = { ...this.recipeToEdit };
      this.renderAvatar(this.recipeData.imageURL);
      this.columnDefs = this.prepareGridPrepColumns();
      this.rowPrepData = this.recipeData.preparations.map((prep) => {
           return { ...prep, userName: prep.user.name + ' ' + prep.user.lastName };
      });
      // of(this.recipeData.preparations).pipe(
      //   switchMap(res => {
      //     // convert array to observable
      //     return from(res);
      //   }),
      //   mergeMap((prep: Preparation) => {
      //     return this.userService.getUser(prep.user.id).
      //        pipe(map((user: UserModel) => {
      //           prep.userName = user.name + ' ' + user.lastName;
      //           return prep;
      //       }));
      //   }),
      //   mergeMap((prep: Preparation) => {
      //     return this.userService.getUser(prep.authorId).
      //        pipe(map((user: UserModel) => {
      //           prep.author = user;
      //           return prep;
      //       }));
      //   }),
      //   toArray(),
      // ).subscribe((res: Preparation[]) => {
      //   this.rowPrepData = res;
      //   this.cdr.markForCheck();
      // });
    } else {
      this.resetForm();
    }

  }

  private prepareGridPrepColumns(): ColumnsGrid[] {
    return [
      { field: 'id', hide: true },
      { field: 'name', headerName: 'Receta', width: '200' },
      { field: 'description', headerName: 'Descripcion', width: '100' },
      { field: 'userName', headerName: 'Usuario registro', width: '150' },
      { field: 'active', headerName: 'Activo', width: '100',
        cellRenderer: (params) => {
          return params.data?.active ? 'Si' : 'No';
        }
      },
      { field: '', headerName: '',
        cellRenderer: (params) => {
          const span = this.document.createElement('span');
          span.innerHTML = '<i class="fas fa-edit" alt="Editar"></i>';
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
    ];
  }

  private initGridOptions() {
    this.defaultColDef = {
      width: 170,
      editable: false,
      filter: 'agTextColumnFilter',
      floatingFilter: false,
      resizable: true,
      sortable: true,
    };
  }

  private onEditPrep($event) {
    this.selectedPrep = $event;
    this.openModal('prepcard');
    this.cdr.markForCheck();
  }

  openModal(id: string) {
    this.modal.open(id);
  }

  closeModal(id: string) {
    this.modal.close(id);
  }

  public onSavePrep(prep: Preparation) {
    this.service.updateAdminPreparation(prep.id, prep.active ).subscribe((res: boolean) => {
     this.rowPrepData = this.rowPrepData.filter((p) => p.id !== prep.id);
     this.rowPrepData.push(prep);
     this.closeModal('prepcard');
     this.cdr.markForCheck();
    });
  }

  public onDeletePreparation(id: string) {
      this.service.deletePreparation(id).subscribe((res) => {
        this.toast.success('Preparación eliminada!');
        this.rowPrepData = this.rowPrepData.filter((rec) => rec.id !== id);
        this.closeModal('prepcard');
        this.cdr.markForCheck();
      });
  }

  public onSubmit() {
    if (this.newRecipe) {
      this.service.createRecipe(this.recipeData).subscribe((res: boolean) => {
        this.toast.success('Receta creada exitosamente');
        this.service.notifyNewRecipe(this.recipeData);
        this.resetForm();
      });
    } else {
       
        this.service.updateRecipe(this.recipeData).subscribe((res: boolean) => {
          this.toast.success('Receta modificada exitosamente');
          this.service.notifyNewRecipe(this.recipeData);
          this.resetForm();
      });
      }
  }

  public showAvatarPreview($event: any) {
    const validFileTypes = [
      'image/jpeg', 'image/png',
    ];

    if (-1 === validFileTypes.indexOf($event.target.files[0].type)) {
      this.toast.error('Imagen Invalida');
      $event.target.value = '';
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.renderAvatar(reader.result);
      this.imageAvatarFile = reader.result;
      this.recipeData.imageURL = this.imageAvatarFile;
     // this.saveProfilePhoto(this.imageAvatarFile);
    };
    reader.readAsDataURL($event.target.files[0]);
  }

  public renderAvatar(url: any) {
    this.imageAvatar = this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
    this.avatarBgSize = 'cover';
    this.cdr.markForCheck();
  }


  public resetForm(form?: NgForm) {
    this.newRecipe = true;
    this.imageAvatar = null;
    this.recipeData = {
      id: '0',
      name: '',
      description: '',
      imageURL: '',
    };
    if (form != null) {
      form.form.reset();
    }
    this.cdr.markForCheck();
  }
}
