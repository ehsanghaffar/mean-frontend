import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/dto/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  Roles: any = ['Admin', 'Author', 'User'];
  hide: boolean = true;
  registerForm: FormGroup

  constructor(
    private authService: AuthService
  ) {
    this.registerForm = new FormGroup({
      nameInput: new FormControl('', Validators.required),
      emailInput: new FormControl('', Validators.required),
      passwordInput: new FormControl('', Validators.required),
      confirmPasswordInput: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onSignup() {

    const user: User = {
      name: this.registerForm.get('nameInput')?.value,
      email: this.registerForm.get('emailInput')?.value,
      password: this.registerForm.get('passwordInput')?.value,
      confirmPassword: this.registerForm.get('confirmPasswordInput')?.value
    }
    this.authService.register(user)
  }

  public errorHandling = (control: string, error: string) => {
    if (!this.registerForm.get('nameInput')?.touched && control == 'nameInput') return false
    if (!this.registerForm.get('emailInput')?.touched && control == 'emailInput') return false;
    if (!this.registerForm.get('passwordInput')?.touched && control == 'passwordInput') return false;
    if (!this.registerForm.get('confirmPasswordInput')?.touched && control == 'confirmPasswordInput') return false;
    return this.registerForm.controls[control].hasError(error)
  }

}
