import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../user.model';


const apiUrl = 'https://movie-nest-app-630a7e8ce836.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Get token from local storage
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // User Registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User Login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get User
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

  // Update User
  public updateUser(username: string, updatedUser: User): Observable<any> {
    const token = this.getToken();
    return this.http
      .put(`${apiUrl}users/${username}`, updatedUser, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  // Delete User
  public deleteUser(username: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get All Movies
  public getAllMovies(): Observable<any> {
    const token = this.getToken();
    return this.http
      .get<any>(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get Single Movie
  public getMovie(title: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get Director
  public getDirector(name: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(`${apiUrl}movies/director/${name}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }
  
  // Get Genre
  public getGenre(name: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(`${apiUrl}movies/genre/${name}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }
  

  // Add Movie to Favorites
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .post(`${apiUrl}users/${username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  // Remove Movie from Favorites
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get Favorite Movies
  public getFavoriteMovies(username: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(`${apiUrl}users/${username}/movies`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }


  // Extract Response Data
  private extractResponseData(res: any): any {
    return res || {};
  }

  // Handle API Errors
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