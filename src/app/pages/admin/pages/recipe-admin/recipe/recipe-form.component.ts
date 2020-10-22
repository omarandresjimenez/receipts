import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AdminService } from '../../recipe-admin/services/admin.service';
import { Recipe } from '../../../../../core/models/models';


@Component({
  selector: 'app-admin-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRecipeFormComponent implements OnInit, OnChanges {
  public newRecipe = true;
  public recipeData: Recipe = { id: '0', name: '', description: '', imageURL: ''};

  public avatarBgSize: any = '80%';
  public imageAvatarFile: any = '';
  public imageAvatar: any = '/assets/img/default.png';

  constructor(private service: AdminService,
              private toast: ToastrService,
              private cdr: ChangeDetectorRef,
              private sanitizer: DomSanitizer,
              ) { }

  @Input()
  public recipeToEdit: any = {};

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.recipeToEdit) {
      this.newRecipe = false;
      this.recipeData = { ...this.recipeToEdit };
      this.renderAvatar(this.recipeData.imageURL);
    }
  }

  public onSubmit() {
    if (this.newRecipe) {
      this.service.createRecipe(this.recipeData).subscribe((res: boolean) => {
        this.toast.success('Receta creada exitosamente');
        this.service.notifyNewRecipe(this.recipeData);
        this.resetForm();
    },
      (err) => {
        this.toast.error('Se presento un error inesperado');
       });
      } else {
        this.service.updateRecipe(this.recipeData).subscribe((res: boolean) => {
          this.toast.success('Receta modificada exitosamente');
          this.service.notifyNewRecipe(this.recipeData);
          this.resetForm();
      },
        (err) => {
          this.toast.error('Receta no existe');
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
