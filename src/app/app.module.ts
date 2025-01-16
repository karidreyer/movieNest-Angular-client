import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FetchApiDataService } from './services/fetch-api-data.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { GenreDialogComponent } from './genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from './director-dialog/director-dialog.component';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SynopsisDialogComponent } from './synopsis-dialog/synopsis-dialog.component';

const appRoutes: Routes = [

  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },

  { path: 'welcome', component: WelcomePageComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'movies', component: MovieCardComponent },
      { path: 'profile', component: ProfilePageComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    ProfilePageComponent,
    GenreDialogComponent,
    DirectorDialogComponent,
    EditProfileDialogComponent,
    NavBarComponent,
    MainLayoutComponent,
    SynopsisDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  providers: [FetchApiDataService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [GenreDialogComponent, DirectorDialogComponent, SynopsisDialogComponent] // Declare dialog components
})
export class AppModule { }
