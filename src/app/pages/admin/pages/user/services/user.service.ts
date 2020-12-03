import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';

import { ApiService } from '../api/api.service';
import { UserModel } from 'src/app/core/models/UserModel';
import { ActorType } from 'src/app/core/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public newUserAdded$ = new Observable();
  private newUserAdded = new Subject();
  constructor(private service: ApiService) {
    this.newUserAdded$ = this.newUserAdded.asObservable();
  }


  public notifyNewUser(): void {
    this.newUserAdded.next();
  }

  public getUsers(): Observable<UserModel[]> {
    return this.service.getUsers();
  }

  public getUsersByTypeActor(idActorType: string, search: string): Observable<UserModel[]> {
    return this.service.getUsersByTypeActor(idActorType, search);
  }

  public getTypeActors(): Observable<ActorType[]> {
    return this.service.getActorTypes();
  }

  public createUser(userInfo: UserModel): Observable<UserModel> {
    return this.service.createUser(userInfo);
  }

  public updateUser(userInfo: UserModel): Observable<boolean> {
    return this.service.updateUser(userInfo);
  }

  public getUser(id: string): Observable<UserModel> {
    return this.service.getUser(id);
  }

  public updateUserAdmin(userId: string, userRole: string, userActive: boolean): Observable<boolean> {
    return this.service.updateUserAdmin(userId, userRole, userActive);
  }

  public deleteUser(userId: string): Observable<boolean> {
    return this.service.deleteUser(userId);
  }


}
