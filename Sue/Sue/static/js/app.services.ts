import { Injectable }   from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './app.rxjs-operators';

import {Account, Exchange}        from './app.entities';

const ACCOUNTS_URL: string = '/api/account';
const EXCHANGE_URL: string = '/api/exchange';

export class ApiService<T> {

  constructor(
      protected http: Http,
      private url: string) { }

    public get(): Observable<T[]> {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError)
    }
    private extractData(res: Response){
        let body = res.json();
        return body.results;
    }
    private handleError(error: any){
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}

@Injectable()
export class AccountService extends ApiService<Account> {

  constructor(protected http: Http) {
      super(http, ACCOUNTS_URL);
  }
}

@Injectable()
export class ExchangeService extends ApiService<Exchange> {

  constructor(protected http: Http) {
      super(http, EXCHANGE_URL);
  }
}