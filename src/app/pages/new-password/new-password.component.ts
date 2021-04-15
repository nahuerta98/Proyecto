import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor( private fb: FormBuilder, private route: Router) { }

  //Form Declaration
  password: FormGroup;

  ngOnInit(): void {
    //Validations
    this.password = this.fb.group({
      password:['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}")]],
      password2: ['', [Validators.required]]
    });
  }

  //Validations Methods
  validation(controlName: string): boolean{
    return this.password.get(controlName).valid;
  }
  validationError(controlName: string): boolean {
    return this.password.get(controlName).invalid && (this.password.get(controlName).dirty || (this.password.get(controlName).touched))
  }
  controlError(controlName: string, errorName: string): boolean {
    return this.password.get(controlName).hasError(errorName) && this.validationError(controlName)
  }

  Register(){
    this.route.navigate(['login'])
  }

}
