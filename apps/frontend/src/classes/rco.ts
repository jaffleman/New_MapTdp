import { Ferme } from './ferme'
import { Tdp } from './Tdp'
export class Rco {
  number: number
  ferme: Ferme[]
  constructor(identifiant:number, newTabTdp:Tdp[]) {
    const dataTab:Tdp[] = []
    newTabTdp.forEach(element => element.rco === identifiant? dataTab.push(element):null)
    function find(dataTab: Tdp[]){
      const tab: number[]=[]
      dataTab.forEach((tdp: { ferme: number })=>tab.findIndex(elem=>elem === tdp.ferme) === -1? tab.push(tdp.ferme):null)
      return tab.map((elem,index)=>new Ferme(elem,dataTab,index))
    }
    this.number = identifiant
    this.ferme = find(dataTab)
  }
  addFerme(){
  }
}