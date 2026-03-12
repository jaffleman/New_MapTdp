import LocalStorageManager from "../classes/LocalStorageManager"
import { Tdp } from "../classes/Tdp"
export function compare(tabReq:Tdp[],tabRes:Tdp[]):Tdp[] {
    const localSto = new LocalStorageManager()
    const tabTdp:Tdp[] =[]
    while(tabReq.length>0){
        const req:Tdp = tabReq.shift()||new Tdp({})
        const comparator = ({tdpId}:Tdp):boolean =>tdpId===''+req.rep+req.regletteType+req.regletteNbr
        const index1 = tabRes.findIndex(comparator)
        if (index1 === -1) {
            if (localSto.getIsActive()){
                const localStoTdpTab = [...localSto.getTdps()]
                const index2 = localStoTdpTab.findIndex(comparator)
                if (index2 === -1) tabTdp.push({...req, "found":false})
                else tabTdp.push({...localStoTdpTab[index2], "plot":req.plot, "found":true, 'fetched':false})
            }else tabTdp.push({...req, "found":false})

        }else tabTdp.push({...tabRes[index1], "plot":req.plot, "found":true, 'fetched':true})
    }
    return tabTdp
}