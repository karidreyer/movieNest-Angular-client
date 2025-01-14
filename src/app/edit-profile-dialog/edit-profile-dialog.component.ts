import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent {
  profileForm: FormGroup;  // Define profileForm property

  // Inject the form builder and dialog-related data
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Receive user data from parent
  ) {
    // Initialize the profileForm with the passed user data
    this.profileForm = this.fb.group({
      username: [this.data.user.Username, Validators.required],
      email: [this.data.user.Email, [Validators.required, Validators.email]],
      birthDate: [this.data.user.BirthDate ? new Date(this.data.user.BirthDate).toISOString().split('T')[0] : '', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value); // Return the updated user data to the parent
    }
  }

  // Method to handle cancel button click
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without making any changes
  }
}