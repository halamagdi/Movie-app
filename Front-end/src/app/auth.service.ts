import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {

    if (localStorage.getItem('userToken') != null) {
      this.saveUserData()
    }
  }

  userData = new BehaviorSubject(null);

  saveUserData() {
    let userDecodedData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(userDecodedData));
    console.log(this.userData);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['login']);
  }

  register(formData: object): Observable<any> {
    return this._HttpClient.post(`http://localhost:5000/signUp`, formData);
  }
  login(formData: object): Observable<any> {
    return this._HttpClient.post(`http://localhost:5000/signIn`, formData);
  }
}
