import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http'; 

//add token to header


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

//-------------------------------------------------------------
  //login
  submitLogin(username, password){
    return this.http.post("http://127.0.0.1:8000/api-auth/", {
      "username": username,
      "password": password
    });
  }

  setToken(token){
    localStorage.setItem("token",token[0].token);
  }
  removeToken(){
    localStorage.removeItem("token");
  }

  getToken(){
    return localStorage.getItem("token");
  }

  isLoggedIn(){
    if(this.getToken() === null){
      return false;
    }
    return true;
  }

}
