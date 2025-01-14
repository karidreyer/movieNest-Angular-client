import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  logout(): void {
    // Clear the stored token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  
    // Show a snackbar message to inform the user they have logged out
    this.snackBar.open('Logged out successfully', 'OK', {
      duration: 2000
    });
  
    // Navigate the user to the login page or home page
    this.router.navigate(['welcome']);
  }
}