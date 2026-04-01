export class Bebe {
  id?: number;
  nom: string;
  prenom: string;
  dateNais: string;
  parentId?: number;

  constructor(nom: string, prenom: string, dateNais: string, parentId?: number) {
    this.nom = nom;
    this.prenom = prenom;
    this.dateNais = dateNais;
    this.parentId = parentId;
  }
}