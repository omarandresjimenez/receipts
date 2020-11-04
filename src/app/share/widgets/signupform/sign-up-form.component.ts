import { Component, OnInit, OnDestroy, ChangeDetectionStrategy,
         ChangeDetectorRef, Output, Input, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { NgForm, PatternValidator } from '@angular/forms';

import { UserModel } from 'src/app/core/models/userModel';

import { Observable, Subscription } from 'rxjs';

import { City, State, ActorType } from 'src/app/core/models/models';
import { CitiesService } from 'src/app/core/api/cities.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/pages/admin/pages/user/services/user.service';



@Component({
  selector: 'app-signup-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit, OnDestroy, OnChanges {
  public deps$: Observable<State[]>;
  public cities$: Observable<City[]>;
  public typeActors$: Observable<ActorType[]>;

  public pwderror = false;

  public years: number[] = [];
  public months: string[] = [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  public days: number[] = [];

  public birthDate: { year: number, month: string, day: number}
                    = { year: 1950, month: 'Ene', day: 1 };

  public avatarBgSize: any = '80%';
  public imageAvatarFile: any = '';
  public imageAvatar: any = '/assets/img/defaultuser.png';

  private readonly ID_TYPEAUTHOR_COOKER = '5';

  @ViewChild(NgForm)
  public form: NgForm;

  private  sub: Subscription;

  @Input()
  public title: string;

  @Input()
  public isAuthor = false;

  @Input()
  public editionMode = false;

  @Input()
  public signUp: UserModel = { name: '', lastName: '', password: '', birthDate: null, phone: '', identification: '',
                               confirmPassword: '', email: '', state: '', city: '', imageUrl: null, actorTypeId: '', establishment: '',
                               active: false, emailValidated: false,  role: 'user', shouldChangePassword: true };

  @Output()
  public formSubmit = new EventEmitter<UserModel>();

  @Output()
  public cancelAction = new EventEmitter<boolean>();

  constructor(private cityService: CitiesService,
              private userService: UserService,
              private cdr: ChangeDetectorRef,
              private toast: ToastrService) { }

  public ngOnInit(): void {
    this.deps$ = this.cityService.getStates();
    this.typeActors$ = this.userService.getTypeActors();
    const maxYear = new Date().getFullYear() - 18; // user should have more than 18 years
    for (let index = 1950; index < maxYear; index++) {
      this.years.push(index);
    }
    for (let index = 1; index <= 31; index++) {
      this.days.push(index);
    }


  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.signUp && this.signUp) {
      if (this.signUp.birthDate) {
        this.birthDate.year = +this.signUp.birthDate.split('-')[0];
        this.birthDate.month = this.months[+this.signUp.birthDate.split('-')[1] - 1];
        this.birthDate.day = +this.signUp.birthDate.split('-')[2];
      }
      this.loadCities(null);
      this.renderAvatar(this.signUp?.imageUrl);
    }
    if (this.isAuthor && this.signUp) {
      this.signUp.actorTypeId = this.ID_TYPEAUTHOR_COOKER;
      this.signUp.email = parseInt((Math.random() * 10000).toString(), 10) + '@cocinerotradicional';
    }

  }

  public loadCities($event): void {
    this.cities$ = this.cityService.getCities(this.signUp.state);

  }

  public ngOnDestroy(): void {
   //  this.sub.unsubscribe();
  }

  public onChange() {
    this.pwderror = !(this.signUp.password ===  this.signUp.confirmPassword || this.signUp.password === '');
    this.cdr.markForCheck();
  }

  public onChangeMonth($event) {
    this.days.length = 0;
    for (let index = 1; index <= 31; index++) {
      this.days.push(index);
    }
    if ($event.value.indexOf('Feb') > -1) {
       this.days = this.days.slice( 0, 28 );
    } else if (['Abr', 'Jun', 'Sep', 'Nov'].indexOf($event.value) > -1) {
      this.days.pop();
    }
    this.cdr.markForCheck();
  }

  public onSubmit(form: NgForm) {
    if (!form.invalid) {
      this.signUp.birthDate = this.birthDate.year.toString() + '-' +
                              (this.months.indexOf(this.birthDate.month) + 1).toString().padStart(2, '0') + '-' +
                              this.birthDate.day.toString().padStart(2, '0');
      this.formSubmit.emit({ ... this.signUp });
      if (!this.editionMode) {
        this.resetForm();
      }
    }
  }

  public onCancel() {
    this.resetForm();
    this.cancelAction.emit(true);
  }

  private resetForm() {
    this.signUp = { name: '', lastName: '', password: '', birthDate: null, phone: '', identification: '',
                    confirmPassword: '', email: '', state: '', city: '', imageUrl: null,
                    actorTypeId: this.isAuthor ? this.ID_TYPEAUTHOR_COOKER : '',
                    establishment: '', active: false, emailValidated: false,  role: 'user', shouldChangePassword: true };
  }

  public showAvatarPreview($event: any) {
    const validFileTypes = [
      'image/jpeg', 'image/png',
    ];

    if (-1 === validFileTypes.indexOf($event.target.files[0].type)) {
      this.toast.error('Tipo de imagen Invalida');
      $event.target.value = '';
      return false;
    }

    if ($event.target.files[0].size > 1024000) {
      this.toast.error('Imagen muy grande , tamaño máximo: 1Mb');
      $event.target.value = '';
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.renderAvatar(reader.result);
      this.imageAvatarFile = reader.result;
      this.signUp.imageUrl = this.imageAvatarFile;
      this.form?.controls?.name.markAsDirty();  // just a hack to make form dirty
     // this.saveProfilePhoto(this.imageAvatarFile);
    };
    reader.readAsDataURL($event.target.files[0]);
  }

  public renderAvatar(url: any) {
    this.imageAvatar = url; // this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
    this.avatarBgSize = 'cover';
    this.cdr.markForCheck();
  }


}
