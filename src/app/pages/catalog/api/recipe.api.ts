import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { map, toArray, tap, take } from 'rxjs/operators';
import { Recipe, Preparation } from '../../../core/models/models';


@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {
  private readonly BASEURL = environment.baseUrlApi;
  private readonly MAX_RESULTS = 50;
  constructor(private http: HttpClient) {

  }

  public recipeSearch(search: string): Observable<Recipe[]> {
    return this.http.get<any[]>(this.BASEURL + 'recipe/search/' + (!search ? 'ajiaco' : search))
            .pipe(map((res) => res.map((item) => {
                 const obj: Recipe = {
                     id:  item.id,
                     name: item.name,
                     image: item.image ? item.image : null,
                     summary: '',
                     rating: this.getRandomInt(0, 10),
                     preparations: item.preparations.map((x: any) => {
                       return {
                         name : x.name,
                         image: x.image ? x.image : null,
                       };
                     }),
                 };
                 return obj;
               }
             )));
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

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}