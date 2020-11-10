import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, forkJoin, of } from 'rxjs';
import { map, toArray, tap, take, catchError } from 'rxjs/operators';
import { Recipe, Preparation } from 'src/app/core/models/models';
import { AppHttpErrorHandler } from 'src/app/core/utils/errorHandler';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class RecipeApiService  extends AppHttpErrorHandler {
  private readonly BASEURL = environment.baseUrlApi;
  private readonly MAX_RESULTS = 50;
  constructor(private http: HttpClient,
              public router: Router,
              public toast: ToastrService) {
      super(router, toast);
  }

  public recipeSearch(search: string): Observable<Recipe[]> {
    return this.http.get<any[]>(this.BASEURL + 'recipe/search/' + (!search ? 'ajiaco' : search))
            .pipe(map((res) => res.map((item) => {
                 const obj: Recipe = {
                     id:  item.id,
                     name: item.name,
                     imageUrl: item.imageUrl ? item.imageUrl : null,
                     description: item.description,
                 };
                 return obj;
               }
             )));
  }


  public getPreparationsByRecipe(recipeId: string): Observable<Preparation[]> {
    return this.http.get<Preparation[]>(this.BASEURL + 'preparation/getPreparationsByRecipe/' + recipeId).pipe(
      catchError((err) => this.handleError(err)),
      map((preps: any[]) => preps.map((prep: any) => {
        return  { ...prep,
                  region: prep.city?.department?.region,
                  rating: prep.ratingAvg,
        };
      })
    ));
  }

  public ratePreparation(authorId: number, preparationId: string, comment: string, rating: number): Observable<boolean> {
    const params = {
      score: +rating,
      description: comment,
      preparationId,
      authorId,
      userId: authorId,
    };
    return this.http.post<boolean>(this.BASEURL + 'rating/', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public  getRandomImages(): Observable<any[]> {
    const imgObser = [];
    for (let i = 0; i < 10; i++) {
      imgObser.push(this.http.get<any>('https://www.themealdb.com/api/json/v1/1/random.php'));
      // .pipe((res: any) => res.meals[0].strMealThumb));
    }
    return forkJoin(imgObser);
            //      .pipe((res: any) => res.meals[0].strMealThumb);
  }


  public getRatingPreparation(idPrep: string): Observable<number> {
    return this.http.get<number>(this.BASEURL + 'rating/avg/' + idPrep).pipe(
      catchError((err) => this.handleError(err))
    );
  }

}
