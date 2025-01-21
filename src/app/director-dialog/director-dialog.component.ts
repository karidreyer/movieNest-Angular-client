import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component displaying details about a movie's director.
 * Data is injected via the `MAT_DIALOG_DATA` token.
 */
@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent {
  /**
   * @param data Data injected by Angular Material dialog,
   * typically containing `Name` and `Bio` of the director.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}