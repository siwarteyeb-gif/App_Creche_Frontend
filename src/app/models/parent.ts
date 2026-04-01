export class Parent {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  password: string;
  role?: string;
    constructor(
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
    password: string,
    role?: string
  ) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.telephone = telephone;
    this.password = password;
    this.role = role;
  }
}