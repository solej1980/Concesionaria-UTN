import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Marca } from '../interfaces/marca.interface';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private readonly url = 'http://localhost:3000/marcas';
  private readonly http = inject(HttpClient);
  
  getMarcas(){
    return this.http.get<Marca[]>(this.url);
  }

  getMarcaById(id: string | number){
    return this.http.get<Marca>(`${this.url}/{id}`);
  }

  addMarca(marca: Marca){
    return this.http.post<Marca>(this.url, marca);
  }

  updateMarca(marca: Marca, id: string | number){
    return this.http.put<Marca>(`${this.url}/${id}`, marca);
  }

  deleteMarca(id: string | number){
    return this.http.delete(`${this.url}/{id}`);
  }
}
