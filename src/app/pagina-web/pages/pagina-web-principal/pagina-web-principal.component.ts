import { Component, OnInit } from '@angular/core';
import {faTasks, faChartPie, faMicrochip} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faInstagram, faLinkedinIn, faYoutube} from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pagina-web-principal',
  templateUrl: './pagina-web-principal.component.html',
  styleUrls: ['./pagina-web-principal.component.css']
})
export class PaginaWebPrincipalComponent implements OnInit {

  Tasks = faTasks;
  CharPie= faChartPie;
  Microchip=faMicrochip;
  Facebook=faFacebook;
  Instagram=faInstagram;
  Linkedin=faLinkedinIn;
  YouTube=faYoutube;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateRegister(){
    this.router.navigateByUrl('auth/regsiter')
  }

}
