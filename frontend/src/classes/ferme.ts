import { Level } from './level'
import { Tdp } from './Tdp'
export class Ferme {
  number:number
  index:number
  level:Level[]
  constructor(identifiant:number, newTabTdp:Tdp[], index:number) {
    const dataTab:Tdp[] = []
    newTabTdp.forEach(element => element.ferme === identifiant? dataTab.push(element):null)
    function find(dataTab:Tdp[]){
      const tab:number[]=[]
      dataTab.forEach(tdp=>tab.findIndex(elem=>elem === tdp.level) === -1? tab.push(tdp.level):null)
      return tab.map(elem=>new Level(elem,dataTab)).sort((a,b)=>a.number-b.number)
    }
    this.number = identifiant
    this.index = index
    this.level = find(dataTab)
  }
}