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
                     imageURL: item.imageURL ? item.imageURL : null,
                     summary: '',
                     rating: this.getRandomInt(0, 10),
                     preparations: item.preparations.map((x: any) => {
                       return {
                         name : x.name,
                         imageURL: x.imageURL ? x.imageURL : null,
                         rating: this.getRandomInt(0, 10),
                         region: this.getRandomRegion(),
                         author: this.getRandomAuthor(),
                         ingredients: x.preparationIngredients?.map( y => y.ingredient?.name),
                         tools: x.preparationTools?.map( y => y.tool?.name),
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

  private getRandomAuthor() {
    const AUTHORS = ['Pedro Lopez', 'Carmen Gomez', 'Maria Perez', 'Juliana Olarte'];
    return AUTHORS[this.getRandomInt(0, 3)];
  }

  private getRandomRegion() {
    const AUTHORS = ['Atlantica', 'Pacifica', 'Oriental', 'Cundiboyacense'];
    return AUTHORS[this.getRandomInt(0, 3)];
  }

}
