import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { User } from '../user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userData: User = {
    Username: '',
    Email: '',
    BirthDate: '',
    Password: ''
  }; // To hold user data
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog
  ) {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      console.log('User data from localStorage:', user); // DEBUGGING
      this.userData = user; // Assign directly to userData
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
      data: { ...this.userData } // Pass userData directly
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (result) {
        this.updateProfile(result); // Directly pass the updated User object
      }
    });
  }

  // Update the user's profile
  updateProfile(updatedUser: User): void {
    console.log('Data to send to API:', updatedUser); // DEBUGGING

  const originalUsername = this.userData.Username;

    // Directly pass the updatedUser object to the API method
    this.fetchApiData.updateUser(originalUsername, updatedUser).subscribe(
      (response: User) => {
      console.log('User updated successfully!', response);

        // Update localStorage and userData with the new data
        this.userData = response;
        localStorage.setItem('user', JSON.stringify(this.userData)); // Save updated user data
    },
    (error) => {
      console.error('Error updating user:', error);
    }
  );
}
}