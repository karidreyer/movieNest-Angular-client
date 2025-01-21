import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { User } from '../user.model';

/**
 * MovieCardComponent displays a grid or list of movie cards.
 * Allows the user to view details (genre, director, synopsis) 
 * and manage favorite movies (add/remove).
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /**
   * An array of movie objects, possibly passed from a parent component.
   */
  @Input() movies: any[] = [];

  /**
   * Stores the IDs of the user's favorite movies.
   */
  favoriteMovies: string[] = [];

  /**
   * Indicates whether favorite movies are still loading.
   */
  loadingFavorites: boolean = true;
  
  /**
   * @param fetchApiData Service handling API calls
   * @param dialog Angular Material dialog service
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog
  ) { }

  /**
   * Lifecycle hook: fetches movie data if `movies` array is empty,
   * and loads user's favorite movies.
   */
  ngOnInit(): void {
    if (this.movies.length === 0) {
      // If no movies are passed, fetch all movies
      this.getMovies();
    }
    this.getFavoriteMovies(); // Fetch user's favourite movies
  }

   /**
   * Fetches all movies from the API.
   */
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

  /**
   * Fetches and stores the user's favorite movie IDs, to show heart icons.
   */
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

  /**
   * Determines whether a movie ID is in the user's favorite list.
   * @param movieId The movie's unique ID
   * @returns True if movie is a favorite, otherwise false
   */
  isFavorite(movieId: string): boolean {
    if (this.loadingFavorites) {
      return false; // Default to outline while loading
    }
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * Toggles a movie's favorite status: adds it if not favorite, removes it if already favorite.
   * @param movieId The unique ID of the movie
   */
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

  /**
   * Opens a dialog to display genre details for a given movie.
   * @param movie The movie containing the genre data
   */
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: movie.Genre // Pass the Genre object to the dialog
    });
  }

  /**
   * Opens a dialog to display director details for a given movie.
   * @param movie The movie containing the director data
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: movie.Director // Pass the Director object to the dialog
    });
  }

  /**
   * Opens a dialog to display the synopsis for a given movie.
   * @param movie The movie containing the synopsis data
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: movie // Pass the Movie object to the dialog
    });
  }
}
