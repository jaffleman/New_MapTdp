import { Tdp } from "./Tdp"

class Rep {
    name: string
    salle: Salle[]
    constructor(identifiant: string, newTabTdp: Tdp[]) {

        function find(dataTab: Tdp[]) {
            const tab: number[] = []
            dataTab.forEach((tdp: Tdp) => tab.findIndex(elem => elem === tdp.salle) === -1 ? tab.push(tdp.salle) : null)
            return tab.map(elem => new Salle(elem, dataTab))
        }
        this.name = identifiant
        this.salle = find(newTabTdp.filter(element => element.rep === identifiant))
    }
}

class Salle {
    number: number
    rco: Rco[]
    constructor(identifiant: number, newTabTdp: Tdp[]) {

        function find(dataTab: Tdp[]) {
            const tab: number[] = []
            dataTab.forEach((tdp: Tdp) => tab.findIndex(elem => elem === tdp.rco) === -1 ? tab.push(tdp.rco) : null)
            return tab.map(elem => new Rco(elem, dataTab))
        }
        this.number = identifiant
        this.rco = find(newTabTdp.filter(element => element.salle === identifiant))
    }
}

class Rco {
    number: number
    ferme: Ferme[]
    constructor(identifiant: number, newTabTdp: Tdp[]) {
        function find(dataTab: Tdp[]) {
            const tab: number[] = []
            dataTab.forEach((tdp: Tdp) => tab.findIndex(elem => elem === tdp.ferme) === -1 ? tab.push(tdp.ferme) : null)
            return tab.map((elem, index) => new Ferme(elem, dataTab, index))
        }
        this.number = identifiant
        this.ferme = find(newTabTdp.filter(element => element.rco === identifiant))
    }
}

class Ferme {
    number: number
    index: number
    level: Level[]
    constructor(identifiant: number, newTabTdp: Tdp[], index: number) {

        function find(dataTab: Tdp[]) {
            const tab: number[] = []
            dataTab.forEach((tdp: Tdp) => tab.findIndex(elem => elem === tdp.level) === -1 ? tab.push(tdp.level) : null)
            return tab.map(elem => new Level(elem, dataTab)).sort((a, b) => a.number - b.number)
        }
        this.number = identifiant
        this.index = index
        this.level = find(newTabTdp.filter(element => element.ferme === identifiant))
    }
}

class Level {
    number: number
    tdp: Tdp
    constructor(identifiant: number, newTabTdp: Tdp[]) {

        this.number = identifiant
        this.tdp = (newTabTdp.filter(tdp => tdp.level === identifiant))[0] //?
    }
}

function truncBase(position: number, base: number) {
    return Math.trunc(position / base)
}

function sorterData(tab: Tdp[]) {
    const newTab: Tdp[] = []
    tab.forEach((e: Tdp) => {
        const rectifyFerme = e.ferme < 10 ? "0" + e.ferme : e.ferme
        newTab.push(new Tdp({
            ...e,
            position: parseInt("" + e.salle + e.rco + rectifyFerme.toString() + e.level)
        }))
    })
    newTab.sort((a, b) => {
        return a.position - b.position
    })
    return newTab
}

function prompter(phrase: string) {
    const resp: string | null = prompt(phrase)
    if (resp === null) return 0
    const parse = parseInt(resp)
    if (isNaN(parse)) return 0
    return parse
}
export default class ExtraSession {
    getRep = () => this.rep
    private repName: string = ''
    private brutdata: Tdp[] = []
    private rep: Rep[] = []
    private cd: string = ''
    private salleNumber: number = 0
    constructor(sessionData: Tdp[], repName: string) {
        if (sessionData.length === 0) return
        this.brutdata = sorterData(sessionData.map(elem => {
            if (!elem.status) return new Tdp({
                ...elem,
                status: "original"
            })
            else return new Tdp(elem)
        }))
        this.repName = repName
        this.rep = [new Rep(repName, this.brutdata)]
        this.cd = repName.slice(-2)
        this.salleNumber = this.rep[0].salle.length
        const newTab: Tdp[] = []
        this.rep.forEach((elem: {
            salle: Salle[]
        }) => {
            elem.salle.forEach((elemSalle: {rco: Rco[];number: number}) => {
                elemSalle.rco.forEach((elemRco: {ferme: Ferme[];number: number}) => {
                    elemRco.ferme.forEach((elemFerme: {level: Level[];number: number}) => {
                        if (elemFerme.level.length !== 8) {
                            for (let index = 1; index < 9; index++) {
                                if (!(elemFerme.level.find((elem: {number: number}) => elem.number === index))) {
                                    newTab.push(new Tdp({
                                        cd: parseInt(this.cd),
                                        ferme: elemFerme.number,
                                        level: index,
                                        rco: elemRco.number,
                                        rep: this.repName,
                                        salle: elemSalle.number,
                                        _id: this.repName + elemSalle.number + elemRco.number + elemFerme.number + index,
                                    }))
                                }

                            }
                        }
                    })
                })
            })
        })
        if (newTab.length > 0) return new ExtraSession(sessionData.concat(newTab), this.repName)
    }


    private getRcoNumber(id: number) {
        return this.rep[0].salle[id].rco.length
    }

    modifRegType(itemId: string[], value: string) {
        const newBrut = [...this.brutdata]
        itemId.forEach((element: string) => {
            const elem = this.brutdata.findIndex((tdp: Tdp) => tdp._id === element)
            const monElem = {
                ...this.brutdata[elem],
                regletteType: value
            }
            newBrut[elem] = new Tdp(monElem)
        })
        return new ExtraSession(newBrut, this.repName)
    }
    modifRegNbr(itemId: string[], value: string) {
        const newBrut = [...this.brutdata]
        itemId.forEach((element: string) => {
            const i = this.brutdata.findIndex((tdp: Tdp) => tdp._id === element)
            const monElem = {
                ...this.brutdata[i],
                regletteNbr: value
            }
            newBrut[i] = new Tdp(monElem)
        })
        return new ExtraSession(newBrut, this.repName)
    }
    modifOption(itemId: string[], value: string) {
        const newBrut: Tdp[] = [...this.brutdata]
        itemId.forEach((element: string) => {
            const elem = this.brutdata.findIndex((tdp: Tdp) => tdp._id === element)
            newBrut[elem] = {
                ...this.brutdata[elem],
                option: value === 'null' ? 'null' : value
            }
        })
        return new ExtraSession(newBrut, this.repName)
    }

    addSalle(ndFerme = 0) {
        if (!ndFerme) ndFerme = prompter('Quel est le numéro de la première ferme de la première rco?')
        if (ndFerme < 1) return this
        const newSalleNd = this.salleNumber + 1
        for (let index = 1; index < 9; index++) {
            this.brutdata.push(new Tdp({
                cd: parseInt(this.cd),
                ferme: ndFerme,
                level: index,
                rco: 1,
                rep: this.repName,
                salle: newSalleNd,
                _id: this.repName + newSalleNd + 1 + ndFerme + index,
            }))
        }
        return new ExtraSession(this.brutdata, this.repName)
    }
    addRco(idSalle = 0, ndFerme = 0) {
        if (this.salleNumber > 1 && !idSalle) idSalle = prompter('dans quelle salle?')
        else idSalle = 1

        if (!ndFerme) ndFerme = prompter('Quel est le numéro de la première ferme de cette rco?')
        if (idSalle < 1 || idSalle > this.salleNumber || ndFerme < 1) return this
        const newRcoNd = this.rep[0].salle[idSalle - 1].rco.length + 1
        for (let index = 1; index < 9; index++) {
            this.brutdata.push(new Tdp({
                cd: parseInt(this.cd),
                ferme: ndFerme,
                level: index,
                rco: newRcoNd,
                rep: this.repName,
                salle: idSalle,
                _id: this.repName + idSalle + newRcoNd + ndFerme + index,
            }))
        }
        return new ExtraSession(this.brutdata, this.repName)
    }
    addFerme(idSalle = 0, idRco = 0, ndFerme = 0) {
        if (idSalle === 0) idSalle = this.salleNumber > 1 ? prompter('dans quelle salle?') : 1
        const rcoNumber = this.getRcoNumber(idSalle - 1)
        if (idRco === 0) idRco = rcoNumber > 1 ? prompter('dans quelle rco?') : 1
        if (ndFerme === 0) ndFerme = prompter('Quel est le numéro de la ferme ?')
        const fermeExist = this.rep[0].salle[idSalle - 1].rco[idRco - 1].ferme.findIndex((elem: Ferme) => elem.number === ndFerme) === -1 ? false : true
        if (idSalle < 1 || idSalle > this.salleNumber || idRco < 1 || idRco > rcoNumber || ndFerme < 1 || fermeExist) return this
        for (let index = 1; index < 9; index++) {
            this.brutdata.push(new Tdp({
                tdpId: '',
                status: "ghost",
                cd: parseInt(this.cd),
                ferme: ndFerme,
                level: index,
                rco: idRco,
                rep: this.repName,
                salle: idSalle,
                _id: this.repName + idSalle + rcoNumber + ndFerme + index,
            }))
        }
        return new ExtraSession(this.brutdata, this.repName)
    }

    deleteSalle() {
        const salle = this.salleNumber
        if (salle > 1) return new ExtraSession(this.brutdata.filter(tdp => truncBase(tdp.position, 10000) !== salle), this.repName)
        else {
            alert('Désolé, il faut au minimum 1 salle dans un rep!')
            return this
        }
    }
    deleteRco(idSalle = 0) {
        if (this.salleNumber > 1 && idSalle === 0) idSalle = prompter('Dans quelle salle?')
        if (idSalle > 0 || idSalle <= this.salleNumber) {
            if (idSalle === 0) idSalle = 1
            const idRco = this.rep[0].salle[idSalle - 1].rco.length
            if (idRco < 2) {
                alert('Désolé, il faut au minimum 1 Rco dans une salle!')
                return this
            }
            const position = parseInt("" + idSalle + idRco)
            return new ExtraSession(this.brutdata.filter(tdp => (truncBase(tdp.position, 1000) !== position)), this.repName)
        }
    }
    deleteFerme(idSalle = 0, idRco = 0, ndFerme = 0) {
        if (idSalle === 0) idSalle = this.salleNumber > 1 ? prompter('dans quelle salle?') : 1
        const rcoNumber = this.getRcoNumber(idSalle - 1)
        if (idRco === 0) idRco = rcoNumber > 1 ? prompter('dans quelle rco?') : 1
        if (ndFerme === 0) ndFerme = prompter('Quel est le numéro de la ferme ?')
        const fermeExist = this.rep[0].salle[idSalle - 1].rco[idRco - 1].ferme.findIndex((elem: Ferme) => elem.number === ndFerme) === -1 ? false : true
        if (idSalle < 1 || idSalle > this.salleNumber || idRco < 1 || idRco > rcoNumber || ndFerme < 1 || !fermeExist) return this

        const position = parseInt("" + idSalle + idRco + (ndFerme < 10 ? "0" + ndFerme : ndFerme).toString())
        return new ExtraSession(this.brutdata.filter(tdp => (truncBase(tdp.position, 10) !== position)), this.repName)
    }

    creatNewRep(repName: string) {
        return new ExtraSession([new Tdp({
            cd: parseInt(repName.slice(-2)),
            ferme: 1,
            level: 1,
            rco: 1,
            rep: repName,
            salle: 1,
            _id: repName + 1 + 1 + 1 + 1,
        })], repName)
    }
}