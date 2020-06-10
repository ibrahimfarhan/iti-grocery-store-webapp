import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControlName,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { WhiteSpaceValidator } from 'src/app/shared/validators/whitespace.validator';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from 'src/app/shared/validators/generic-validator-messages';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  registerForm: FormGroup;
  user: User;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user = {
      id: null,
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    };

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      firstName: {
        required: 'First name is required.',
        whiteSpace: 'First name can not contain white spaces',
      },
      lastName: {
        required: 'user code is required.',
        whiteSpace: 'Last name can not contain white spaces',
      },
      email: {
        required: 'Email address is required.',
        email: 'Please enter a valid email.',
      },
      password: {
        required: 'Password is required',
        minlength: 'Password must be at least four characters.',
        pattern:
          'Password should have at least: 1 uppercase letter, 1 lowercase letter, A number, A minimum length of 8.',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, WhiteSpaceValidator.checkWhiteSpace],
      ],
      lastName: [
        '',
        [Validators.required, WhiteSpaceValidator.checkWhiteSpace],
      ],
      email: [
        '',
        [
          Validators.required,
          WhiteSpaceValidator.checkWhiteSpace,
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          // validate password with white spaces
          // WhiteSpaceValidator.checkWhiteSpace,

          // validate password with minumum length 4 characters
          // Validators.minLength(4),

          // validate password to have at least: 1 uppercase letter, 1 lowercase letter, A number, A minimum length of 8.
          // Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
        ],
      ],
      orderInfo: false,
      address: '',
      phoneNumber: '',
    });
  }
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<
      any
    >[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.registerForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(100))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.registerForm
        );
      });
  }

  register() {
    console.log(this.registerForm);
    if (this.registerForm && this.registerForm.valid) {
      this.user.firstName = this.registerForm.value.firstName;
      this.user.lastName = this.registerForm.value.lastName;
      this.user.password = this.registerForm.value.password;
      this.user.email = this.registerForm.value.email;
      this.user.phoneNumber = this.registerForm.value.phoneNumber;
      this.user.address = this.registerForm.value.address;
    }
    console.log(this.user);
    this.authService.register(this.user).subscribe(
      (next) => console.log('registration successful'),
      (error) => console.log(error),
      () => {
        this.authService.login(this.user).subscribe((next) => {
          if (this.authService.currentUser !== null) {
            this.router.navigate(['/home']);
          }
        });
      }
    );
  }
}
