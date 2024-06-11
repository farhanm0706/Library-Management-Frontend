import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api_endpoint } from '../config/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient,private router:Router) { }

//register service call
  onRegisterService(newUser: any):Observable<any>{
    console.log(newUser,"service call");
    return this.http.post<any>(`${Api_endpoint.usersUrl}/register`,newUser);
  }

  //Login service call
  onLogin(user:any):Observable<any>{
    console.log("service call",user);
    return this.http.post<any>(`${Api_endpoint.usersUrl}/login`,user);
  }

  //token storing locally for future access
  saveToken(token:string){
    localStorage.setItem('token',token)
  }
  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  updateUser(updatedUser:any):Observable<any>{
    const token =this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(`${Api_endpoint.usersUrl}/updateUser`,updatedUser,{headers});
  }
}
