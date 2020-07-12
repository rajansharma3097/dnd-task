import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

const headerDict = {
  'Content-Type': 'application/json'
}

const requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(headerDict), 
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refresfNeeded$() {
    return this._refreshNeeded$;
  }

  getItems() {
    return this.http.get<any>(`${this.baseUrl}/api/items`);
  }

  saveItem(payLoad) {
    return this.http
               .post<any>(`${this.baseUrl}/api/item`, payLoad, requestOptions)
                .pipe(
                  tap(() => {
                    this._refreshNeeded$.next();
                  })
                );
  } 
  
  addItemToListTwo(payLoad) {
    return this.http
               .post<any>(`${this.baseUrl}/api/item2`, payLoad, requestOptions);
  } 

  removeItem(id) {
    return this.http
               .delete(`${this.baseUrl}/api/item/${id}`)
               .pipe(
                 tap(() => {
                   this._refreshNeeded$.next();
                 })
               );

  } 

}
