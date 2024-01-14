import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateCategoryDto } from 'src/app/interfaces/Dto/ICreateCategoryDto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'tn-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  submit: boolean;
  category: ICreateCategoryDto;
  category_id: number;

  get name(){
    return this.categoryForm.get('name') as FormControl;
  }

  constructor(private router: Router, private fb: FormBuilder,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.createCategoryForm();
  }

  createCategoryForm(){
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
    }, {validators: [this.notAvailableValidation]})
  }

  notAvailableValidation(fg: AbstractControl): Validators{
    return fg.get('name').value === "My Threads" ? { notAvailable : true } : null;
  }

  // checkUniqueUsername(name: string): Boolean{
  //   return this.categoryService.checkUniqueName(name);
  // }

  onCreate(){
    this.submit = true;

    // const uniqueUsername = this.checkUniqueUsername(this.name.value);

    // if(!uniqueUsername) return

    if(!this.categoryForm.valid) return

    this.categoryService.postCategory(this.categoryData()).subscribe(succes => {
      if(!succes){
        console.log("Unsuccesfull request");
        return;
      }

      this.submit = false;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/category', this.name.value]);
      });
    });
  }

  categoryData(): ICreateCategoryDto{
    return this.category = {
      name: this.name.value,
    }
  }

}
