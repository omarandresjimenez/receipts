import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';

import { ApiService } from '../api/api.service';
import { UserModel } from 'src/app/core/models/UserModel';

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

  public createUser(userInfo: UserModel): Observable<boolean> {
    console.log(userInfo);
    return of(true); // this.service.createUser(userInfo);
  }

  public updateUser(userInfo: UserModel): Observable<boolean> {
    console.log(userInfo);
    return of(true); // this.service.updateUser(userInfo);
  }

  public deleteUser(userEmail: string): Observable<boolean> {
    return this.service.deleteUser(userEmail);
  }


}
