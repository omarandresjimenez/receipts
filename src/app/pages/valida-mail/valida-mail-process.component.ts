import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ValidaMailApiService } from './api/validamail.api';


@Component({
  template: '',
})
export class ValidaMailProcessComponent implements OnInit, OnDestroy {
  public sub: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private service: ValidaMailApiService) { }

  public ngOnInit(): void {
    this.sub = this.route
      .params
      .subscribe((params: any) => {
        if (params) {
         const email = params?.email;
         const hash = params?.hash;
         this.service.validaMail(email, hash).subscribe(res => {
             if (res) {
                this.toastr.success('Gracias por confirmar email, ya puede iniciar sesión');
                this.router.navigateByUrl('/');
             } else {
                this.toastr.warning('Sus datos no se pudieron confirmar.  Intente de nuevo');
                this.router.navigateByUrl('/');
             }
         });
        }
      });
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
