import { Salle } from './salle'
import { Tdp } from './Tdp'
export class Rep {
  name: string
  salle: Salle[]
  constructor(identifiant: string, newTabTdp: Tdp[]) {
    const dataTab: Tdp[] =[]
    newTabTdp.forEach((element: Tdp) => element.rep === identifiant? dataTab.push(element):null)
    function find(dataTab: Tdp[]){
        const tab: number[]=[]
        dataTab.forEach((tdp: { salle: number })=> tab.findIndex(elem=>elem === tdp.salle) === -1? tab.push(tdp.salle):null)
      return tab.map(elem=>new Salle(elem,dataTab))
    }
    this.name = identifiant
    this.salle = find(dataTab)
  }
}