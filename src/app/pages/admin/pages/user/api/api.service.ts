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
    // return of({
    //   name: 'Antonio',
    //   lastName: 'Aguilar',
    //   identification: '101870900',
    //   phone: '323456589',
    //   active: true,
    //   imageUrl: 'http://static.tvmaze.com/uploads/images/medium_portrait/20/50079.jpg',
    //   email: 'antonio@hotmail.com',
    //   cityId: '5001',
    //   state: '5',
    //   role: 'user',
    //   age: 43,
    //   cityName: 'Medellin',
    //   stateName: 'Antioquia',
    //   regionName: 'Caribe',
    //   creationDate: '2020/10/28TTT',
    //   establishment: 'Restaurante caribe',
    //   actorTypeName: 'Cocinero',
    // });
    return this.http.post<UserModel>(this.BASEURL + 'user/authenticate', userLogin)
    .pipe(
      catchError((err) => this.handleError(err)),
      map((user) => {
        return { ...user, role: 'admin', city: user.cityId, state: user.city?.departmentId, birthDate: user.birthDate?.substring(0, 10) };
      })
      );
  }

  public createUser(userModel: UserModel): Observable<boolean> {
    const params = {
      name: userModel.name,
      lastName: userModel.lastName,
      password: userModel.password,
      role: userModel.role,
      cityId: userModel.city,
      email: userModel.email,
      active: userModel.active,
      identification: userModel.identification,
      birthDate: userModel.birthDate,
      phone: userModel.phone,
      image: userModel.imageUrl,
      shouldChangePassword: true,
      emailValidated: false,
      actorTypeId: userModel.actorTypeId,
      establishment: userModel.establishment,

    };
    return this.http.post<boolean>(this.BASEURL + 'user', params).pipe(
        catchError((err) => this.handleError(err))
      );
  }

  public updateUser(userModel: UserModel): Observable<boolean> {
    const params = {
      id: userModel.id,
      name: userModel.name,
      lastName: userModel.lastName,
      password: userModel.password,
      role: userModel.role,
      cityId: userModel.city,
      email: userModel.email,
      active: userModel.active,
      identification: userModel.identification,
      birthDate: userModel.birthDate,
      phone: userModel.phone,
      image: !userModel.imageUrl.startsWith('data') ? null : userModel.imageUrl,
      shouldChangePassword: true,
      emailValidated: false,
      actorTypeId: userModel.actorTypeId,
      establishment: userModel.establishment,
    };
    return this.http.put<boolean>(this.BASEURL + 'user/' + userModel.id, params).pipe(
      catchError((err) => this.handleError(err))
    );
  }



  updateUserAdmin(id: string, role: string, active: boolean): Observable<boolean> {

    const params = {
      id,
      active,
      role,
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


  public getUser(id: string): Observable<UserModel> | Observable<any> | any {
      return of({
        name: 'Antonio',
        lastName: 'Aguilar',
        identification: '101870900',
        phone: '323456589',
        active: true,
        imageUrl: 'http://static.tvmaze.com/uploads/images/medium_portrait/20/50079.jpg',
        email: 'antonio@hotmail.com',
        cityId: '5001',
        state: '5',
        role: 'user',
        age: 43,
        cityName: 'Medellin',
        stateName: 'Antioquia',
        regionName: 'Caribe',
        creationDate: '2020/10/28TTT',
        establishment: 'Restaurante caribe',
        actorTypeName: 'Cocinero',
      });
      return this.http.get<UserModel>(this.BASEURL + 'user/' + id);
   }

  public getUsersByTypeActor(idActorType: string, search: string): Observable<UserModel[]> | Observable<any[]> {
    // return this.getUsers();
    return this.http.get<UserModel[]>(this.BASEURL + 'user/getUsersbyActorType/' + idActorType + '/' + search);
  }

  public getUsers(): Observable<UserModel[]> | Observable<any[]> {
//     return of([{
//       id: '1',
//       name: 'Antonio',
//       lastName: 'Aguilar',
//       identification: '101870900',
//       phone: '323456589',
//       active: true,
//       imageUrl: 'http://static.tvmaze.com/uploads/images/medium_portrait/20/50079.jpg',
//       email: 'antonio@hotmail.com',
//       cityId: '5001',
//       state: '5',
//       role: 'user',
//       age: 43,
//       cityName: 'Medellin',
//       stateName: 'Antioquia',
//       regionName: 'Caribe',
//       creationDate: '2020/10/28TTT',
//       establishment: 'Restaurante caribe',
//       actorTypeName: 'Cocinero',
//     },
//     {
//       id: '3',
//       name: 'Maria Antonieta',
//       lastName: 'De las Nieves',
//       identification: '331870900',
//       phone: '3119089876',
//       active: true,
//       imageUrl: 'http://static.tvmaze.com/uploads/images/medium_portrait/20/50079.jpg',
//       email: 'amaria@hotmail.com',
//       cityId: '5001',
//       state: '5',
//       role: 'user',
//       age: 56,
//       cityName: 'Tunja',
//       stateName: 'Boyaca',
//       regionName: 'Andina',
//       creationDate: '2020/10/13T001',
//       establishment: 'Universiodad Nacional',
//       actorTypeName: 'Docente',

//     },
//   ]).pipe(
//       map((users: any[]) => users.map((user: any) => {
//         return { ...user, city: user.cityId, creationDate: user.creationDate.substring(0, 10) };
//     } ))
// );
     return this.http.get<UserModel[]>(this.BASEURL + 'user').pipe(
      catchError((err) => this.handleError(err)),
      map((users: any[]) => users.map((user: any) => {
            return { ...user, city: user.cityId, creationDate: user.creationDate.substring(0, 10) };
        } ))
    );
 }

}
