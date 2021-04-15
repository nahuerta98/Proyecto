import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    }),
  };

  public isLoggedIn(): boolean {
    if(localStorage.getItem("currentUser")) {
      return true;
    }
    return false;
  }

  login(username: string, password: string) {
    var body = `username=${username}&password=${password}`;
    return this.http.post<any>(`${apiUrl}/Token`, body, this.httpOptions).pipe(
      map((user) => {
        if(user && user.accessToken) {
          user.activeSession = true;
          localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
          user.activeSession = false;
        }

        return user;
      })
    )
  }
}

