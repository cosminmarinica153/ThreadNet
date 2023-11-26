import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  // Create a new category
  addCategory(category: ICategory){
    let categories = [];
    if(localStorage.getItem('Categories')){
      categories = JSON.parse(localStorage.getItem('Categories'));
      categories = [...categories, category];
    }
    else categories = [category];

    localStorage.setItem('Categories', JSON.stringify(categories));
  }
  // Category Validation Checks
  checkUniqueName(name: string): Boolean{
    if(!localStorage.getItem('Categories')) return true;

    const categories = this.getAllCategories();
    let isUnique = true;
    if(categories.find(category => category.name === name)){
      isUnique = false;
    }
    return isUnique;
  }

  getAllCategories(): Array<ICategory>{
    if(!localStorage.getItem('Categories')) return [];

    return JSON.parse(localStorage.getItem('Categories'));
  }
  getAllCategoryNames(): Array<string>{
    if(!localStorage.getItem('Categories')) return [];

    const categoryArray: Array<string> = [];
    this.getAllCategories().forEach((category: ICategory) => {
      categoryArray.push(category.name);
    })
    return categoryArray;
  }

  getLastId(): number{
    let id: number = 1;
    if(!localStorage.getItem('Categories')) return id;

    const categories = this.getAllCategories();
    if(categories.length === 0) return id ;

    id = categories[categories.length - 1].id + 1;
    return id;
  }

  getCategoryId(category_name: string): number{
    if(!localStorage.getItem('Categories')) return null;

    return this.getAllCategories().find(category => category.name === category_name).id;
  }

  getCategoryById(category_id: number): ICategory{
    if(!localStorage.getItem('Categories')) return null;

    return this.getAllCategories().find(category => category.id === category_id);
  }

  getCategoryNameById(category_id: number): string{
    if(!localStorage.getItem('Categories')) return "";

    return this.getAllCategories().find(category => category.id === category_id).name;
  }

}
