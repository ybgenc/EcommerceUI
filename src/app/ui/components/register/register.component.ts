import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        userName: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
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

  submitForm(data :any) {
    if (this.registerForm.valid) {
      debugger;
      // Form submission logic
    }
  }
}
