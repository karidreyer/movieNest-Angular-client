import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
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
    Password: '',
    FavouriteMovies: []
  }; // To hold user data
  favoriteMovies: any[] = []; // To store user's favorite movies
  routerSubscription!: Subscription; // Subscription to track router events

  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.getUserData(); // Fetch user data initially
    this.subscribeToRouteChanges(); // Handle route changes
  }

  // Fetch updated user data from the API
  getUserData(): void {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      console.error('User not found in localStorage');
      return;
    }

    const user: User = JSON.parse(storedUser);
    const username = user.Username;

    this.fetchApiData.getUser(username).subscribe(
      (updatedUser: User) => {
        console.log('Updated user data fetched from API:', updatedUser);
        this.userData = updatedUser;
        localStorage.setItem('user', JSON.stringify(this.userData)); // Keep localStorage in sync
        this.getFavoriteMovies(); // Fetch favorite movies based on updated user data
      },
      (error) => {
        console.error('Error fetching updated user data:', error);
      }
    );
  }

  // Fetch the user's favorite movies
  getFavoriteMovies(): void {
    if (!this.userData.FavouriteMovies || this.userData.FavouriteMovies.length === 0) {
      console.warn('No favorite movies found for the user.');
      this.favoriteMovies = [];
      return;
    }

    this.fetchApiData.getAllMovies().subscribe(
      (movies: any[]) => {
        const favoriteMovieIds = this.userData.FavouriteMovies;
        this.favoriteMovies = movies.filter((movie) =>
          favoriteMovieIds.includes(movie._id)
        );
      },
      (error) => {
        console.error('Error fetching all movies:', error);
      }
    );
  }

  // Subscribe to router events to detect route changes
  subscribeToRouteChanges(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Re-fetch user data when navigating back to the profile page
        console.log('Route change detected. Fetching updated user data...');
        this.getUserData();
      }
    });
  }

  // Unsubscribe from router events when the component is destroyed
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { ...this.userData }
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (result) {
        this.updateProfile(result);
      }
    });
  }

  updateProfile(updatedUser: User): void {
    const originalUsername = this.userData.Username;

    this.fetchApiData.updateUser(originalUsername, updatedUser).subscribe(
      (response: User) => {
        console.log('User updated successfully!', response);
        this.userData = response;
        localStorage.setItem('user', JSON.stringify(this.userData));
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}