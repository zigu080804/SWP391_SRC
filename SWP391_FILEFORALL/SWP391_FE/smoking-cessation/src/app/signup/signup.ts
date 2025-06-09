import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signupForm: FormGroup;
  errorMessage: string = '';
  age: number | '' = '';

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      dob: ['', Validators.required], // changed from ageDoB to dob
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  calculateAge() {
    const dobValue = this.signupForm.get('dob')?.value;
    if (dobValue) {
      const today = new Date();
      const dob = new Date(dobValue);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      this.age = age >= 0 ? age : '';
    } else {
      this.age = '';
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { fullName, dob, username, email, password, confirmPassword } = this.signupForm.value;
      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if username or email already exists
      if (users.some((u: any) => u.username === username || u.email === email)) {
        this.errorMessage = 'Username or email already exists.';
        return;
      }
      
      // Add new user
      users.push({ fullName, dob, username, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      this.errorMessage = 'Signup successful! You can now login.';
      this.signupForm.reset();
      this.age = '';
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
