import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category } from '../../models/category';
import { GenericValidator } from 'src/app/shared/validators/generic-validator-messages';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-or-edit-category',
  templateUrl: './add-or-edit-category.component.html',
  styleUrls: ['./add-or-edit-category.component.scss']
})
export class AddOrEditCategoryComponent implements OnInit {

  title = 'Add Category';
  addOREditCategoryForm: FormGroup;
  id: number;
  category: Category;
  editMode: boolean = false;
  subscription: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;  // data structutre to store validation error messages

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService) {
    this.validationMessages = {
      name: {
        required: 'Product name is required.',
        minlength: 'Product name can not be less than 3 characters.',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let categoryName = '';

    if (this.editMode) {
      this.categoryService.getCategoryById(this.id).subscribe({
        next: category => {
          this.category = category;
          categoryName = category.name;
          this.title = `Edit Category: ${this.category.name}`;
          this.makeForm(categoryName);
        }
      });
    }
    else {
      this.title = 'Add Category';
      this.makeForm(categoryName);
    }
  }

  private makeForm(catName: string): void {
    this.addOREditCategoryForm = new FormGroup({
      'name': new FormControl(catName, Validators.required)
    });
  }

  saveCategory(): void {
    if (this.addOREditCategoryForm.valid) {
      if (this.addOREditCategoryForm.dirty) {
        const category = { ...this.category, ...this.addOREditCategoryForm.value }
        if (!this.editMode) {
          this.categoryService.addCategory(category).subscribe({
            next: () => {
              this.addOREditCategoryForm.reset();
              this.router.navigate(['/admin/categories']);
            }
          });
        } else {
          this.categoryService.updateCategory(category).subscribe({
            next: () => {
              this.addOREditCategoryForm.reset();
              this.router.navigate(['/admin/categories']);
            }
          });
        }
      }
    }
  }

  onCancel() {
    this.router.navigate(['/admin/categories']);
  }

}
