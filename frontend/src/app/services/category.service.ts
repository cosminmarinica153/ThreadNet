import { Injectable } from '@angular/core';
import { NotFoundError, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const url = environment.baseUrl + `Category/createCategory`;

    return this.http.post(url, category, { responseType: 'text' }).pipe(
      map(data => { return data != null; }));
  }

  // MISC Methods
  checkUniqueName(name: string): Observable<boolean>{
    throw NotFoundError;
  }
}
