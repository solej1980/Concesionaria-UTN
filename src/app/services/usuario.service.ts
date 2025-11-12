import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Admin, Cliente } from "../interfaces/usuario.interface";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService{
    private url = 'http://localhost:3000/usuarios';
    
    constructor(private http: HttpClient){}

    getUsuarios() : Observable<(Cliente | Admin)[]>{
        return this.http.get<Cliente[] | Admin[]>(this.url);
    }

    getUsuarioById(id: number) : Observable<Cliente | Admin>{
        return this.http.get<Cliente | Admin>(`${this.url}/${id}`);
    }

    agregarUsuario(usuarioNuevo: Cliente | Admin): Observable<Cliente | Admin>{
        return this.http.post<Cliente | Admin>(this.url, usuarioNuevo);
    }

    actualizarUsuario(usuarioNuevo: Cliente | Admin): Observable<Cliente | Admin>{
        return this.http.put<Cliente | Admin>(`${this.url}/${usuarioNuevo.idUsuario}`, usuarioNuevo);
    }

    eliminarUsuario(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}