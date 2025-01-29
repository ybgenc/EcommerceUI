import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Create_User } from 'src/app/contract/users/create-user';
import { User } from 'src/app/Entities/User';
import { Position } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { ToasterAlertType, ToasterCustomService, ToasterPosition } from 'src/app/services/ui/toaster-custom.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService : UserService,
    private toastService : ToasterCustomService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        userName: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
        confirmPassword: ['', [Validators.required]],
        agreeTerms: [false, [Validators.requiredTrue]]
      },
      { validator: this.passwordMatchValidator } // Custom validator for matching passwords
    );

    // If needed, subscribe to the value changes as well
    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';

    const errors: ValidationErrors = {};
    if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
    if (!/[a-z]/.test(value)) errors['lowercase'] = true;
    if (!/\d/.test(value)) errors['number'] = true;
    if (!/[@$!%*?&.,:;]/.test(value)) errors['specialChar'] = true;

    return Object.keys(errors).length ? errors : null;
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  checkPasswords(): void {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors(null); // No mismatch error
    } else {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true }); // Mismatch error
    }
  }

 async  submitForm(user : User) {
    if (this.registerForm.valid) {
     const result : Create_User = await this.userService.create(user);
     if(result.succeeded){
      this.toastService.message(result.message, 'User created successfully.',{
        toasterAlertType : ToasterAlertType.Success,
        position:ToasterPosition.TopRight
      })
     }
      else
        this.toastService.message(result.message,"User creation failed due to an unexpected error.",{
        toasterAlertType : ToasterAlertType.Error,
        position:ToasterPosition.TopRight
      })
     
    }
  }
}
