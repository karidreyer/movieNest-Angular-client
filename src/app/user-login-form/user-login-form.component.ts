// src/app/user-login-form/user-login-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * UserLoginFormComponent provides a form where existing users can log in.
 * On success, stores token and user data in localStorage, then navigates to `/movies`.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Holds the login credentials entered by the user.
   */
  @Input() userData = { Username: '', Password: '' };

/**
   * @param fetchApiData Service for making login API calls
   * @param dialogRef Reference to this dialog for closing upon success
   * @param snackBar Displays login success or error messages
   * @param router Navigates the user to the movies screen on successful login
   */
constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

/**
  * Lifecycle hook.
  */
ngOnInit(): void {}

/**
   * Attempts to log the user in via the FetchApiDataService.
   * On success, closes the dialog, stores token/user data, and navigates to `/movies`.
   */
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
     this.dialogRef.close(); // This will close the modal on success
     localStorage.setItem('token', result.token); // This will store the token in the local storage for authentication
     localStorage.setItem('user', JSON.stringify(result.user));  // Save the user data in local storage for profile page
     
     this.snackBar.open('Login successful', 'OK', {
        duration: 2000
     });
     this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open('Incorrect username or password.', 'OK', {
        duration: 2000
      });
    });
  }
}