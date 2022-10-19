export class DateFilter {
  initialDate: string;
  finalDate: string;
  initialTime: string;
  finalTime: string

  constructor(initialDate: string, finalDate: string, initialTime: string, finalTime: string){
    this.initialDate = initialDate,
    this.finalDate = finalDate,
    this.initialTime = initialTime,
    this.finalTime = finalTime
  }
}
