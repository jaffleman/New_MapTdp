import ExtraSession from "../classes/newExtraSession"
import { Tdp } from "../classes/Tdp"

export function tdpExist(session:ExtraSession, regletteType:string, regletteNbr:string[]|string) {
    if (regletteNbr === '' || regletteType === 'x') return false
    const tabTdp:Tdp[] = []
    session.getRep().forEach(leRep => leRep.salle.forEach(laSalle => laSalle.rco.forEach(laRco => laRco.ferme.forEach(laFerme => laFerme.level.forEach(leLevel => tabTdp.push(leLevel.tdp))))))
    if (typeof (regletteNbr) === 'object') {
        const tabNbr:Tdp[] = []
        regletteNbr.forEach(element => {
            const elemToChange = tabTdp.find(tdp => tdp._id === element && (tdp.regletteType === 'x' || tdp.regletteType !== regletteType))
            if (elemToChange) tabNbr.push(elemToChange)
        })
        const existTab:Tdp[] = []
        tabNbr.forEach(nbr => {
            if (nbr.regletteNbr !== '') {
                const exist = tabTdp.find(element => element.regletteType === regletteType && element.regletteNbr === nbr.regletteNbr)
                if (exist) return existTab.push(exist)
            }
        })
        if (existTab.length) {
            alert("La ou les reglettes suivantes existent déjà dans ce répartiteur: \n" + existTab.map(elem => " " + regletteType + elem.regletteNbr))
            return true
        } else return false
    } else {
        if (regletteNbr.length < 2) return false
        const exist = tabTdp.find(element => element.regletteType === regletteType && element.regletteNbr === regletteNbr)
        if (exist) {
            alert("La reglette " + exist.regletteType + exist.regletteNbr + " existe déjà dans ce répartiteur!")
            return true
        } else return false
    }
}


/*
const session = JSON.parse('{"repName":"rip00","brutdata":[{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":1,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001111","position":11011},{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":2,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001112","position":11012},{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":3,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001113","position":11013},{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":4,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001114","position":11014},{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":5,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001115","position":11015},{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":6,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001116","position":11016},{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":7,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001117","position":11017},{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":8,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001118","position":11018}],"rep":[{"name":"rip00","salle":[{"number":1,"rco":[{"number":1,"ferme":[{"number":1,"index":0,"level":[{"number":1,"tdp":{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":1,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001111","position":11011}},{"number":2,"tdp":{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":2,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001112","position":11012}},{"number":3,"tdp":{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":3,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001113","position":11013}},{"number":4,"tdp":{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":4,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001114","position":11014}},{"number":5,"tdp":{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":5,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001115","position":11015}},{"number":6,"tdp":{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":6,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001116","position":11016}},{"number":7,"tdp":{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":7,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001117","position":11017}},{"number":8,"tdp":{"tdpId":"rip00x","status":"ghost","cd":"00","rep":"rip00","ferme":1,"level":8,"option":null,"rco":1,"regletteNbr":"","regletteType":"x","salle":1,"_id":"rip001118","position":11018}}]}]}]}]}],"cd":"00","salleNumber":1}' ) 
const regletteType = 'L/INX'  
//const regletteNbr =['rip001111','rip001112','rip001113','rip001114','rip001115','rip001116','rip001117','rip001118']
const regletteNbr = 'G0'
const result = tdpExist(session, regletteType, regletteNbr)//?
*/