import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { Materiel } from '../../models/Materiel.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edition-materiel',
  standalone: true,
  imports: [HttpClientModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edition-materiel.component.html',
  styleUrl: './edition-materiel.component.scss'
})
export class EditionMaterielComponent {

  httpClient = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute)
  formbuilder = inject(FormBuilder);

  idMaterielModifie? : number;

  formulaire = this.formbuilder.group(
    {
      nom: ["",[Validators.required]],
      description: ["", [Validators.required]],
      categorie: ["", [Validators.required]]
    }
  );

  ngOnInit(){
    this.route.params.subscribe((parametres)=>{

      const id = parametres['id'];

      if (!isNaN(id)){

        this.httpClient
          .get("http://localhost:8080/materiel/" + id)
          .subscribe((materiel)=>{
            this.idMaterielModifie = id;

            this.formulaire = this.formbuilder.group(
              {
                nom: ["",[Validators.required]],
                description: ["", [Validators.required]],
                categorie: ["", [Validators.required]]
              }
            );

            this.formulaire.patchValue(materiel);
          })
      }
    })
  }

  

  onAjoutMateriel(){
    if(this.formulaire.valid){

      const materiel : Materiel = {
        id: this.idMaterielModifie,
        nom: this.formulaire.value.nom ?? '',
        description: this.formulaire.value.nom ?? '',
        categorie: this.formulaire.value.nom ?? '',
        listePrets: []
      };

      this.httpClient
      .post("http://localhost:8080/materiel",materiel)
      .subscribe(() => this.router.navigate(['gestion-materiels']));
    }
  }
}
