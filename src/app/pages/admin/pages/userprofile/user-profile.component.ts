import { Component, OnInit, OnDestroy, ChangeDetectionStrategy,
    ChangeDetectorRef, Output, Input, EventEmitter } from '@angular/core';


import { UserModel } from '../../../../core/models/userModel';

import { Observable, Subscription } from 'rxjs';

import { UserSessionService } from '../../../../core/services/session.service';
import { UserService } from '../../pages/user/services/user.service';
import { ToastrService } from 'ngx-toastr';



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
            ) { }

public ngOnInit(): void {
  this.userData$ = this.userSession.userSession$;
}

public ngOnDestroy(): void {
  // this.sub.unsubscribe();
}

public onSubmit(data: UserModel) {
  this.userService.updateUser(data).subscribe((res) => {
    if (res) {
      this.toast.success('Datos actualizados');
    }
  });
}

}
