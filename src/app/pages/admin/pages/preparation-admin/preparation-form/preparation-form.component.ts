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
import { delay, map, merge, startWith, switchMap } from 'rxjs/operators';
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
  public imageDefault = '/assets/img/default.png';

  public columnDefs: ColumnsGrid[];
  public rowPrepData: Preparation[];

  public recipeControl = new FormControl();
  public authorControl = new FormControl();
  public recipeName: string;
  public authorName: string;

  public selectedPrep: Preparation;
  public filterRecipes$: Observable<Recipe[]>;
  public recipeList: Recipe[];
  public authorList: UserModel[] = [];
  public filteredAuthors$: Observable<UserModel[]>;
  public deps$: Observable<State[]>;
  public cities$: Observable<City[]>;
  public cookingTechniques$: Observable<CookingTechnique[]>;

  public state: { id: number } = { id: 0 };

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
  public recipe: Recipe = { id: '', name: '' };

  ngAfterViewInit(): void {
    // this.recipeControl = this.form.controls?.recipe;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {



    this.preparationData = {
      id: '', name: '', description: '', imageUrl: '', city: { id: '', name: '', idState: '' },
      active: true, author: { id: '', name: '', lastName: '' }, user: this.sessionService.getCurrentUser(),
      cookingTechnique: { id: '', name: '' }, preparationType: '', tools: [], ingredients: [],
      recipe: this.recipe, source: '', preparationSteps: '', forSale: false,
      carrierCommunity: '', use: '', transmissionWay: ''
    };

    this.sub = this.recipeServie.getRecipes().subscribe(rec => {
      this.recipeList = rec;
      this.filterRecipes$ = this.recipeControl.valueChanges.pipe(
        // tslint:disable-next-line: deprecation
        startWith(null),
        map((word: string | null) => word ? this._filterRecipe(word) : this.recipeList.slice()));
      this.cdr.markForCheck();
    });

    this.sub = combineLatest([this.userService.getUsersByTypeActor(this.ID_TRADITIONAL_COOKER, 'All'),
    this.userService.getUsersByTypeActor(this.ID_CHEF, 'All')])
      .subscribe(([authors1, authors2]: [UserModel[], UserModel[]]) => {
        this.authorList = [...authors1, ...authors2];
        this.filteredAuthors$ = this.authorControl.valueChanges.pipe(
          // tslint:disable-next-line: deprecation
          startWith(null),
          map((word: string | null) => word ? this._filterAuthor(word) : this.authorList.slice()));
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
      this.imageAvatarFile = null;
      this.preparationData = { ...this.preparationToEdit };
      this.state = { id: +this.preparationData.city.idState };
      this.loadCities(this.state.id);
      this.initialListIngredients = this.preparationData.ingredients;
      this.initialListTools = this.preparationData.tools;
      this.recipeControl.setValue(this.recipe?.name);
      this.authorControl.setValue(this.preparationToEdit.author?.name + ' ' + this.preparationToEdit.author?.lastName);
      this.renderAvatar(this.preparationData.imageUrl);
      this.form.controls.city.setValue(this.preparationData.city.id);
      this.cdr.markForCheck();
    }
  }



  public loadCities(stateId): void {
    this.cities$ = this.cityService.getCities(stateId.value || stateId);
    this.form.controls.city.setErrors(ValidityState);
  }

  public onSubmit() {
    if (this.newpreparation) {
      if (!this.preparationData.recipe?.id) {
        this.toast.warning('por favor seleccione la Receta del listado disponible');
        return false;
      }
      if (!this.preparationData.author?.id && !this.preparationData.carrierCommunity) {
        this.toast.warning('por favor Ingrese la Comunidad Portadora o el Autor portador de la preparaci??n');
        return false;
      }

      if (!this.preparationData.author?.id) {
        this.preparationData.author.id = this.ID_CARRIER_AUTHOR;
      }

      this.service.createPreparation(this.preparationData).subscribe((res: Preparation) => {
        this.toast.success('Preparaci??n creada exitosamente');
        this.modal.open('messageModal');
        this.service.notifyNewpreparation({ ...this.preparationData, id: res.id, recipe: this.recipe });
        this.resetForm();
      });
    } else {
      this.service.updatePreparation(this.preparationData).subscribe((res: boolean) => {
        this.toast.success('Preparaci??n modificada exitosamente');
        this.modal.open('messageModal');
        this.service.notifyNewpreparation(this.preparationData);
        this.resetForm();
      });
    }
  }


  public selectRecipe($event, recipe, name) {
    if ($event.isUserInput) {
      this.recipe = { id: recipe, name };
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
      case 'T':
        this.titleNewElement = 'Crear nuevo Utensilio';
        break;
      case 'C':
        this.titleNewElement = 'Crear nueva T??cnica de Cocci??n';
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
        this.authorList.push(res);
        this.authorControl.updateValueAndValidity();
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
          this.listIngredients = [...this.listIngredients, res];
          this.toast.success('Ingrediente creado');
        }
      });
    } else if (this.typeElement === 'T') {
      this.sub = this.service.createTool(item).subscribe(res => {
        if (res) {
          this.listTools.push(res);
          this.toast.success('Utensilio creado');
        }
      });
    } else {
      this.sub = this.service.createCookingTechnique(item).subscribe(res => {
        if (res) {
          this.cookingTechniques$ = this.service.getCookingTechniques();
          this.toast.success('Tecnica creada');
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

    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  public renderAvatar(url: any) {
    this.avatarBgSize = 'cover';
    if (!url) {
      this.imageAvatar =  this.sanitizer.bypassSecurityTrustStyle(`url('${this.imageDefault}')`);
      this.cdr.markForCheck();
      return;
    }
    this.imageAvatar = this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
    this.cdr.markForCheck();
  }


  public resetForm(form?: NgForm) {
    this.newpreparation = true;
    this.imageAvatar = null;
    this.imageAvatarFile = null;
    this.recipe = { id: '', name: '' };
    this.initialListIngredients = [];
    this.initialListTools = [];
    this.recipeControl.setValue(null);
    this.authorControl.setValue(null);


    this.preparationData = {
      id: '', name: '', description: '', imageUrl: '', city: { id: '', name: '', idState: '' },
      active: false, author: { id: '', name: '', lastName: '' }, user: this.sessionService.getCurrentUser(),
      cookingTechnique: { id: '', name: '' }, preparationType: '', tools: [], ingredients: [],
      recipe: this.recipe, source: '', preparationSteps: '', forSale: false, carrierCommunity: '',
      use: '', transmissionWay: ''
    };
    if (form != null) {
      form.form.reset();
    }
    this.cdr.markForCheck();
  }

  private _filterAuthor(value: string): UserModel[] {
    const filterValue = value.toLowerCase();
    return this.authorList.filter(item => item.name.toLowerCase().indexOf(filterValue) >= 0 ||
      item.lastName.toLowerCase().indexOf(filterValue) >= 0);
  }

  private _filterRecipe(value: string): Recipe[] {
    const filterValue = value.toLowerCase();
    return this.recipeList.filter(item => item.name.toLowerCase().indexOf(filterValue) >= 0);
  }
}
