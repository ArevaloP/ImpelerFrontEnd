import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  FlagSesion: boolean =  false;

  get usuario(){
    return this.authService.usuario
  }

  constructor(private router: Router,
              private authService: AuthService,
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.FlagSesion = true;
    }else{
      this.FlagSesion = false;
    }

  }

  LogOut(){
    this.router.navigateByUrl('/auth');
    this.authService.logOut();

  }

}
