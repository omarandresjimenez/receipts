import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ItemChip, Preparation, Recipe, Region } from 'src/app/core/models/models';
import { PreparationService } from '../../preparation-admin/services/admin.service';
import { ColumnsGrid } from 'src/app/core/models/ColumnsGrid';
import { UserSessionService } from 'src/app/core/services/session.service';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { delay, merge, switchMap } from 'rxjs/operators';
import { RecipeCatalogService } from 'src/app/pages/catalog/services/recipe-catalog.service';
import { UserModel } from 'src/app/core/models/UserModel';
import { UserService } from '../../user/services/user.service';



@Component({
  selector: 'app-admin-preparation-form',
  templateUrl: './preparation-form.component.html',
  styleUrls: ['./preparation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreparationFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild(NgForm)
  public form: NgForm;

  public newpreparation = true;
  public preparationData: Preparation;

  public avatarBgSize: any = '80%';
  public imageAvatarFile: any = '';
  public imageAvatar: any = '/assets/img/default.png';

  public columnDefs: ColumnsGrid[];
  public rowPrepData: Preparation[];

  public recipeControl = new FormControl();
  public authorControl = new FormControl();
  public recipeName: string;
  public authorName: string;

  public selectedPrep: Preparation;
  public recipeList$: Observable<Recipe[]>;
  public authorList$: Observable<UserModel[]>;
  public regions$: Observable<Region[]>;

  public listIngredients: ItemChip[] = [];
  public initialListIngredients: ItemChip[] = [];

  public listTools: ItemChip[] = [];
  public initialListTools: ItemChip[] = [];

  public titleNewElement: string;
  public typeElement: string;


  private subs: Subscription;

  private readonly ID_TRADITIONAL_COOKER = '5';
  private readonly ID_CHEF = '1';

  constructor(
              private service: PreparationService,
              private recipeServie: RecipeCatalogService,
              private userService: UserService,
              private toast: ToastrService,
              private sessionService: UserSessionService,
              private modal: ModalService,
              private cdr: ChangeDetectorRef,
              private sanitizer: DomSanitizer,
              ) { }

  @Input()
  public preparationToEdit: any = {};

  @Input()
  public recipe: Recipe = { id: '', name: ''};

   ngAfterViewInit(): void {
    // this.recipeControl = this.form.controls?.recipe;
   }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.preparationData  = { id: '0', name: '', description: '', imageURL: '', region: { id: '', name: ' '},
                              active: true, author: { id: '', name: '', lastName: '' }, user: this.sessionService.getCurrentUser(),
                              cookingTechnique: '', preparationType: '', tools: [], ingredients: [],
                              recipe: this.recipe };
    this.recipeList$ = this.recipeControl.valueChanges
                              .pipe(
                                delay(500),
                                switchMap((res: string) => {
                                  return this.recipeServie.searchRecipesBasic(res);
                                })
                              );
    this.authorList$ = this.authorControl.valueChanges
                              .pipe(
                                delay(500),
                                switchMap((res: string) => {
                                  return this.userService.getUsersByTypeActor(this.ID_TRADITIONAL_COOKER, res).pipe(
                                    // tslint:disable-next-line: deprecation
                                    merge(this.userService.getUsersByTypeActor(this.ID_CHEF, res)));
                                })
                              );
    this.subs = this.service.getIngredients().subscribe(ing => {
       this.listIngredients = ing;
    });

    this.subs = this.service.getTools().subscribe(tool => {
      this.listTools = tool;
   });

    this.regions$ = this.service.getRegions();

  }

  ngOnChanges() {
    if (this.preparationToEdit) {
      this.newpreparation = false;
      this.preparationData = { ...this.preparationToEdit };
      this.initialListIngredients = this.preparationData.ingredients;
      this.initialListTools = this.preparationData.tools;
      this.recipeControl.setValue(this.recipe?.name);
      this.authorControl.setValue(this.preparationToEdit.author?.name + ' ' + this.preparationToEdit.author?.lastName);
      this.renderAvatar(this.preparationData.imageURL);
    }
  }





  public onSubmit() {
    if (this.newpreparation) {
      if (!this.preparationData.recipe?.id || !this.preparationData.author?.id) {
        this.toast.warning('por favor sdeleccione la Receta o Autor del listado disponible');
        return false;
      }
      this.service.createPreparation(this.preparationData).subscribe((res: string) => {
        this.toast.success('Preparación creada exitosamente');
        this.service.notifyNewpreparation( { ...this.preparationData, id: res });
        this.resetForm();
      });
    } else {
        this.service.updatePreparation(this.preparationData).subscribe((res: boolean) => {
          this.toast.success('Preparación modificada exitosamente');
          this.service.notifyNewpreparation(this.preparationData);
          this.resetForm();
      });
      }
  }


  public selectRecipe($event, recipe) {
    if ($event.isUserInput) {
      this.recipe = { id: recipe, name: this.recipeControl.value };
      this.preparationData.recipe = this.recipe;
    }
  }

  public selectAuthor($event, author) {
    if ($event.isUserInput) {
      this.preparationData.author.id = author;
      this.preparationData.author.name = this.authorControl.value;
    }
  }

  public setIngredients(items: ItemChip[]): void {
    this.preparationData.ingredients.length = 0;
    items.map(i => {
      this.preparationData.ingredients.push({
        id: i.id,
        name: i.name,
      });
    });
  }

  public setTools(items: ItemChip[]): void {
    this.preparationData.tools.length = 0;
    items.map(i => {
      this.preparationData.tools.push({
        id: i.id,
        name: i.name,
      });
    });
  }

  public onAddNewElement(type: string): void {
     this.typeElement = type;
     this.titleNewElement = type === 'I' ? 'Crear nuevo Ingrediente' : 'Crear nuevo utensilio';
     this.modal.open('newElementModal');
     this.cdr.markForCheck();
  }

  public onSaveElement(item: ItemChip): void {
    if (!item) {
      this.modal.close('newElementModal');
      return;
    }
    if (this.typeElement === 'I') {
      this.subs = this.service.createIngredient(item).subscribe(res => {
        if (res) {
          this.listIngredients = [ ...this.listIngredients, res ];
          this.toast.success('Ingrediente creado');
        }
      });
    } else {
      this.subs = this.service.createTool(item).subscribe(res => {
        if (res) {
          this.listTools.push(res);
          this.toast.success('Utensilio creado');
        }
      });
    }
    this.modal.close('newElementModal');
    this.cdr.markForCheck();
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
      this.preparationData.imageURL = this.imageAvatarFile;
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
    this.newpreparation = true;
    this.imageAvatar = null;

    this.preparationData = { id: '0', name: '', description: '', imageURL: '', region: {id: '', name: ''},
    active: true, author: { id: '', name: '', lastName: '' }, user: this.sessionService.getCurrentUser(),
    cookingTechnique: '', preparationType: '', tools: [], ingredients: [],
    recipe: this.recipe };
    if (form != null) {
      form.form.reset();
    }
    this.cdr.markForCheck();
  }
}
