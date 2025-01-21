import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

/**
 * The WelcomePageComponent provides a landing screen
 * where users can register or log in. 
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of WelcomePageComponent.
   * @param dialog Angular Material dialog service for opening modals
   */
  constructor(public dialog: MatDialog) { }
  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
  }
  /**
   * Opens a dialog containing the UserRegistrationFormComponent.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  /**
   * Opens a dialog containing the UserLoginFormComponent.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
