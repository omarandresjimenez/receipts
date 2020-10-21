import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { UserLogin } from '../../../../../core/models/userLogin';
import { Observable, throwError, of } from 'rxjs';
import { UserSession } from '../../../../../core/models/userSession';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppHttpErrorHandler } from '../../../../../core/utils/errorHandler';
import { UserModel } from 'src/app/core/models/UserModel';

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
    return of({
      name: 'Pedro Antonio',
      lastName: 'Lopez',
      identification: '1014870900',
      phone: '323456789',
      active: true,
      imageUrl: 'http://static.tvmaze.com/uploads/images/medium_portrait/20/50079.jpg',
      email: 'pedro@hotmail.com',
      city: '5001',
      state: '5',
      role: 'admin',
      token: '12234567890TOKEN',
      birthDate: '1960-02-12',

    });
    return this.http.post<UserModel>(this.BASEURL + 'useritems/authenticate', userLogin)
    .pipe(
      catchError((err) => this.handleError(err))
      );
  }

  public createUser(userModel: UserModel): Observable<boolean> {
    const params = {
      userName: userModel.name,
      userLastName: userModel.lastName,
      userPassword: userModel.password,
      userRole: userModel.role,
      userCity: userModel.city,
      userEmail: userModel.email,
      userActive: userModel.active,
    };
    return this.http.post<boolean>(this.BASEURL + 'users', params);
  }

  public updateUser(userModel: UserModel): Observable<boolean> {
    const params = {
      userName: userModel.name,
      userLastName: userModel.lastName,
      userPassword: userModel.password,
      userRole: userModel.role,
      userCity: userModel.city,
      userEmail: userModel.email,
      userActive: userModel.active,
    };
    return this.http.put<boolean>(this.BASEURL + 'users/' + userModel.email, params);
  }

  public deleteUser(userEmail: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASEURL + 'users/' + userEmail);
  }

  public getUsers(): Observable<UserModel[]> {
    return of([{
      name: 'Antonio',
      lastName: 'Aguilar',
      identification: '101870900',
      phone: '323456589',
      active: true,
      imageUrl: 'http://static.tvmaze.com/uploads/images/medium_portrait/20/50079.jpg',
      email: 'antonio@hotmail.com',
      city: '5001',
      state: '5',
      role: 'user',
      age: 43,
      cityName: 'Medellin',
      stateName: 'Antioquia',
      regionName: 'Caribe',
      creationDate: '2020/10/28',
    },
    {
      name: 'Maria Antonieta',
      lastName: 'De las Nieves',
      identification: '331870900',
      phone: '3119089876',
      active: true,
      imageUrl: 'http://static.tvmaze.com/uploads/images/medium_portrait/20/50079.jpg',
      email: 'amaria@hotmail.com',
      city: '5001',
      state: '5',
      role: 'user',
      age: 56,
      cityName: 'Tunja',
      stateName: 'Boyaca',
      regionName: 'Andina',
      creationDate: '2020/10/13',

    },
  ]);
    // return this.http.get<any>(this.BASEURL + 'users');
  }

}
