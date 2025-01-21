import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../user.model';

/**
 * Base URL for the MovieNest API endpoints
 */
const apiUrl = 'https://movie-nest-app-630a7e8ce836.herokuapp.com/';

/**
 * Service providing methods to interact with the MovieNest API.
 * 
 * Methods include user registration, login, fetching movies, updating user info, 
 * managing favorite movies, and more. Each method returns an `Observable` of the response.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * Creates an instance of FetchApiDataService.
   * @param http - Angular HttpClient used for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves the JWT token from local storage.
   * @returns A JWT token string or an empty string if none is found
   */
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * Registers a new user.
   * @param userDetails - An object containing the user's registration details
   * @returns An `Observable` of the newly created user
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in an existing user.
   * @param userDetails - An object containing the user's login credentials
   * @returns An `Observable` of the login result, including a JWT token
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves data of a specific user.
   * @param username - The username to fetch
   * @returns An `Observable` of the user data
   */
  public getUser(username: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Updates an existing user's information.
   * @param username - The user's current username
   * @param updatedUser - The updated user data (including username, password, etc.)
   * @returns An `Observable` of the updated user object
   */
  public updateUser(username: string, updatedUser: User): Observable<any> {
    const token = this.getToken();
    return this.http
      .put(`${apiUrl}users/${username}`, updatedUser, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes an existing user account.
   * @param username - The username of the account to delete
   * @returns An `Observable` of the deletion result
   */
  public deleteUser(username: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches all movies from the API.
   * @returns An `Observable` containing an array of all movie objects
   */
  public getAllMovies(): Observable<any> {
    const token = this.getToken();
    return this.http
      .get<any>(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches details of a single movie by title.
   * @param title - The movie title to retrieve
   * @returns An `Observable` of the movie data
   */
  public getMovie(title: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches details of a director by name.
   * @param name - The director's name
   * @returns An `Observable` of the director data
   */
  public getDirector(name: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(`${apiUrl}movies/director/${name}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }
  
  /**
   * Fetches details of a genre by name.
   * @param name - The genre name
   * @returns An `Observable` of the genre data
   */
  public getGenre(name: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(`${apiUrl}movies/genre/${name}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }
  

  /**
   * Adds a movie to a user's list of favorite movies.
   * @param username - The user's username
   * @param movieId - The ID of the movie to add
   * @returns An `Observable` of the updated user data
   */
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .post(`${apiUrl}users/${username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Removes a movie from a user's list of favorite movies.
   * @param username - The user's username
   * @param movieId - The ID of the movie to remove
   * @returns An `Observable` of the updated user data
   */
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Extracts response data from HTTP response.
   * @param res - The HTTP response
   * @returns The response body or an empty object
   */
  private extractResponseData(res: any): any {
    return res || {};
  }

  /**
   * Handles HTTP errors from API calls.
   * Logs the error, and returns a user-friendly error message wrapped in an `Observable` via `throwError`.
   * @param error - The HTTP error response
   * @returns An `Observable` that throws a formatted error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
      return throwError('An error occurred: ' + error.error.message);
    } else {
      console.error(`Server-side error: ${error.status} - ${error.message}`);
      return throwError(`Server error: ${error.message}`);
    }
  }
}