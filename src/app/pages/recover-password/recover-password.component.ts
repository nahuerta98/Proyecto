import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  // Form Declaration
  recoverPass: FormGroup;

  constructor( private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.recoverPass = this.fb.group({
      email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
    });
  }

  recover(){
    this.route.navigate(['login']);
  }

}
