import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName,
} from '@angular/forms';
import { Router } from '@angular/router';
import {   User } from '../../models/user';
import { WhiteSpaceValidator } from 'src/app/shared/validators/whitespace.validator';
import { GenericValidator } from 'src/app/shared/validators/generic-validator-messages';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  loginForm: FormGroup;
  user: User;

// Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;  // data structutre to store validation error messages

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // create the data model define the data passed to back-end server.
    this.user = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      email: {
        required: 'Email is required.',
        whiteSpace: 'Email can not contain white spaces.',
      },
      password: {
        required: 'Password is required',
        minlength: 'Password must be at least four characters.',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // create the form model that define formGroup and formControls that matchs up with the html form input elements
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          WhiteSpaceValidator.checkWhiteSpace
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          // validate password with white spaces
          WhiteSpaceValidator.checkWhiteSpace,

          // validate password with minumum length 4 characters
          Validators.minLength(4),

          // validate password to have at least: 1 uppercase letter, 1 lowercase letter, A number, A minimum length of 8.
          Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
        ]
      ],
    });


  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.loginForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.loginForm
        );
      });
  }

  login() {
    if (this.loginForm && this.loginForm.valid) {
      this.user.email = this.loginForm.value.email;
      this.user.password = this.loginForm.value.password;
    }

    this.authService.login(this.user).subscribe(
      next => {
        // console.log('looged in successfully');
        if (this.authService.currentUser !== null){
          this.router.navigate(['/home']);
        }
      },
      error => console.log(error),
    );
    // implementing navigation to a redirect url
    if (this.authService.redirectUrl) {
      this.router.navigateByUrl(this.authService.redirectUrl);
    }else {
      this.router.navigate(['/home']);
    }
  }
}
