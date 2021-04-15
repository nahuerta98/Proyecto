import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: Router, private registerService: RegisterService) { }
 //Form Declaration
 signUp : FormGroup;

 ngOnInit(): void {
    //Validations
 this.signUp = this.fb.group({
   firstName:['', [Validators.required, Validators.maxLength(50)]],
   lastName:['', [Validators.required, Validators.maxLength(50)]],
   email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
   birthDate:['', [Validators.required]],
   salt:['']
 });
 }

 //Validations Methods
 validationError(controlName: string): boolean {
   return this.signUp.get(controlName).invalid && (this.signUp.get(controlName).dirty || (this.signUp.get(controlName).touched))
 }
 controlError(controlName: string, errorName: string): boolean {
   return this.signUp.get(controlName).hasError(errorName) && this.validationError(controlName)
 }
 validation(controlName: string): boolean{
   return this.signUp.get(controlName).valid
 }

 Continue(){
   let body = this.signUp.getRawValue();
   this.registerService.register(body)
   .subscribe((res) => {
    //this.route.navigate(['newPassword'])
    this.route.navigate(['login']);
   }, (err) =>{
     console.log(err);
   });
 }
}
