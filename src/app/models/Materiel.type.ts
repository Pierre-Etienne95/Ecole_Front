import {Pret} from "./Pret.type"

export type Materiel ={
    id?: number,
    nom: string,
    description : string,
    categorie: string,
    listePrets: Pret[]
}