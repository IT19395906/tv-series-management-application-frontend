import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) { }

  login(): void {
    if (this.username.trim() == '' || this.password.trim() == '') {
      this.toastr.error('Please enter username and password', 'Error');
      return;
    }

    if (this.username.trim() == 'admin' && this.password == 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
    } else {
      this.loginErr = true;
    }
  }

  show(): void{
    this.showPassword = !this.showPassword;
  }
}
