import { Routes } from '@angular/router';
import { LogIn } from './pages/log-in/log-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Catalogo } from './pages/auto/catalogo/catalogo';
import { Detalle } from './pages/auto/detalle/detalle';

export const routes: Routes = [
    {path:"",redirectTo: 'login',pathMatch:'full'},
    {path:"login",component: LogIn},
    {path:"signUp",component:SignUp},
    {path:"catalogo", component:Catalogo},
    {path:"detalle/:id", component: Detalle}
];
