import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/TableInterfaces/ICategory';

import { AuthentificationService } from 'src/app/services/authentification.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Array<ICategory>;
  popular: Array<ICategory>;
  favourites: Array<ICategory>;

  isPopularOpen: boolean;
  isFavouritesOpen: boolean;
  isOtherOpen: boolean;

  isLoggedIn: boolean;

  constructor(private categoryService: CategoryService, private authService: AuthentificationService,
              private userService: UserService) {
    this.categories = [];
    this.popular = [];
    this.favourites = [];

    this.isPopularOpen = false;
    this.isFavouritesOpen = false;
    this.isOtherOpen = false;
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
    if(this.isLoggedIn)
      this.userService.getFavouriteCategories(this.authService.getUserId()).subscribe(data => {
        this.favourites = data;
      });
  }

  // Category Toggles
  togglePopular() { this.isPopularOpen = !this.isPopularOpen; }
  toggleFavourites() { this.isFavouritesOpen = !this.isFavouritesOpen; }
  toggleOther() { this.isOtherOpen = !this.isOtherOpen; }
}
