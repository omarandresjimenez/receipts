import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';
import { UserService } from '../admin/pages/user/services/user.service';



@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
    constructor(private router: Router,
                private route: ActivatedRoute,
                private modal: ModalService,
                private dialog: ToastrService,
                private userService: UserService) { }

  public ngOnInit(): void {

  }


  public onSubmit($event) {
   // this.session.authenticate(this.userLogin);
   // this.logAsGuest();
   this.userService.createUser($event).subscribe((res) => {
     if (res) {
      this.dialog.success('Usuario creado');
      this.router.navigate([ '..', 'login' ], { relativeTo: this.route });
      this.modal.open('messageModal');
     }
   }
   );

  }

  public onCloseModal(id) {
    this.modal.close(id);
  }

  public logAsGuest() {
    this.router.navigate([ '..', 'container' ], { relativeTo: this.route });
  }
}
