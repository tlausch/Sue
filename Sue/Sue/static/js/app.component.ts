import { Input, OnInit } from '@angular/core';
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

    constructor(private exchangeService: ExchangeService) {
    }


    exchanges : Exchange[];
    selectedExchange: Exchange;
    errorMessage: string;

    ngOnInit(): void {
        this.exchangeService.get().subscribe(
                    exchanges => this.exchanges = exchanges,
                    error =>  this.errorMessage = <any>error);
    }
    onSelect(exchange: Exchange): void{
        this.selectedExchange = exchange;
    }
    onAdd(): void{
        this.selectedExchange = new Exchange();
    }
}

@Component({
    // module id is necessary to allow for relative uri. rubbish
    moduleId: module.id,
    selector: 'my-exchange',
    templateUrl: 'exchange-edit.html',
})
export class ExchangeEditComponent{
    constructor(private exchangeService: ExchangeService) {
    }

    @Input()
    exchange: Exchange;
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
        this.accountService.put(account);
    }
}