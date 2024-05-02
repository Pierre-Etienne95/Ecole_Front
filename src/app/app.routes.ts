import { Routes } from '@angular/router';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { Page404Component } from './pages/page404/page404.component';
import { GestionMaterielComponent } from './pages/gestion-materiel/gestion-materiel.component';
import { EditionMaterielComponent } from './pages/edition-materiel/edition-materiel.component';

export const routes: Routes = [

    {path:'', component: AcceuilComponent},
    {path:'gestion-materiels', component:GestionMaterielComponent},
    {path:'edition-materiels', component:EditionMaterielComponent},
    {path:'edition-materiel', component:EditionMaterielComponent},

    {path:'**', component: Page404Component}

];
