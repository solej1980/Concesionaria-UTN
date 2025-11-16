import { Component, computed, inject } from '@angular/core';
import { AutoService } from '../../../services/auto.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConcesionariaService } from '../../../services/concesionaria.service';
import { MarcaService } from '../../../services/marca.service';
import { ModeloService } from '../../../services/modelo.service';

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {

   private readonly autoService = inject(AutoService);
  private readonly modeloService = inject(ModeloService);
  private readonly marcaService = inject(MarcaService);
  private readonly concesionariaService = inject(ConcesionariaService);
  private readonly router = inject(Router);

  // ✅ Signals
  protected readonly autos = toSignal(this.autoService.getAutos());
  protected readonly modelos = toSignal(this.modeloService.getModelos());
  protected readonly marcas = toSignal(this.marcaService.getMarcas());
  protected readonly concesionarias = toSignal(this.concesionariaService.getConcesionarias());

  protected readonly isLoading = computed(
    () =>
      this.autos() === undefined ||
      this.modelos() === undefined ||
      this.marcas() === undefined ||
      this.concesionarias() === undefined
  );

  // ✅ Computed para combinar datos correctamente
  protected readonly autosConNombres = computed(() => {
  const autos = this.autos() ?? [];
  const modelos = this.modelos() ?? [];
  const concesionarias = this.concesionarias() ?? [];
  const marcas = this.marcas() ?? [];


  return autos.map(auto => {

    const modelo = modelos.find(m => Number(m.idModelo) === Number(auto.idModelo));
    const marca = modelo
      ? marcas.find(mar => Number(mar.idMarca) === Number(modelo.idMarca))
      : null;
    const concesionaria = concesionarias.find(
      c => Number(c.idConcesionaria) === Number(auto.idConcesionaria)
    );

    const imagenes = Array.isArray(auto.imagen) ? auto.imagen : [auto.imagen];

    const nombreCompleto = modelo && marca
      ? `${marca.nombre} ${modelo.nombre}`
      : modelo?.nombre ?? 'Desconocido';

    return {
      ...auto,
      imagen: imagenes,
      nombreModelo: nombreCompleto,
      anio: modelo?.año ?? 'N/D',
      nombreConcesionaria: concesionaria?.nombre ?? 'Desconocida',
    };
  });
});


  // ✅ Navegación al detalle
  navigateToDetails(id: string | number) {
    this.router.navigate(['/detalle', id]);
  }
}
