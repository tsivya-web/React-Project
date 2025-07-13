import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterModule,CommonModule,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  isMenuOpen = false;

  constructor(private userservice:UserService, private router: Router){

  }

  ngOnInit() {
    // Check localStorage on component initialization
    this.checkLoginStatus();
  }
 
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkLoginStatus() {
    const isConnected = localStorage.getItem('connected') === 'true';
    if (isConnected) {
      this.userservice.connected = true;
      // Restore user data if available
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.userservice.currentUser = JSON.parse(userData);
      }
    }
  }

  logout() {
    // Clear user data
    this.userservice.connected = false;
    this.userservice.currentUser = {
      id: 0,
      fName: "",
      lName: "",
      email: "",
      password: ""
    };
    localStorage.removeItem('connected');
    localStorage.removeItem('currentUser');
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  getConnected(){
    if (typeof window !== 'undefined') 
      return localStorage.getItem('connected') === 'true';
    else
      return false;
  }
}
