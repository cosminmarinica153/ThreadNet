import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/ICategory';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CategoryService } from 'src/app/services/category.service';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
  selector: 'tn-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Array<ICategory>;
  popular: Array<number>;
  favourites: Array<number>;

  isPopularOpen: boolean;
  isFavouritesOpen: boolean;
  isOtherOpen: boolean;

  isLoggedIn: boolean;

  constructor(private categoryService: CategoryService, private authService: AuthentificationService) {
    this.categories = [];
    this.popular = [];
    this.favourites = [];

    this.isPopularOpen = false;
    this.isFavouritesOpen = false;
    this.isOtherOpen = false;
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.categories = this.categoryService.getAllCategories();

    this.categories.forEach(category => {
      if(category.type.length && category.type.includes("Popular"))
        this.popular.push(category.id);
      if(category.type.length && category.type.includes("Favourites"))
        this.favourites.push(category.id);
    });
  }

  // Category Toggles
  togglePopular() { this.isPopularOpen = !this.isPopularOpen; }
  toggleFavourites() { this.isFavouritesOpen = !this.isFavouritesOpen; }
  toggleOther() { this.isOtherOpen = !this.isOtherOpen; }


}
