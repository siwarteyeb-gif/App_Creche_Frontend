export class ActiviteBebe {
  id?: number;
  typeActivite: string;
  date: string;
  temps: string;
  notes: string;
  bebeId?: number;

  constructor(
    typeActivite: string,
    date: string,
    temps: string,
    notes: string,
    bebeId?: number
  ) {
    this.typeActivite = typeActivite;
    this.date = date;
    this.temps = temps;
    this.notes = notes;
    this.bebeId = bebeId;
  }
}