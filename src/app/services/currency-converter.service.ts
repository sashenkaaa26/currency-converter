import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IData } from '../models/data';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  constructor(private http: HttpClient) {}

  // apiUrl = 'https://api.monobank.ua/bank/currency';
  apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  getCurrency(): Observable<IData[]> {
    return this.http.get<IData[]>(this.apiUrl);
  }
}
