import { Injectable }   from '@angular/core';
import { Response, Http, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './app.rxjs-operators';

import {Account, Exchange, User}        from './app.entities';
import { isNullOrUndefined }      from "./app.helper";

const ACCOUNTS_URL: string = '/api/account/';
const EXCHANGE_URL: string = '/api/exchange/';

export class ApiService<T> {

  constructor(
      protected http: Http,
      private url: string) { }

    public get(): Observable<T[]> {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError)
    }
    public $get(url:string): Promise<any>{
        if (isNullOrUndefined(url))
            throw Error("Missing url");

        return this.http.get(url).toPromise<any>();
    }
    public $url(obj:any): string {
        return this.url + obj.pk + '/';
    }
    public query(id: number):  Promise<T> {
        if(isNullOrUndefined(id))
            throw Error("Missing id");

        let url = this.url + id.toString() + '/';

        return this.http.get(url).toPromise<T>();
    }
    public createOrUpdate(obj: T, id?: number): Promise<T> {
        let body = JSON.stringify(obj);

        if(isNullOrUndefined(id)) // create
            return this.http.post(this.url, body).toPromise<T>();

        // update
        let url = this.url + id.toString() + '/';
        return this.http.put(url, body).toPromise<T>();

    }
    public delete(obj: T, id: number): Promise<T> {
        let url = this.url + id.toString() + '/';
        return this.http.delete(url, obj).toPromise<T>();
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
