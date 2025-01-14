import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component'; // Import dialog component

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};  // To hold user data

  constructor(
    private fetchApiData: FetchApiDataService,
    private fb: FormBuilder,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  // Fetch user profile from the API
  getUserProfile(): void {
    const username = 'TestUser'; // Example username for fetching user data
    this.fetchApiData.getUser(username).subscribe((userData) => {
      this.user = userData;
    });
  }

  // Open the dialog to edit profile
  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { user: this.user } // Pass the current user data to the dialog
    });

    // After the dialog closes, update the profile if the user made changes
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateProfile(result); // result will contain the updated user data
      }
    });
  }

  // Update the user's profile
  updateProfile(updatedUser: any): void {
    this.fetchApiData.updateUser(updatedUser.username, updatedUser).subscribe((response) => {
      console.log('User updated successfully!', response);
      this.getUserProfile(); // Refresh the profile data after updating
    });
  }
}