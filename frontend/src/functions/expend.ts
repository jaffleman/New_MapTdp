import { Tdp } from "../classes/Tdp"

export function expend(params:Tdp[]){
    const tab:Tdp[] =[]
    params.forEach(tdp=>typeof(tdp.plot)==='string'?tab.push({...tdp}):tdp.plot.forEach((plot:number)=>tab.push({...tdp, plot:[plot]})))
    return tab
}