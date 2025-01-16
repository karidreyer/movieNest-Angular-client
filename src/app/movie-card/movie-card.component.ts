import { Component, OnInit } from '@angular/core';
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
  movies: any[] = []; // To hold all movies
  favoriteMovies: any[] = []; // To store IDs of user's favorite movies
  
  constructor(
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  // Fetch all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Fetch user's favorite movies
  getFavoriteMovies(): void {
    const storedUser: User = JSON.parse(localStorage.getItem('user') || '{}');
    if (!storedUser.Username) {
      console.error('User not found in localStorage');
      return;
    }

    this.fetchApiData.getFavoriteMovies(storedUser.Username).subscribe(
      (resp: any) => {
        this.favoriteMovies = resp.map((movie: any) => movie._id); // Store only movie IDs
        console.log('Favorite movies:', this.favoriteMovies);
      },
      (error) => {
        console.error('Error fetching favorite movies:', error);
      }
    );
  }

  // Check if a movie is a favorite
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  // Toggle favorite status for a movie
  toggleFavorite(movieId: string): void {
    const storedUser: User = JSON.parse(localStorage.getItem('user') || '{}');
    if (!storedUser.Username) {
      console.error('User not found in localStorage');
      return;
    }

    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(storedUser.Username, movieId).subscribe(
        () => {
          this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
          console.log('Movie removed from favorites:', movieId);
        },
        (error) => {
          console.error('Error removing movie from favorites:', error);
        }
      );
    } else {
      this.fetchApiData.addFavoriteMovie(storedUser.Username, movieId).subscribe(
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
