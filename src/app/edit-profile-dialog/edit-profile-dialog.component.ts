import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent {
  profileForm: FormGroup;

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

  // Save the form data
  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value as User; // Explicitly cast to User model
  
      // Format the birth date - NEEDED?
      formValues.BirthDate = new Date(formValues.BirthDate).toISOString().split('T')[0];
  
      this.dialogRef.close(formValues); // Return the data
    }
  }

  // Close the dialog without saving
  onCancel(): void {
    this.dialogRef.close(null); // Explicitly pass null to indicate no changes
  }
}