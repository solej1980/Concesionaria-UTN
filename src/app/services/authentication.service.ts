import { Injectable } from "@angular/core";
import { Usuario, Cliente, Admin } from "../interfaces/usuario.interface";
import { Observable } from "rxjs";
import { UsuarioService } from "./usuario.service";
import { map } from 'rxjs/operators';

type ResultadoLogin = 
    | {resultado: 'exitoso', usuario: Cliente | Admin}
    | {resultado: 'contraseña_incorrecta'}
    | {resultado: 'usuario_inexistente'};

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{

    constructor(private usuarioService: UsuarioService){}

    login(email: string, contraseña: string): Observable<ResultadoLogin>{
        return this.usuarioService.getUsuarios().pipe(
            map(usuarios => {
                const usuarioEncontrado = usuarios.find(u => u.email === email);
                if(!usuarioEncontrado){
                    return {resultado: 'usuario_inexistente'} as ResultadoLogin;
                }
                if(usuarioEncontrado.contraseña != contraseña){
                    return {resultado: 'contraseña_incorrecta'} as ResultadoLogin;
                }
                localStorage.setItem('usuarioEnLinea', JSON.stringify(usuarioEncontrado));
                return {resultado: 'exitoso', usuario: usuarioEncontrado} as ResultadoLogin;
            })
        );
    }

    logout(): void{
        localStorage.removeItem('usuarioEnLinea');
    }

    getUsuarioEnLinea(): Cliente | Admin | null{
        const usuarioEnLinea = localStorage.getItem('usuarioEnLinea');
        return usuarioEnLinea ? JSON.parse(usuarioEnLinea) : null; 
    }

    esAdmin(): boolean{
        return this.getUsuarioEnLinea()?.tipo === 'admin';
    }

    esCliente(): boolean{
        return this.getUsuarioEnLinea()?.tipo === 'cliente';
    }

    estaLogueado(): boolean{
        if(this.getUsuarioEnLinea() === null){
            return false;
        }
        return true;
    }
}