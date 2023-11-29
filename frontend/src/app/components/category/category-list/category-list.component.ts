import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/ICategory';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CategoryService } from 'src/app/services/category.service';
import { InteractionsService } from 'src/app/services/interactions.service';
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

  constructor(private categoryService: CategoryService, private authService: AuthentificationService, private interaction: InteractionsService) {
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
    this.favourites = this.interaction.getFavouriteCategories();
  }

  // Category Toggles
  togglePopular() { this.isPopularOpen = !this.isPopularOpen; }
  toggleFavourites() { this.isFavouritesOpen = !this.isFavouritesOpen; }
  toggleOther() { this.isOtherOpen = !this.isOtherOpen; }
}
