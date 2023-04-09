import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from './update-profile.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  formGroup!: FormGroup;

  patient: Patient = new Patient();

  constructor(
    private patientService: PatientService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.patient.patientId = parseInt(sessionStorage.getItem('patientid')!, 10);

    throw new Error('Method not implemented.');
  }
  onSubmit(value: any) {
    this.patient.title = value.title;
    this.patient.firstName = value.firstName;
    this.patient.lastName = value.lastName;
    this.patient.contactNumber = value.contactNumber;
    this.patient.dob = value.dob;
    this.patient.gender = value.gender;

    this.patient.address = value.address;

    console.log(this.patient);
    this.updateUser();
  }

  updateUser() {
    this.patientService
      .updatePatient(this.patient.patientId, this.patient)
      .subscribe((data) => {
        console.log(data);
        // this.dialogRef.close();
        this.router.navigate(['/profile']);
        // this._snackBar.open("Updated Successfully","",{duration: 2000});
      });
  }
}
