import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from 'src/app/models/registerModel';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };
  
  //Register
  register(body: Register){
    return this.http.post<Register>(`${apiUrl}/Users`, body);
  }







}
