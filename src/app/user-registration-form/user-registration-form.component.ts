// src/app/user-registration-form/user-registration-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * UserRegistrationFormComponent provides a form for creating a new user account.
 * On success, it closes the modal and displays a signup success message.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Contains user registration details: username, password, email, birthdate.
   */
  @Input() userData = { Username: '', Password: '', Email: '', BirthDate: '' };

/**
  * @param fetchApiData Service to communicate with the API (userRegistration method)
  * @param dialogRef Reference to the dialog for closing on success or failure
  * @param snackBar Provides feedback messages to the user
  */
constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

/**
   * Lifecycle hook.
   */
ngOnInit(): void {
}

/**
   * Registers a new user with the API. On success, closes the modal and notifies the user.
   */
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(result); 
     this.snackBar.open('Signup successful', 'OK', {
        duration: 2000
     });
    }, (result) => {
      console.log(result);
      this.snackBar.open('Signup failed, please try again.', 'OK', {
        duration: 2000
      });
    });
  }

  }
