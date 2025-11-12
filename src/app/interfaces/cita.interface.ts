export interface Cita {
  idCita: number;
  fecha: string;
  hora: string;
  motivo: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  idUsuario: number;
  idAuto: number;
  idConcesionaria: number;
}