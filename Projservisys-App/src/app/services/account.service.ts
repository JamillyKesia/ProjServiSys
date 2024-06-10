import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';
import { User } from '../models/identity/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User | null>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  baseURL = environment.apiURL + 'api/Account/';
  
  constructor(private http: HttpClient) { 
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSource.next(JSON.parse(storedUser));
    } else {
      this.currentUserSource.next(null);
    }
  }

  public login(model: any): Observable<User> {
    return this.http.post<User>(this.baseURL + 'login', model).pipe(
      take(1),
      map((response: User) => {
        if (response) {
          this.setCurrentUser(response);
        }
        return response;  // Certifique-se de retornar o usuário aqui
      })
    );
  }

  public register(model: any): Observable<User> {
    return this.http.post<User>(this.baseURL + 'RegisterUser', model).pipe(
      take(1),
      map((response: User) => {
        if (response) {
          this.setCurrentUser(response);
        }
        return response;  // Certifique-se de retornar o usuário aqui
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}