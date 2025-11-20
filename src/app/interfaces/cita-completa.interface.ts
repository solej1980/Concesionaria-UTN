import { AutoCompleto } from "./auto-completo.interface";
import { Cita } from "./cita.interface";
import { Concesionaria } from "./concesionaria.interface";
import { Cliente } from "./usuario.interface";

export interface CitaCompleta {
    cita: Cita,
    auto: AutoCompleto,
    cliente: Cliente
}
