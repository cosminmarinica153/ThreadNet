import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ICategory } from '../interfaces/TableInterfaces/ICategory';
import { IThread } from '../interfaces/TableInterfaces/IThread';
import { ICreateCategoryDto } from '../interfaces/Dto/ICreateCategoryDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // CRUD OPERATIONS
  // GET
  getOne(id: number): Observable<ICategory>{
    return this.http.get<ICategory>(environment.baseUrl + `Category/getOne${id}`);
  }

  getAll(): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(environment.baseUrl + `Category/getAll`);
  }

  getPopularityScore(id: number): Observable<number>{
    return this.http.get<number>(environment.baseUrl + `Category/getPopularityScore${id}`)
  }

  getTopCategories(count: number): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(environment.baseUrl + `Category/getTopCategories${count}`);
  }

  getThreads(id: number): Observable<IThread[]>{
    return this.http.get<IThread[]>(environment.baseUrl + `Category/getThreads${id}`);
  }

  // OTHER
  postCategory(category: ICreateCategoryDto): Observable<boolean>{
    return this.http.post<ICreateCategoryDto>(environment.baseUrl + `Category/createCategory`, category).pipe(
      map(data => {
        return data != null;
      })
    );
  }

  // MISC Methods
  checkUniqueName(name: string): Boolean{
    return true;
  }
}
