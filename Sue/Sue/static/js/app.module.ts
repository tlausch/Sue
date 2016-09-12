import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {Http, BaseRequestOptions} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';


import {
    AccountsComponent, AccountEditComponent, AppComponent, ExchangesComponent,
    ExchangeEditComponent
}   from './app.component';
import { DashboardComponent } from './dashboard.component';
import { AccountService, ExchangeService } from './app.services';
import { routing } from './app.routing';

import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpModule, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy }    from '@angular/http';


@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions{
    headers:Headers = new Headers({
        'Content-Type': 'application/json'
    });
}
@NgModule({
    imports:  [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing],
    declarations: [
        AppComponent,
        AccountsComponent,
        AccountEditComponent,
        ExchangesComponent,
        ExchangeEditComponent,
        DashboardComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        AccountService,
        ExchangeService,
        CookieService,
        {
            provide: RequestOptions,
            useClass: DefaultRequestOptions
        },
        {
            provide: XSRFStrategy,
            useFactory: (cookieService) => {
                return new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
            },
            deps: [CookieService]
        }
    ]
})
export class AppModule {
    constructor(){
    }
}
