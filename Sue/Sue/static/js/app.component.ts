import { Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Component } from './app.helper';
import {Account, Exchange} from './app.entities';
import {AccountService, ExchangeService} from './app.services';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: 'app-main.html'
})
export class AppComponent{

}

@Component({
    // module id is necessary to allow for relative uri. rubbish
    moduleId: module.id,
    selector: 'my-accounts',
    templateUrl: 'account-list.html',
})
export class AccountsComponent implements OnInit{
    title: string = 'List of Accounts';

    constructor(private accountService: AccountService) {
    }


    accounts : Account[];
    selectedAccount: Account;
    errorMessage: string;

    ngOnInit(): void {
        this.accountService.get().subscribe(
                    accounts => this.accounts = accounts,
                    error =>  this.errorMessage = <any>error);
    }
    onSelect(account: Account): void{
        this.selectedAccount = account;
    }
}


@Component({
    // module id is necessary to allow for relative uri. rubbish
    moduleId: module.id,
    selector: 'my-exchanges',
    templateUrl: 'exchange-list.html',
})
export class ExchangesComponent implements OnInit{
    title: string = 'List of Exchanges';

    constructor(private exchangeService: ExchangeService,
    private accountService: AccountService) {
    }

    accounts: Account[];
    exchanges : Exchange[];
    selectedExchange: Exchange;
    errorMessage: string;

    ngOnInit(): void {
        this.exchangeService.get().subscribe(
                    exchanges => this.exchanges = exchanges,
                    error =>  this.errorMessage = <any>error);
        this.accountService.get().subscribe(
            accounts => this.accounts = accounts,
            error => this.errorMessage = <any>error);
    }
    select(exchange: Exchange): void{
        this.selectedExchange = exchange;
    }
    create(): void{
        this.selectedExchange = new Exchange();
        this.selectedExchange.what = "Carl-Zeiss Stipendium";
        this.selectedExchange.account = "http://127.0.0.1:8000/api/account/1/";
        this.selectedExchange.category = "Salary;";
        this.selectedExchange.when = "2016-09-15";
        this.selectedExchange.where = "Carl-Zeiss";
        this.selectedExchange.credit = 1500;
        this.selectedExchange.who = "http://127.0.0.1:8000/api/users/1/";
    }
}

@Component({
    // module id is necessary to allow for relative uri. rubbish
    moduleId: module.id,
    selector: 'my-exchange',
    templateUrl: 'exchange-edit.html',
})
export class ExchangeEditComponent implements OnInit{
    constructor(private exchangeService: ExchangeService,
    private accountService: AccountService) {
    }

    public account;
    private accounts: Account[];
    private errorMessage: string;
    ngOnInit(): void {
        this.accountService.get().subscribe(
            accounts => this.accounts = accounts,
            error => this.errorMessage = <any>error);

        this.accountService.$get(this.exchange.account).then(
            (result) => this.account = result,
            (ex) => this.errorMessage = <any>ex
        );
    }

    @Input()
    exchange: Exchange;


    @Output()
    onClose = new EventEmitter();

    confirm(): void{
        this.exchange.confirmed = !this.exchange.confirmed;
    }
    save(exchange: Exchange): void {
        this.exchangeService.createOrUpdate(exchange, exchange.pk).then(
            (resp) => {console.log('saved', resp);}
        ).catch((ex) => {console.log('exception', ex);});
    }
    close(): void{
        this.onClose.emit()
        this.exchange = null;
    }
    delete(): void{
        this.exchangeService.delete(this.exchange, this.exchange.pk);
    }
}

@Component({
    moduleId: module.id,
    selector: 'account-detail',
    templateUrl: 'account-edit.html'
})
export class AccountEditComponent {
    @Input()
    account: Account;

    constructor(private accountService: AccountService) {

    }
    save(account): void {
        // this.accountService.put(account);
    }
}