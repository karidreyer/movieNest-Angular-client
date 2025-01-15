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
      console.log('User data from localStorage:', user); // DEBUGGING

      this.userData.userName = user.Username;
      this.userData.email = user.Email;
      this.userData.birthDate = new Date(user.BirthDate);
      this.userData.password = null;
    } else {
      console.error('User not found in localStorage');
      // Add a re-direct here?
    }
  }

  ngOnInit(): void {}

  // Open the Edit Profile Dialog
  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: {
        username: this.userData.userName,
        email: this.userData.email,
        birthDate: this.userData.birthDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        password: null
      }
    });
    console.log('Opening dialog with data:', this.userData); //DEBUGGING
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateProfile(result);
      }
    });
  }

// Update the user's profile (this calls the API to update the data)
updateProfile(updatedUser: any): void {
  // Map the form fields to the expected API format
  const formattedData: any = {
    Username: updatedUser.username,  // Map 'username' to 'Username'
    Email: updatedUser.email,        // Map 'email' to 'Email'
    BirthDate: new Date(updatedUser.birthDate).toISOString(), // Convert birthDate to ISO string format
  };

  // Only add Password if it's provided (check for changes)
  if (updatedUser.password && updatedUser.password !== '') {
    formattedData.Password = updatedUser.password;  // Map 'password' to 'Password'
  }

  // Log the formatted data to the console before sending it to the API - DEBUGGING
  console.log('Formatted data to send to API:', formattedData);

  // Use the original username from localStorage as we don't want to overwrite it
  const originalUsername = this.userData.Username;

  // Make the API call to update the user
  this.fetchApiData.updateUser(originalUsername, formattedData).subscribe(
    (response) => {
      console.log('User updated successfully!', response);

      // Update localStorage and userData with the response
      this.userData = { ...this.userData, ...response };
      localStorage.setItem('user', JSON.stringify(this.userData)); // Save updated user data back to localStorage
    },
    (error) => {
      console.error('Error updating user:', error);
    }
  );
}
}