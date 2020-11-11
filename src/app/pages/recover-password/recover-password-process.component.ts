import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { RecoverPasswordApiService } from './api/recover-password.api';


@Component({
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.components.scss'],
})
export class RecoverPasswordProcessComponent implements OnInit, OnDestroy {
  public newPwd = '';
  public newPwd2 = '';
  public sub: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private service: RecoverPasswordApiService) { }

  public ngOnInit(): void {

  }

  public onSubmit() {
    this.sub = this.route
    .params
    .subscribe((params: any) => {
      if (params) {
       const email = params?.email;
       const hash = params?.hash;
       this.service.ChangePaswordMail(email, this.newPwd, hash).subscribe(res => {
           if (res) {
              this.toastr.success('Contraseña actualiozada');
              this.router.navigateByUrl('/');
           } else {
              this.toastr.warning('Sus datos no se pudieron confirmar.  Intente de nuevo');
              this.router.navigateByUrl('/');
           }
       });
      }
    });
  }

  public onCancel() {
    this.router.navigateByUrl('/');
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
