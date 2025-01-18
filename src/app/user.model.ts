export interface User {
    Username: string;
    Password?: string; // Optional because not all updates will require a password change
    Email: string;
    BirthDate: string;
    FavouriteMovies: string[]; // Array of movie IDs
  }