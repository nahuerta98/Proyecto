import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private fb: FormBuilder, private route: Router, private authService: AuthService) { }

  //Form Declaration
  login: FormGroup;

  ngOnInit(): void {
    //Validations
    this.login = this.fb.group({
      username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  //Validations Methods
  validationError(controlName: string): boolean {
    return this.login.get(controlName).invalid && (this.login.get(controlName).dirty || (this.login.get(controlName).touched))
  }
  controlError(controlName: string, errorName: string): boolean {
    return this.login.get(controlName).hasError(errorName) && this.validationError(controlName)
  }
  validation(controlName: string): boolean{
    return this.login.get(controlName).valid
  }

   //Get Values from Login
   get loginValues(){
    return this.login.controls;
  }

  loginSubmit(){
   this.authService.login(this.loginValues.username.value, this.loginValues.password.value).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Login Success!',
       showConfirmButton: false,
       timer: 1500
      });
      this.route.navigate(['usersList']);
    },
    (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Opps..',
        text: 'Username or Password is incorrect.'
      })
    })
  }

}
