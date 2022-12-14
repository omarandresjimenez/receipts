import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLogin } from 'src/app/core/models/userLogin';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppHttpErrorHandler } from 'src/app/core/utils/errorHandler';
import { UserModel } from 'src/app/core/models/UserModel';
import { ActorType } from 'src/app/core/models/models';


@Injectable({
  providedIn: 'root'
})
export class ApiService extends AppHttpErrorHandler  {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient,
              public router: Router,
              public toast: ToastrService) {
     super(router, toast);
   }

  public authenticate(userLogin: UserLogin): Observable<UserModel> {
    return this.http.post<UserModel>(this.BASEURL + 'user/authenticate', userLogin)
    .pipe(
      catchError((err) => this.handleError(err)),
      map((user) => {
        return { ...user, city: user.city.id,
                    state: user.city?.department.id,
                    birthDate: user.birthDate?.substring(0, 10),
                    actorTypeId: user.actorType.id,
                    actorTypeName: user.actorType.name,
                    cityName: user.city.name,
                    stateName: user.city.department?.name,
                    regionName: user.city.department?.region?.name,
                    active: user.isActive,
                  };
      })
      );
  }

  public createUser(userModel: UserModel): Observable<UserModel> {
    const params = {
      name: userModel.name,
      lastName: userModel.lastName,
      password: userModel.password,
      role: userModel.role,
      cityId: +userModel.city,
      email: userModel.email,
      active: userModel.active,
      identification: userModel.identification,
      birthDate: userModel.birthDate,
      phone: userModel.phone,
      image: userModel.imageUrl,
      shouldChangePassword: true,
      emailValidated: false,
      actorTypeId: +userModel.actorTypeId,
      establishment: userModel.establishment,

    };
    return this.http.post<UserModel>(this.BASEURL + 'user', params).pipe(
        catchError((err) => this.handleError(err))
      );
  }

  public updateUser(userModel: UserModel): Observable<boolean> {
    const params = {
      id: userModel.id,
      name: userModel.name,
      lastName: userModel.lastName,
      password: userModel.password ? userModel.password : null,
      cityId: +userModel.city,
      email: userModel.email,
      active: userModel.active,
      identification: userModel.identification,
      birthDate: userModel.birthDate,
      phone: userModel.phone,
      image: !userModel.imageUrl?.startsWith('data') ? null : userModel.imageUrl,
      shouldChangePassword: true,
      emailValidated: false,
      actorTypeId: +userModel.actorTypeId,
      establishment: userModel.establishment,
    };
    return this.http.put<boolean>(this.BASEURL + 'user/' + userModel.id, params).pipe(
      catchError((err) => this.handleError(err))
    );
  }



  updateUserAdmin(id: string, role: string, active: boolean): Observable<boolean> {

    const params = {
      id,
      userIsActive: active,
      userRole: role,
    };
    return this.http.put<boolean>(this.BASEURL + 'user/UpdateUserByAdmin/' + id, params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public deleteUser(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASEURL + 'user/' + id).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public getActorTypes(): Observable<ActorType[]> {
    return this.http.get<ActorType[]>(this.BASEURL + 'actorType');
  }


  public getUser(id: string): Observable<UserModel> {
      return this.http.get<UserModel>(this.BASEURL + 'user/' + id).pipe(
        catchError((err) => this.handleError(err)),
        map((user) => {
          return { ...user, city: user.city.id,
                      state: user.city?.department.id,
                      birthDate: user.birthDate?.substring(0, 10),
                      actorTypeId: user.actorType.id,
                      actorTypeName: user.actorType.name,
                      cityName: user.city.name,
                      stateName: user.city.department?.name,
                      regionName: user.city.department?.region?.name,
                      active: user.isActive,
                    };
        })
        );
   }

  public getUsersByTypeActor(idActorType: string, search: string): Observable<UserModel[]> | Observable<any[]> {
    return this.http.get<UserModel[]>(this.BASEURL + 'user/' + idActorType + '/search/' + search);
  }

  public getUsers(): Observable<UserModel[]> | Observable<any[]> {
     return this.http.get<any[]>(this.BASEURL + 'user').pipe(
      catchError((err) => this.handleError(err)),
      map((users: any[]) => users.map((user: any) => {
            return {
                  name: user.name,
                  lastName: user.lastName,
                  identification: user.identification,
                  email: user.email,
                  id: user.id,
                  imageUrl: user.imageUrl,
                  age: user.age,
                  cityId: user.city.id,
                  establishment: user.establishment,
                  state: user.city?.department.id,
                  birthDate: user.birthDate?.substring(0, 10),
                  actorTypeId: user.actorType.id,
                  actorTypeName: user.actorType.name,
                  cityName: user.city.name,
                  stateName: user.city.department?.name,
                  regionName: user.city.department.region?.name,
                  creationDate: user.createdDate?.substring(0, 10),
                  role: user.role,
                  active: user.isActive,
                  phone: user.phone,
             };
        } ))
    );
 }

}
