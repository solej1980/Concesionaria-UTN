import { Auto } from "./auto.interface";
import { Concesionaria } from "./concesionaria.interface";
import { Marca } from "./marca.interface";
import { Modelo } from "./modelo.interface";

export interface AutoCompleto {
    auto: Auto;
    imagen: string & any [] | string[];
    marca: Marca;
    modelo: Modelo;
    anio: string | number;
    concesionaria: Concesionaria;
}
