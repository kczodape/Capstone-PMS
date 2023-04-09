import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../patient.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  username!: string;
  password!: string;
  onsubmit() {
    console.log(this.username);
    console.log(this.password);
  }

  email!: string;
  otp!: string;
  newPassword!: string;
  retypePassword!: string;
  showOTP: boolean = false;
  showNewPassword: boolean = false;
  showIncorrectOTP: boolean = false;
  showPasswordMismatch: boolean = false;
  VerifyEmail: boolean = false;

  emailbutton: boolean = true;
  verifybutton: boolean = true;

  patiets: any[] = [];

  // email:any[]=[]

  emailExists: boolean | undefined;
  emailToCheck: any;
  patientemail: any;
  userEmail!: string;
  userOtp!: string;
  randomNum: any;
  constructor(
    public dialog: MatDialog,
    private patientService: PatientService,
    private router: Router
  ) {}

  //

  sendOTP() {
    this.patientService.checkemail().subscribe((data: any) => {
      console.log(data);
      this.patiets = data;

      this.emailExists = this.patiets.some(
        (user) => user.email === this.userEmail
      );
      // console.log(this.emailExists);
      // console.log(this.userEmail);
      if (this.emailExists) {
        console.log(this.userEmail);
        this.VerifyEmail = false;
        this.showOTP = true;
        const min = 100000; // 6 digit number starting from 100000
        const max = 999999; // 6 digit number ending at 99999

        this.randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        sessionStorage.setItem('ResetOtp', this.randomNum);
        const emailData = {
          toMail: this.userEmail,
          subject: 'Forgot password',
          message: 'enter otp to reset password  ' + this.randomNum,
        };
        // console.log(emailData);
        this.patientService.forgotPassword(emailData).subscribe();
        // console.log(emailData);
        console.log('OTP', this.randomNum);

        this.emailbutton = false;

        // console.log(`${this.userEmail} exists in the array`);
      } else {
        this.VerifyEmail = true;
        // console.log(`${this.userEmail} does not exist in the array`);
      }
    });
  }

  verifyOTP() {
    // Verify OTP
    // If OTP is correct, show new password input fields
    // If OTP is incorrect, show error message
    // console.log(sessionStorage.getItem('ResetOtp') + 'huuytrftgyhtrrtyui');
    if (sessionStorage.getItem('ResetOtp') === this.userOtp) {
      this.showIncorrectOTP = false;
      // console.log('sedrfghjtyhhhhh8uhuh88');

      this.showNewPassword = true;
      this.verifybutton = false;
      this.showFirstCard = false;
              this.showSecondCard = false;
              this.showThirdCard = true
    } else {
      this.showIncorrectOTP = true;
    }
  }

  resetPassword() {
    // Reset password
    // If password is reset successfully, show success message
    // If password reset fails, show error message
    if (this.newPassword === this.retypePassword) {
      this.showPasswordMismatch = false;
      this.patientService
        .updatePatientPassword(this.userEmail, this.newPassword)
        .subscribe();
      // console.log('Password reset successfully');
    } else {
      // Passwords don't match, show error message
      this.showPasswordMismatch = true;
    }
  }

  showFirstCard = true;
  showSecondCard = true;
  showThirdCard = false;
}