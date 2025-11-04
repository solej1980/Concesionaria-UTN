import { Injectable } from "@angular/core";
import { Auto } from "../interfaces/auto.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AutoService{
    private url = 'http://localhost:3000/autos';

    constructor(private http: HttpClient){}

    getAutos(): Observable<Auto[]>{
        return this.http.get<Auto[]>(this.url);
    }

    getAutoById(id: number): Observable<Auto | undefined>{
        return this.http.get<Auto | undefined>(`${this.url}/${id}`);
    }

    agregarAuto(autoNuevo: Auto): Observable<Auto | undefined>{
        return this.http.post<Auto>(this.url, autoNuevo);
    }

    modificarAuto(autoNuevo: Auto): Observable<Auto | undefined>{
        return this.http.put<Auto>(`${this.url}/${autoNuevo.idAuto}`, autoNuevo);
    }

    eliminarAuto(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}