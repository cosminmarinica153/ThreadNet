import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/ICategory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'tn-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Array<ICategory>;
  popular: Array<number>;
  favourites: Array<number>;
  isPopularOpen: boolean = false;
  isFavouritesOpen: boolean = false;
  isOtherOpen: boolean = false;

  constructor(private categoryService: CategoryService) {
    this.categories = [];
    this.popular = [];
    this.favourites = [];
  }

  ngOnInit() {
    this.categories = this.categoryService.getAllCategories();
    this.categories.forEach(category => {
      if(category.type.length > 0 && category.type.includes("Popular"))
        this.popular.push(category.id);
      if(category.type.length > 0 && category.type.includes("Favourites"))
        this.popular.push(category.id);
    });
  }

  // Category Toggles
  togglePopular() { this.isPopularOpen = !this.isPopularOpen; }
  toggleFavourites() { this.isFavouritesOpen = !this.isFavouritesOpen; }
  toggleOther() { this.isOtherOpen = !this.isOtherOpen; }


}
