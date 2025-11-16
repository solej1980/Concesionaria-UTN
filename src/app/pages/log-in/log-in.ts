import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {
loginData = {
  email:'',
  password:''
}

constructor(private auth:AuthenticationService, private router: Router){}

login(){
  if(this.auth.login(this.loginData.email,this.loginData.password)){
    alert("Iniciando Sesion");
    this.router.navigate([]);//agregar ruta del inicio de la pagina a la ruta.
  }
}

}
