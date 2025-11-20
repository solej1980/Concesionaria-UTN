import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';
import { BusquedaService } from '../../services/busqueda.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    protected auth: AuthenticationService,
    protected busquedaService: BusquedaService
    ){}

  buscarAuto(event: Event): void{
    const input = event.target as HTMLInputElement;
    this.busquedaService.setBusqueda(input.value);
  }
}
