import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoService } from '../../../services/auto.service';
import { ConcesionariaService } from '../../../services/concesionaria.service';
import { ModeloService } from '../../../services/modelo.service';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly autoService = inject(AutoService);
  private readonly modeloService = inject(ModeloService);
  private readonly concesionariaService = inject(ConcesionariaService);
  private readonly marcaService = inject(MarcaService);

  private readonly id = Number(this.route.snapshot.paramMap.get('id'));

  protected readonly auto = toSignal(this.autoService.getAutoById(this.id));
  protected readonly modelos = toSignal(this.modeloService.getModelos());
  protected readonly concesionarias = toSignal(this.concesionariaService.getConcesionarias());
  protected readonly marcas = toSignal(this.marcaService.getMarcas());

  // Computamos toda la info del auto + modelo + concesionaria
  protected readonly detalle = computed(() => {
  const auto = this.auto();
  const modelos = this.modelos();
  const concesionarias = this.concesionarias();
  const marcas = this.marcas();

  if (!auto || !modelos || !concesionarias || !marcas) return undefined;

  const modelo = modelos.find(m => Number(m.idModelo) === Number(auto.idModelo));
  const concesionaria = concesionarias.find(c => Number(c.idConcesionaria) === Number(auto.idConcesionaria));
  const marca = marcas.find(mc => Number(mc.idMarca) === Number(modelo?.idMarca));

  return {
    ...auto,
    modelo: modelo?.nombre ?? 'Desconocido',
    marca: marca?.nombre ?? 'N/D',   // ⭐ CORRECTO
    anio: modelo?.año ?? 'N/D',
    hp: modelo?.hp ?? 'N/D',
    transmision: modelo?.transmision ?? 'N/D',
    combustible: modelo?.combustible ?? 'N/D',
    concesionaria: concesionaria?.nombre ?? 'Desconocida',
    direccion: concesionaria?.direccion ?? 'N/D',
    telefono: concesionaria?.telefono ?? 'N/D',
    imagen: auto.imagen ?? []
  };
});


  currentIndex = 0;

  nextSlide() {
    const total = this.detalle()?.imagen?.length || 0;
    this.currentIndex = (this.currentIndex + 1) % total;
  }

  prevSlide() {
    const total = this.detalle()?.imagen?.length || 0;
    this.currentIndex = (this.currentIndex - 1 + total) % total;
  }

  volver() {
    this.router.navigateByUrl('/catalogo');
  }

}
