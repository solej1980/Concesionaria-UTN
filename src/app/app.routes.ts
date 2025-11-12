import { Routes } from '@angular/router';
import { LogIn } from './pages/log-in/log-in';
import { SignUp } from './pages/sign-up/sign-up';

export const routes: Routes = [
    {path:"",redirectTo: 'login',pathMatch:'full'},
    {path:"login",component: LogIn},
    {path:"signUp",component:SignUp}
];
