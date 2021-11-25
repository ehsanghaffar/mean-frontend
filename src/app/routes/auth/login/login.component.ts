import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/dto/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  hide: boolean = true;
  form: NgForm;

  loginFormControl: FormGroup

  constructor(
    private authService: AuthService
  ) {
    this.loginFormControl = new FormGroup({
      emailFormControl: new FormControl('', Validators.required),
      passwordFormControl: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

  }

  onLogin() {
    const loginDto = {
      email: this.loginFormControl.get('emailFormControl')?.value,
      password: this.loginFormControl.get('passwordFormControl')?.value
    }
    this.authService.login(loginDto)
  }

  public errorHandling = (control: string, error: string) => {
    if (!this.loginFormControl.get('emailFormControl')?.touched && control == 'emailFormControl') return false;
    if (!this.loginFormControl.get('passwordFormControl')?.touched && control == 'passwordFormControl') return false;
    return this.loginFormControl.controls[control].hasError(error)
  }

}
