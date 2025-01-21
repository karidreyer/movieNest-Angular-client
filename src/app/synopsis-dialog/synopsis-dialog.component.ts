import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component displaying a movie's synopsis.
 * Data is injected via `MAT_DIALOG_DATA`, typically containing the full movie object.
 */
@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss']
})
export class SynopsisDialogComponent {
  /**
   * @param data The movie object, used to display title, synopsis, and other details.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}