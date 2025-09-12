import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loginErr: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  login(): void {
    if (this.username.trim() == '' || this.password.trim() == '') {
      this.toastr.error('Please enter username and password', 'Error');
      return;
    }

    this.authService.login(this.username.trim(), this.password).subscribe(
      response => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('jwtToken', response.token);
        this.router.navigate(['/home']);
      },
      error => {
        this.toastr.error('Login attempt failed', 'Error');
        this.loginErr = true;
      }
    );
  }

  show(): void {
    this.showPassword = !this.showPassword;
  }
}
