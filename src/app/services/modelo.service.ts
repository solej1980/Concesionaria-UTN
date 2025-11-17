import { Update } from './../../../node_modules/vite/types/hmrPayload.d';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Modelo } from '../interfaces/modelo.interface';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/modelos';

  getModelos(){
    return this.http.get<Modelo[]>(this.url);
  }

  getModeloById(id: string | number){
    return this.http.get<Modelo>(`${this.url}/${id}`);
  }

  addModelo(modelo: Modelo){
    return this.http.post<Modelo>(this.url, modelo);
  }

  updateModelo(modelo: Modelo, id: string | number){
    return this.http.put<Modelo>(`${this.url}/${id}`, modelo);
  }

  deleteModelo(id: string | number){
    return this.http.delete(`${this.url}/${id}`);
  }



}
