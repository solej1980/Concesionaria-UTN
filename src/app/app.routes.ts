import { Routes } from '@angular/router';
import { LogIn } from './pages/log-in/log-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Catalogo } from './pages/auto/catalogo/catalogo';
import { Detalle } from './pages/auto/detalle/detalle';
import { Financiacion } from './pages/auto/financiacion/financiacion';

export const routes: Routes = [
    {path:"",redirectTo: 'login',pathMatch:'full'},
    {path:"login",component: LogIn},
    {path:"signUp",component:SignUp},
    {path:"catalogo", component:Catalogo},
    {path:"detalle/:id", component: Detalle},
    {path: 'auto/financiacion/:id/:precio', component: Financiacion}

];
