import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AccountsComponent, ExchangesComponent}      from './app.component';
import { DashboardComponent } from './dashboard.component';

const appRoutes: Routes = [
    {
        path: 'accounts',
        component: AccountsComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'exchanges',
        component: ExchangesComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);