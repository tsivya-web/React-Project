import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interface/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
url="https://localhost:7261/api/User"
currentUser:User={ id :0,
fName:"",
lName:"",
 email:"" ,
 password:"" }
connected:boolean=false
 
  constructor(private Httpc:HttpClient) { 
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    if (typeof window !== 'undefined') {
      const isConnected = localStorage.getItem('connected') === 'true';
      this.connected = isConnected;
      
      if (isConnected) {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
          this.currentUser = JSON.parse(userData);
        }
      }
    }
  }

arr:Array<User>=new Array<User>();
   get():Observable<User[]>{
    return this.Httpc.get<User[]>(this.url);
   }
   add( user:User):Observable<User>{
  
   return  this.Httpc.post<User>(this.url,user);

   }


getUser(email: string, password: string): Observable<User> {
 
  const fullUrl = `${this.url}/${email}/${password}`;

  return this.Httpc.get<User>(fullUrl);
}


}
