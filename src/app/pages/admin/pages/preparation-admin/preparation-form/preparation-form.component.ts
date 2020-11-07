import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { City, CookingTechnique, ItemChip, Preparation, Recipe, Region, State } from 'src/app/core/models/models';
import { PreparationService } from '../../preparation-admin/services/admin.service';
import { ColumnsGrid } from 'src/app/core/models/ColumnsGrid';
import { UserSessionService } from 'src/app/core/services/session.service';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';
import { combineLatest, forkJoin, Observable, of, Subscription } from 'rxjs';
import { delay, merge, switchMap } from 'rxjs/operators';
import { RecipeCatalogService } from 'src/app/pages/catalog/services/recipe-catalog.service';
import { UserModel } from 'src/app/core/models/UserModel';
import { UserService } from '../../user/services/user.service';
import { CitiesService } from 'src/app/core/api/cities.service';
import { APP_CONFIG } from 'src/app/core/app-config';



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
  public deps$: Observable<State[]>;
  public cities$: Observable<City[]>;
  public cookingTechniques$: Observable<CookingTechnique[]>;

  public listIngredients: ItemChip[] = [];
  public initialListIngredients: ItemChip[] = [];

  public listTools: ItemChip[] = [];
  public initialListTools: ItemChip[] = [];

  public titleNewElement: string;
  public typeElement: string;


  private subs: Subscription[] = [];
  private set sub(sub: Subscription) { this.subs.push(sub); }

  private readonly ID_TRADITIONAL_COOKER = APP_CONFIG.ID_TRADITIONAL_COOKER;
  private readonly ID_CHEF = APP_CONFIG.ID_CHEF;
  private readonly ID_CARRIER_AUTHOR = APP_CONFIG.ID_CARRIER_AUTHOR;

  constructor(
              private service: PreparationService,
              private recipeServie: RecipeCatalogService,
              private cityService: CitiesService,
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
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {



    this.preparationData  = { id: '', name: '', description: '', imageUrl: '', city: { id: '', name: '', idState: ''},
                              active: true, author: { id: '', name: '', lastName: '' }, user: this.sessionService.getCurrentUser(),
                              cookingTechnique: { id: '', name: '' }, preparationType: '', tools: [], ingredients: [],
                              recipe: this.recipe, source: '',  preparationSteps: '', forSale: false, carrierCommunity: ''};
    this.recipeList$ = this.recipeControl.valueChanges
                              .pipe(
                                delay(500),
                                switchMap((res: string) => {
                                  return this.recipeServie.searchRecipesBasic(res);
                                })
                              );
    this.sub = this.authorControl.valueChanges
                              .pipe(
                                delay(500),
                                switchMap((res: string) => {
                                  return combineLatest([this.userService.getUsersByTypeActor(this.ID_TRADITIONAL_COOKER, res),
                                                        this.userService.getUsersByTypeActor(this.ID_CHEF, res)])

                                })
                              ).subscribe(([authors1, authors2]: [UserModel[], UserModel[]]) => {
                                this.authorList$ =  of([ ...authors1, ...authors2 ]);
                                this.cdr.markForCheck();
                              });


    this.sub = this.service.getIngredients().subscribe(ing => {
       this.listIngredients = ing;
    });

    this.sub = this.service.getTools().subscribe(tool => {
      this.listTools = tool;
   });

    this.deps$ = this.cityService.getStates();
    this.cookingTechniques$ = this.service.getCookingTechniques();

  }

  ngOnChanges() {
    if (this.preparationToEdit) {
      this.newpreparation = false;
      this.preparationData = { ...this.preparationToEdit };
      this.initialListIngredients = this.preparationData.ingredients;
      this.initialListTools = this.preparationData.tools;
      this.recipeControl.setValue(this.recipe?.name);
      this.authorControl.setValue(this.preparationToEdit.author?.name + ' ' + this.preparationToEdit.author?.lastName);
      this.renderAvatar(this.preparationData.imageUrl);
    }
  }



  public loadCities(stateId): void {
    this.cities$ = this.cityService.getCities(stateId.value);
  }

  public onSubmit() {
    if (this.newpreparation) {
      if (!this.preparationData.recipe?.id) {
        this.toast.warning('por favor seleccione la Receta del listado disponible');
        return false;
      }
      if (!this.preparationData.author?.id && !this.preparationData.carrierCommunity) {
        this.toast.warning('por favor Ingrese la Comunidad Portadora o el Autor portador de la preparación');
        return false;
      }

      if (!this.preparationData.author?.id) {
        this.preparationData.author.id = this.ID_CARRIER_AUTHOR;
      }

      this.service.createPreparation(this.preparationData).subscribe((res: string) => {
        this.toast.success('Preparación creada exitosamente');
        this.modal.open('messageModal');
        this.service.notifyNewpreparation( { ...this.preparationData, id: res });
        this.resetForm();
      });
    } else {
        this.service.updatePreparation(this.preparationData).subscribe((res: boolean) => {
          this.toast.success('Preparación modificada exitosamente');
          this.modal.open('messageModal');
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
     switch (type) {
       case 'I':
         this.titleNewElement = 'Crear nuevo Ingrediente';
         break;
       case 'U':
         this.titleNewElement = 'Crear nuevo Utensilio';
         break;
       case 'C':
         this.titleNewElement = 'Crear nueva Técnica de Cocción';
         break;
     }
     this.modal.open('newElementModal');
     this.cdr.markForCheck();
  }

  public onAddNewAuthor(): void {
    this.modal.open('newAuthorModal');
    this.cdr.markForCheck();
  }

  public onSaveAuthor($event): void {
    this.userService.createUser($event).subscribe((res) => {
      if (res) {
        this.toast.success('Autor creado');
      }
      this.modal.close('newAuthorModal');
      this.cdr.markForCheck();
    });
  }

  public onCancelAuthor() {
    this.modal.close('newAuthorModal');
    this.cdr.markForCheck();
  }

  public onCloseModal(modal) {
    this.modal.close(modal);
  }

  public onSaveElement(item: ItemChip): void {
    if (!item) {
      this.modal.close('newElementModal');
      return;
    }
    if (this.typeElement === 'I') {
      this.sub = this.service.createIngredient(item).subscribe(res => {
        if (res) {
          this.listIngredients = [ ...this.listIngredients, res ];
          this.toast.success('Ingrediente creado');
        }
      });
    } else if (this.typeElement === 'U') {
      this.sub = this.service.createTool(item).subscribe(res => {
        if (res) {
          this.listTools.push(res);
          this.toast.success('Utensilio creado');
        }
      });
    }  else {
      this.sub = this.service.createCookingTechnique(item).subscribe(res => {
        if (res) {
          this.cookingTechniques$ = this.service.getCookingTechniques();
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
      this.preparationData.imageUrl = this.imageAvatarFile;
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
    this.recipe =  { id: '', name: ''};
    this.initialListIngredients = [];
    this.initialListTools = [];
    this.recipeControl.setValue(null);
    this.authorControl.setValue(null);


    this.preparationData = {  id: '', name: '', description: '', imageUrl: '', city: { id: '', name: '', idState: ''},
                              active: false, author: { id: '', name: '', lastName: '' }, user: this.sessionService.getCurrentUser(),
                              cookingTechnique: { id: '', name: '' }, preparationType: '', tools: [], ingredients: [],
                              recipe: this.recipe, source: '',  preparationSteps: '', forSale: false, carrierCommunity: '' };
    if (form != null) {
      form.form.reset();
    }
    this.cdr.markForCheck();
  }
}
