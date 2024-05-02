import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { Materiel } from '../../models/Materiel.type';
import { log } from 'console';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-materiel',
  standalone: true,
  imports: [HttpClientModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink, RouterModule, DatePipe],
  templateUrl: './gestion-materiel.component.html',
  styleUrl: './gestion-materiel.component.scss'
})
export class GestionMaterielComponent {
  listeMateriel: Materiel[] = [];

  httpClient = inject(HttpClient)

  ngOnInit(){
    this.refresh();
  }

  refresh(){
    this.httpClient
      .get<Materiel[]>("http://localhost:8080/materiels")
      .subscribe(listeMateriel => {this.listeMateriel = listeMateriel;
      })
  }

  supprimeMateriel(idMateriel? : number) {
  if (idMateriel){
      this.httpClient.delete("http://localhost:8080/materiel/" + idMateriel)
      .subscribe(retour => this.refresh());
    }
  }   
}