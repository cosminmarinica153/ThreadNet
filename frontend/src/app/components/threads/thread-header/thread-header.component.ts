import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthentificationService } from 'src/app/services/authentification.service';
import { InteractionsService } from 'src/app/services/interactions.service';

import { NotFoundError } from 'rxjs';

@Component({
  selector: 'tn-thread-header',
  templateUrl: './thread-header.component.html',
  styleUrls: ['./thread-header.component.css']
})
export class ThreadHeaderComponent implements OnInit {
  title: string;
  keyword: string;

  isFavouriteCategory: boolean;

  constructor(private router: Router, private authService: AuthentificationService,
              private route: ActivatedRoute,private interaction: InteractionsService) {
    this.isFavouriteCategory = false;
  }

  ngOnInit() {
    if(this.router.url != "/category/My%20Threads" && this.router.url != "/category/My%20Favourites" && this.router.url != "/")
    {
      this.route.params.subscribe(params => {
        this.title = params["category_name"];
      })
    }
    if(this.router.url === '/') this.title = 'Other'
  }

  isLoggedIn(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
  }

  addToFavourites(){
    throw NotFoundError;
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
