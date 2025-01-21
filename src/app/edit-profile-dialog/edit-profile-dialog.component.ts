import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../user.model';

/**
 * EditProfileDialogComponent provides a form for editing a user's profile information.
 * Displays the current user data, allowing updates to username, email, birth date, and password.
 */
@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent {
  /**
   * The reactive form group containing user profile fields.
   */
  profileForm: FormGroup;

  /**
   * Creates an instance of EditProfileDialogComponent.
   * @param fb FormBuilder for creating a reactive form
   * @param dialogRef Reference to this dialog to close it after saving/canceling
   * @param data The user data injected from `ProfilePageComponent`
   * @param datePipe Used to format the `BirthDate` for the form
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, // Use User model
    private datePipe: DatePipe // Inject DatePipe
  ) {
    const formattedBirthDate = this.datePipe.transform(data.BirthDate, 'yyyy-MM-dd'); // Format birthdate
  
    // Initialize the form with the data passed from ProfilePageComponent
    this.profileForm = this.fb.group({
      Username: [data.Username, Validators.required],
      Email: [data.Email, [Validators.required, Validators.email]],
      BirthDate: [formattedBirthDate, Validators.required], // Use the formatted date
      Password: [''], // Empty unless changed
    });
  }

  /**
  * Submits the form data. If valid, the dialog is closed and the updated data is returned.
  */
  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value as User; // Explicitly cast to User model
  
      // Format the birth date - NEEDED?
      formValues.BirthDate = new Date(formValues.BirthDate).toISOString().split('T')[0];
  
      this.dialogRef.close(formValues); // Return the data
    }
  }

  /**
   * Cancels the edit operation, closing the dialog without passing any data.
   */
  onCancel(): void {
    this.dialogRef.close(null); // Explicitly pass null to indicate no changes
  }
}