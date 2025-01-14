// src/app/user-login-form/user-login-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

ngOnInit(): void {}

// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
  // Logic for a successful user login goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success
     console.log(result); 
     localStorage.setItem('token', result.token);
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
