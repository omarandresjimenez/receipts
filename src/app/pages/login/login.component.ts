import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserLogin } from 'src/app/core/models/userLogin';

import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/core/models/UserModel';
import { UserSessionService } from 'src/app/core/services/session.service';


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
              private session: UserSessionService,
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

  public signUp() {
    this.router.navigate([ '..', 'signUp' ], { relativeTo: this.route });
  }
}
