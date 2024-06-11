import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  loginEmail: string = '';
  loginPassword: string = '';
  registerUsername: string = '';
  registerPassword: string = '';
  registerRole: 'user' | 'admin' = 'user';
  registeremail: string = ''
  message: string = '';
  messageType: string = '';


  constructor(private authService: AuthService, private route: Router) {

  }
  ngOnInit(): void {
  }
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      
      return;
    }

    const user = {
      email: this.loginEmail,
      password: this.loginPassword,

    }
    console.log(user);
    this.authService.onLogin(user).subscribe((res: any) => {
      console.log(res);

      if (res.user.token) {
        let userData = res.user;
        this.authService.saveToken(userData.token);
        const decodedToken = JSON.parse(atob(userData.token.split('.')[1]));
        console.log(decodedToken);
        this.showMessage('Logged In!!!', 'success');
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
          if (userData.role === 'admin') {
            this.route.navigate(['/admin/dashboard'])
          } else {
            this.route.navigate(['/user/dashboard']);
          }
        }, 1000);
        

      }
    }, (err) => {
      this.showMessage('Invalid login', 'error');
      console.log(err);
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);

    })
  }

  onRegister(form: NgForm) {
    if (form.invalid) {
    
      return;
    }

    const newUser: User = {
      username: this.registerUsername,
      password: this.registerPassword,
      role: this.registerRole,
      email: this.registeremail
    };

    this.authService.onRegisterService(newUser).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.showMessage(res.message, 'success');

        this.isLoginMode = true;
      }

    },err=>{
      if(err.status ===400){
        this.showMessage('User already Exist', 'error');
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
        }, 3000);
      }
      
      console.log(err);
      

    })

  }

}
