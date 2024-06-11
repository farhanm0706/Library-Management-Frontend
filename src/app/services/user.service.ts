import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Api_endpoint } from '../config/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient,private router:Router,private authService:AuthService) { }


  token =this.authService.getToken();
  
  
  borrowBookService(id:string):Observable<any>{
    const favKey:boolean=false;
    console.log(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    
    console.log(headers);
    return this.http.get(`${Api_endpoint.usersUrl}/borrow`,{
      headers,
      params: { id, favKey }
    });
  }

  returnBook(id:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`${this.token}`
    });
    return this.http.get(`${Api_endpoint.usersUrl}/return?id=${id}`,{headers});
  }


  favBookService(id:string,favKey:boolean):Observable<any>{
    console.log(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    console.log(headers);
    return this.http.get(`${Api_endpoint.usersUrl}/borrow`,{
      headers,
      params: { id, favKey }
    });
  }
  removefavBookService(id:string):Observable<any>{
    console.log(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    console.log(headers);
    return this.http.get(`${Api_endpoint.usersUrl}/removefav?id=${id}`,{headers});
  }

  getBorrowBookList():Observable<any>{
    console.log(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    console.log(headers);
    return this.http.get(`${Api_endpoint.usersUrl}/borrowed-books`,{headers});
  }

  getFavoriteBookList():Observable<any>{
    console.log(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    console.log(headers);
    return this.http.get(`${Api_endpoint.usersUrl}/favorite-books`,{headers});
  }
}


