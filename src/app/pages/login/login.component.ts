import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/core/models/UserModel';
import { UserSessionService } from 'src/app/core/services/session.service';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';
import { RecoverPasswordApiService } from '../recover-password/api/recover-password.api';

import { UserLogin } from 'src/app/core/models/userLogin';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public userLogin: UserLogin = { userEmail: '', userPassword: '' };
  public userSession$: Observable<UserModel> = this.session.userSession$;
  public sub: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: RecoverPasswordApiService,
              private session: UserSessionService,
              private modalService: ModalService,
              private toast: ToastrService) { }

  public ngOnInit(): void {
    this.sub = this.userSession$.subscribe((res: UserModel) => {
      if (res) {
        this.router.navigate([ '..', 'container' ], { relativeTo: this.route });
      }
    },
    (err) => this.toast.warning(err));
  }

  public ngOnDestroy(): void {
  //  this.sub.unsubscribe();
  }

  public onSubmit() {
   this.session.authenticate(this.userLogin);
  }

  public onSubmitRecover() {
    this.service.recoverPassword(this.userLogin.userEmail).subscribe(r => {
      if (r) {
        this.toast.success('Gracias.. Pronto recibirá un email con instrucciones');
      }
    },
    (err) => this.toast.warning(err.error?.message)
    );
    this.closeModal('recovercard');
  }

  public openModal(id: string) {
    this.modalService.open(id);
  }

  public closeModal(id: string) {
    this.modalService.close(id);
  }

  public onBack() {
    this.router.navigateByUrl('/');
  }

  public signUp() {
    this.router.navigate([ '..', 'signUp' ], { relativeTo: this.route });
  }
}
