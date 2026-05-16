import { Rco } from  './rco'
import { Tdp } from './Tdp'
export class Salle {
  number:number
  rco:Rco[]
  constructor(identifiant:number, newTabTdp:Tdp[]) {
    const dataTab = newTabTdp.filter(element => element.salle === identifiant)
    function find(dataTab:Tdp[]){
      const tab:number[]=[]
      dataTab.forEach((tdp:Tdp)=>tab.findIndex(elem=>elem === tdp.rco) === -1? tab.push(tdp.rco):null)
      return tab.map(elem=>new Rco(elem,dataTab))
    }
    this.number = identifiant
    this.rco = find(dataTab)
  }
}