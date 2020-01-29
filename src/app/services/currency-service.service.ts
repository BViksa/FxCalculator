import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  url: string = 'https://api.exchangeratesapi.io/latest';

  constructor(private http: HttpClient) { }

  getRatesDefault(): Observable<any> {
    return this.http.get(`${this.url}`)
      .pipe(
        map(results => {
          return Object.entries(results['rates'])
            .map(([name, value]) => ({ name, value }));
        }));
  }

  getRates(base: string): Observable<any> {
    return this.http.get(`${this.url}?base=${base}`)
      .pipe(
        map(results => {
          return Object.entries(results['rates'])
            .map(([name, value]) => ({ name, value }));
        }));
  }
}
