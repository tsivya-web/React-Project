import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interface/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    id: 0,
    fName: "",
    lName: "",
    email: "",
    password: ""
  }
  
  showPassword: boolean = false

  constructor(private userService: UserService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  addUser() {
    this.userService.add(this.user)
      .subscribe({
        next: (data) => {
          debugger  
          alert("נרשמת בהצלחה!!")
          this.userService.currentUser = data
          this.userService.connected = true
          localStorage.setItem('connected', 'true')
          this.router.navigate(['listUser'])
        },
        error: (err) => {
          debugger
          console.log(err);
        }
      });
  }
}
