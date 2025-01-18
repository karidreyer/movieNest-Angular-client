import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { User } from '../user.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movies: any[] = []; // Accept an array of movies from the parent component
  favoriteMovies: string[] = []; // To store IDs of user's favorite movies
  loadingFavorites: boolean = true; // Add a loading flag for favoriteMovies
  
  constructor(
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.movies.length === 0) {
      // If no movies are passed, fetch all movies
      this.getMovies();
    }
    this.getFavoriteMovies(); // Fetch user's favourite movies
  }

   // Fetch all movies from the API
   getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log('All movies:', this.movies);
      },
      (error) => {
        console.error('Error fetching all movies:', error);
      }
    );
  }

  // Fetch the user's favourite movies (for displaying the favorite icon)
  getFavoriteMovies(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      console.error('User not found in localStorage');
      return;
    }

    // Use the User model for type safety
    const user: User = JSON.parse(storedUser); // Parse the stored user data
    const username = user.Username; // Get the Username from the user object

    this.fetchApiData.getUser(username).subscribe(
      (resp: any) => {
        this.favoriteMovies = resp.FavouriteMovies || []; // Safely handle FavouriteMovies
        console.log('Favorite movie IDs:', this.favoriteMovies);
        this.loadingFavorites = false; // Mark loading as complete
      },
      (error) => {
        console.error('Error fetching favorite movies:', error);
        this.loadingFavorites = false; // Mark loading as complete even on error
      }
    );
  }

  // Check if a movie is a favourite
  isFavorite(movieId: string): boolean {
    if (this.loadingFavorites) {
      return false; // Default to outline while loading
    }
    return this.favoriteMovies.includes(movieId);
  }

  // Toggle favourite status for a movie
  toggleFavorite(movieId: string): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      console.error('User not found in localStorage');
      return;
    }

    // Use the User model for type safety
    const user: User = JSON.parse(storedUser);
    const username = user.Username;

    if (this.isFavorite(movieId)) {
      // Remove from favorites
      this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(
        () => {
          this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
          console.log('Movie removed from favorites:', movieId);
        },
        (error) => {
          console.error('Error removing movie from favorites:', error);
        }
      );
    } else {
      // Add to favourites
      this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(
        () => {
          this.favoriteMovies.push(movieId);
          console.log('Movie added to favorites:', movieId);
        },
        (error) => {
          console.error('Error adding movie to favorites:', error);
        }
      );
    }
  }

  // Open the Genre Dialog
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: movie.Genre // Pass the Genre object to the dialog
    });
  }

  // Open the Director Dialog
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: movie.Director // Pass the Director object to the dialog
    });
  }

  // Open the Synopsis Dialog
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: movie // Pass the Movie object to the dialog
    });
  }
}
