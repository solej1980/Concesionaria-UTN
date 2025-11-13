import { Injectable, signal, computed } from "@angular/core";
import { Usuario, Cliente, Admin } from "../interfaces/usuario.interface";
import { Observable, of } from "rxjs";
import { UsuarioService } from "./usuario.service";
import { catchError, map } from 'rxjs/operators';

type ResultadoLogin = 
    | {resultado: 'exitoso', usuario: Cliente | Admin}
    | {resultado: 'contraseña_incorrecta'}
    | {resultado: 'usuario_inexistente'}
    | {resultado: 'mail_existente'};

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{
    private readonly usuario = signal<Cliente | Admin | null>(null);

    private readonly esAdmin = computed(() => this.usuario()?.tipo === 'admin');
    private readonly esCliente = computed(() => this.usuario()?.tipo === 'cliente');
    private readonly estaLogueado = computed(() => this.usuario() !== null);

    constructor(private usuarioService: UsuarioService){}

    login(email: string, contraseña: string): Observable<ResultadoLogin>{
        return this.usuarioService.getUsuarios().pipe(
            map(usuarios => {
                const usuarioEncontrado = usuarios.find(u => u.email === email);
                if(!usuarioEncontrado){
                    return {resultado: 'usuario_inexistente'} as ResultadoLogin;
                }
                if(usuarioEncontrado.contrasena != contraseña){
                    return {resultado: 'contraseña_incorrecta'} as ResultadoLogin;
                }
                this.usuario.set(usuarioEncontrado);
                return {resultado: 'exitoso', usuario: usuarioEncontrado} as ResultadoLogin;
            })
        );
    }
    signUp(newUser: Usuario ): Observable<ResultadoLogin>{
        const nuevoId = Math.random() * 100000;
        const clienteAGuardar: Cliente = {
        ...newUser,
        //idUsuario: nuevoId,
        tipo: 'cliente',
        favoritos: []
      };

        return this.usuarioService.agregarUsuario(clienteAGuardar).pipe(
            map(currentUser =>{
                this.usuario.set(currentUser);
                return {resultado: 'exitoso',usuario:currentUser} as ResultadoLogin;
            }),
            //catchError(()=> of ({ resultado: 'error al registrar' } as unknown as ResultadoLogin))
        );
    }

    logout(): void{
        this.usuario.set(null);
    }

    getUsuarioEnLinea(): Cliente | Admin | null{
        return this.usuario();
    }
}
