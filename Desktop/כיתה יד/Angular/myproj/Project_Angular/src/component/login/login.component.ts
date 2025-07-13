import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { error } from 'node:console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  email: string = ""
  password: string = ""
  showPassword: boolean = false

  constructor(private userService: UserService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  CheckUser() {
    this.userService.getUser(this.email, this.password).subscribe({
      next: (data) => {
        console.log(data)
        debugger
        alert("you are login")
        this.userService.currentUser = data
        this.userService.connected = true
        localStorage.setItem('connected', 'true')
        localStorage.setItem('currentUser', JSON.stringify(data))
        this.router.navigate(['listUser'])
      },
      error: (err) => {
        debugger  
        console.log(err)
        alert("you are not login")
        this.router.navigate(['register'])
      }
    })
  }
}

    





