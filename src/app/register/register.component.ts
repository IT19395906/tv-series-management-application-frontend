import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  role: string = '0';
  username: string = '';
  password: string = '';
  loginErr: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  register(): void {
    if (this.username.trim() == '' || this.password.trim() == '') {
      this.toastr.error('Please enter username and password', 'Error');
      return;
    }

    this.authService.register(this.username, this.password, this.role).subscribe(
      response => {
        this.toastr.success(response.message, 'Success');
        localStorage.setItem('userType', this.role);
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error('Register User Failed', 'Error');
        this.loginErr = true;
      }
    );
  }

  show(): void {
    this.showPassword = !this.showPassword;
  }

}
