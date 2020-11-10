
import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/core/models/userModel';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnInit, OnChanges {

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
      this.deleteUser.emit(this.user.id);
    }
  }

}
