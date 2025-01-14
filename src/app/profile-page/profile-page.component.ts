import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userData: any = {}; // To hold user data
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog
  ) {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      let user = JSON.parse(storedUser);
      console.log('User data from localStorage:', user); // Log the parsed user data to verify

      this.userData.userName = user.Username;
      this.userData.email = user.Email;
      this.userData.birthDate = new Date(user.BirthDate);
      this.userData.password = null;
    } else {
      // Handle the case when no user is stored (e.g., redirect to login page or show an error)
      console.error('User not found in localStorage');
      // Optionally redirect or show a message here
    }
  }

  ngOnInit(): void {}

  // Open the Edit Profile Dialog
  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: this.userData  // Pass the current user data to the dialog
    });

    // After the dialog closes, update the profile if the user made changes
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateProfile(result);  // result will contain the updated user data
      }
    });
  }

  // Update the user's profile (this should call your API to update the data)
  updateProfile(updatedUser: any): void {
    this.fetchApiData.updateUser(updatedUser.userName, updatedUser).subscribe((response) => {
      console.log('User updated successfully!', response);
      this.userData = updatedUser;  // Update the local user data with the changes
      localStorage.setItem("user", JSON.stringify(updatedUser));  // Store updated data in localStorage
    });
  }
}