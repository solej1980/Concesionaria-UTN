export interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  contraseña: string;
  telefono: string;
  tipo: 'cliente' | 'admin';
}

export interface Cliente extends Usuario {
  tipo: 'cliente';
  favoritos: number[];
}

export interface Admin extends Usuario {
  tipo: 'admin';
  idConcesionaria: number;
}