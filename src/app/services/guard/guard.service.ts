import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() { }
  

  public isLoggedIn(){
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }
}
