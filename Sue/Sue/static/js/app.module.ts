import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
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
    providers: [AccountService, ExchangeService]
})
export class AppModule {
    constructor(){
    }
}
