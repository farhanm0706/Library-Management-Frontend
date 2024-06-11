import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api_endpoint } from '../config/config';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private authservice:AuthService) { }
  token =this.authservice.getToken();

 

  addBookByAdmin(bookData:any):Observable<any>{
   const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    return this.http.post(`${Api_endpoint.bookUrl}/addbook`, bookData, {headers });
  }


  getBooks():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    console.log(headers);
    return this.http.get(`${Api_endpoint.bookUrl}/booklist`,{headers})
  }

  updateById(id:any,bookData:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    console.log(headers);
    
    return this.http.put(`${Api_endpoint.bookUrl}/update?id=${id}`,bookData,{headers})
  }


  getBookData(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    console.log(headers);
    
    return this.http.get(`${Api_endpoint.bookUrl}/bookData?id=${id}`,{headers})
  }

  deleteBook(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    console.log(id,headers);
    return this.http.delete(`${Api_endpoint.bookUrl}/deletebook?id=${id}`,{headers});

  }


  getUsers():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    return this.http.get(`${Api_endpoint.usersUrl}/userslist`,{headers});

  }

  getTransactions():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    return this.http.get(`${Api_endpoint.usersUrl}/transactions`,{headers});

  }
}

