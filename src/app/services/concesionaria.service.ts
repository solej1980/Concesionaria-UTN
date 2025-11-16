import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Concesionaria } from '../interfaces/concesionaria.interface';

@Injectable({
  providedIn: 'root'
})
export class ConcesionariaService {

  private readonly url = 'http://localhost:3000/concesionarias';
  private readonly http = inject(HttpClient);

  getConcesionarias(){
    return this.http.get<Concesionaria[]>(this.url);
  }

  getConcesionariaById(id: string | number){
    return this.http.get<Concesionaria>(`${this.url}/${id}`);
  }

  addConcesionaria(concesionaria: Concesionaria){
    return this.http.post<Concesionaria>(this.url, concesionaria);
  }

  updateConcesionaria(concesionaria: Concesionaria, id: string | number){
    return this.http.put<Concesionaria>(`${this.url}/${id}`, concesionaria);
  }

  deleteConcesionaria(id: string | number){
    return this.http.delete(`${this.url}/${id}`);
  }

  
}
