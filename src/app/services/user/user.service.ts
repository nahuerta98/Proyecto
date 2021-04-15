import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/usersModel';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  httpOptions = { 
    headers: new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).accessToken}`
    })
  }
  //Get All Users
  getUsers(PageNumber:number){
    return this.http.get(`${apiUrl}/Users?PageNumber=${PageNumber}`, this.httpOptions);
  }

  //Get 
  getUser(id: string){
    return this.http.get(`${apiUrl}/Users/${id}`, this.httpOptions);
  }
  //Update
  updateUser(id: string, body: User){
    return this.http.put(`${apiUrl}/Users/${id}`, body, this.httpOptions);
  }
  //Delete
  deleteUser(id: string){
    return this.http.delete(`${apiUrl}/Users/${id}`, this.httpOptions);
  }

}
