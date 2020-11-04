import { Component, OnInit, OnDestroy, ChangeDetectionStrategy,
    ChangeDetectorRef, Output, Input, EventEmitter } from '@angular/core';


import { UserModel } from 'src/app/core/models/userModel';

import { Observable, Subscription } from 'rxjs';

import { UserSessionService } from 'src/app/core/services/session.service';
import { UserService } from '../../pages/user/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
templateUrl: './user-profile.component.html',
styleUrls: ['./user-profile.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
public userData$: Observable<UserModel>;


constructor(private userService: UserService,
            private userSession: UserSessionService,
            private cdr: ChangeDetectorRef,
            private toast: ToastrService,
            private router: Router,
            ) { }

public ngOnInit(): void {
  this.userData$ = this.userService.getUser(this.userSession.getCurrentUser().id);
}

public ngOnDestroy(): void {
  // this.sub.unsubscribe();
}

public onSubmit(data: UserModel) {
  this.userService.updateUser(data).subscribe((res) => {
    if (res) {
      this.toast.success('Datos actualizados');
      this.router.navigateByUrl('/');
    }
  });
}

}
