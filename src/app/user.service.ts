import { Injectable } from '@angular/core';
import { User } from './user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersURL = 'https://serene-gorge-89634.herokuapp.com/api/fetchUsers';
  private deleteURL = 'https://serene-gorge-89634.herokuapp.com/api/delete';
  private updateURL = 'https://serene-gorge-89634.herokuapp.com/api/update';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersURL)
  }

  updateUser (user: any): Observable<any> {
    return this.http.post(this.updateURL, user, this.httpOptions).pipe(
      tap(_ => this.log('User Saved')),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser (username: string): Observable<any> {
    let body = {
      "username": username
    }
    return this.http.post(this.deleteURL, body, this.httpOptions).pipe(
      tap(_ => this.log('Deleted')),
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  log(error: any){
    console.log(error)
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
