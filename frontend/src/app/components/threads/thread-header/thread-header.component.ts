import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CategoryService } from 'src/app/services/category.service';
import { InteractionsService } from 'src/app/services/interactions.service';

@Component({
  selector: 'tn-thread-header',
  templateUrl: './thread-header.component.html',
  styleUrls: ['./thread-header.component.css']
})
export class ThreadHeaderComponent implements OnInit {
@Input() title: string;
  category_id: number;
  keyword: string;

  isFavouriteCategory: boolean;

  constructor(private router: Router, private authService: AuthentificationService,
              private interaction: InteractionsService, private categoryService: CategoryService) {
    this.isFavouriteCategory = false;
  }

  ngOnInit() {
    if(this.router.url != "/category/My%20Threads" && this.router.url != "/category/My%20Favourites" && this.router.url != "/")
    {
      this.category_id = this.categoryService.getCategoryId(this.title);
      this.isFavouriteCategory = this.interaction.isFavouriteCategory(this.category_id);
    }
    if(this.router.url === '/') this.title = 'Other'
  }

  isLoggedIn(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
  }

  addToFavourites(){
    this.interaction.favouriteCategory(this.category_id);
    this.isFavouriteCategory = this.interaction.isFavouriteCategory(this.category_id);

    var currentUrl = decodeURIComponent(this.router.url);
    this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
      if(!currentUrl.includes('search'))
        this.router.navigate([currentUrl]);
      else{
        const index = currentUrl.indexOf('search');
        currentUrl = currentUrl.slice(0, index);
        this.router.navigate([currentUrl]);
      }
    });
  }

  onSubmit(){
    this.router.navigate(['/category', this.title, 'search'], {
      queryParams: { keyword: this.keyword }
    });
  }

  sortBy(type: string, order: string){
    const sort = {type: type, order: order};
    this.interaction.setSort(sort);

    const url = decodeURI(this.router.url);
    this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }

}
