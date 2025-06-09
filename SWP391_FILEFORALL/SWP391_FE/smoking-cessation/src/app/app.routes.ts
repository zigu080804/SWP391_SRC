import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Homepage } from './homepage/homepage';

export const routes: Routes = [
    { path: 'login', component: Login},
    { path: 'signup', component: Signup},
    { path: 'homepage', component: Homepage },
    { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }