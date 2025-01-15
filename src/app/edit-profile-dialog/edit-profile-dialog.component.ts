import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Ensure the birthDate is a Date object
    const birthDate = new Date(data.birthDate); // This will create a Date object from the string if necessary
    // Initialize the form with the data passed from ProfilePageComponent
    this.profileForm = this.fb.group({
      username: [data.userName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      birthDate: [birthDate.toISOString().split('T')[0], Validators.required], // Pre-fill as YYYY-MM-DD
      password: [''], // Empty unless changed
    });
  }

  // Save the form data
  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;

      console.log('Form values on submit:', formValues); // DEBUGGING
      this.dialogRef.close(formValues);
    }
  }

  // Close the dialog without saving
  onCancel(): void {
    this.dialogRef.close();
  }
}