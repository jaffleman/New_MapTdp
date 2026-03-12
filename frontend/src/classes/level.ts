import { Tdp } from './Tdp'
export class Level {
  number:number
  tdps:Tdp[]
  constructor(identifiant:number, newTabTdp:Tdp[]) {
    const dataTab:Tdp[] = []
    newTabTdp.forEach(element =>{if (element.level === identifiant) dataTab.push(element)})
    this.number = identifiant
    this.tdps = dataTab.map(elem=>new Tdp(elem))
  }
}