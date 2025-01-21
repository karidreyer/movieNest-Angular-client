import { Component } from '@angular/core';

/**
 * MainLayoutComponent serves as a wrapper layout 
 * for child routes (e.g., movies, profile).
 */
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  // This component acts as a container for nested routes 
  // and includes elements like a NavBar if desired.
}
