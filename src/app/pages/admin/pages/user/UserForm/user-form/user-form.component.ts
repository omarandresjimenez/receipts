import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/core/models/userModel';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnChanges {
  public newUser = true;
  public buttonText: string;
  public userData: UserModel = { name: '', lastName: '', password: '',
                                 confirmPassword: '', email: '', state: '', city: '' , role: '', active: false };
  constructor(private service: UserService,  private toast: ToastrService, private cdr: ChangeDetectorRef) { }

  @Input()
  public userToEdit: UserModel;

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.userToEdit) {
      this.newUser = false;
      this.userData = { ...this.userToEdit };
    }
  }

  public onSubmit($event: UserModel) {
    if (this.newUser) {
      this.service.createUser(this.userData).subscribe((res: boolean) => {
        this.toast.success('Usuario Creado');
        this.service.notifyNewUser();
        this.resetForm();
    },
      (err) => {
        console.log(err);
        this.toast.error('Error');
       });
      } else {
        this.service.updateUser(this.userData).subscribe((res: boolean) => {
          this.toast.success('Usuario actualizado');
          this.service.notifyNewUser();
          this.resetForm();
      },
        (err) => {
          this.toast.error('Error');
          console.log(err);
         });
      }
  }

  public resetForm(form?: NgForm) {
    this.newUser = true;
    this.userData = { name: '', lastName: '', password: '',
                      confirmPassword: '', email: '', state: '', city: '' , role: '', active: false };
    if (form != null) {
      form.form.reset();
    }
    this.cdr.markForCheck();
  }
}
