import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor() { }
  addCategory(category: ICategory){
    let categories = [];
    if(localStorage.getItem('Categories')){
      categories = JSON.parse(localStorage.getItem('Categories'));
      categories = [...categories, category];
    }
    else{
      categories = [category];
    }
    localStorage.setItem('Categories', JSON.stringify(categories));
  }

  getAllCategories(): Array<ICategory>{
    return JSON.parse(localStorage.getItem('Categories'));
  }

  getCategoryNameById(category_id: number): string{
    const categories = this.getAllCategories();
    return categories.find(category => category.id === category_id).name;
  }

  getCategoryId(category_name: string): number{
    const categories = this.getAllCategories();
    return categories.find(category => category.name === category_name).id;
  }

  getCategoryById(category_id: number): ICategory{
    const categories = this.getAllCategories();
    return categories.find(category => category.id === category_id);
  }

  getLastId(): number{
    let categories = JSON.parse(localStorage.getItem('Categories'));
    return +categories.length + 1;
  }
}
