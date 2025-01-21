import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component displaying details about a movie's genre.
 * Data is injected via the `MAT_DIALOG_DATA` token.
 */
@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent {
  /**
   * @param data Data injected by Angular Material dialog,
   * typically containing the genre's `Name` and `Description`.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}