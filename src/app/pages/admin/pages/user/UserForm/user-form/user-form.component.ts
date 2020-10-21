import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { UserModel } from 'src/app/core/models/userModel';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnChanges {

  constructor() { }

  @Input()
  public user: UserModel;

  @Output()
  public updateUser = new EventEmitter<UserModel>();

  @Output()
  public deleteUser = new EventEmitter<string>();

  ngOnInit(): void {
  }

  ngOnChanges() {

  }

  onUpdateUser() {
    this.updateUser.emit(this.user);
  }

  onDeleteUser() {
    if (confirm('Esta seguro que desea eliminar este usuario?')){
      this.deleteUser.emit(this.user.email);
    }
  }

}
