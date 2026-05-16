import newPlot from "./newPlot";
import { Tdp } from "./Tdp";

export default class LocalStorageManager{
    private isActive: boolean
    constructor(){
        try {
            var x = '__storage_test__';
            window['localStorage'].setItem(x, x);
            window['localStorage'].removeItem(x);
            this.isActive = true;
        }
        catch(e) {
            this.isActive = false;
        }
        if (!this.isActive) return
        const stoDate = localStorage.getItem('storageDate')
        const date : Date = new Date(stoDate||'July 20, 69 20:17:40 GMT+00:00')
        const tdps:[Tdp] =  JSON.parse(localStorage.getItem('tdps')||'[]')
        const autoPastStatus: boolean = JSON.parse(localStorage.getItem('autoPastStatus')||'true')
        const today = new Date()
        if (stoDate) {
            if (IsNewDay(date,today)){
                localStorage.setItem('tdps', JSON.stringify([...tdps]))
                localStorage.setItem('autoPastStatus', JSON.stringify(autoPastStatus))
            }else{
                localStorage.setItem('storageDate', ''+today)
                localStorage.setItem('tdps', JSON.stringify([]))
                localStorage.setItem('autoPastStatus', JSON.stringify(autoPastStatus))
            }
        }else{
            localStorage.setItem('storageDate', ''+today)
            localStorage.setItem('tdps', JSON.stringify([]))
            localStorage.setItem('autoPastStatus', JSON.stringify(autoPastStatus))
        }

    }
    public getIsActive():boolean{
        return this.isActive
    }
    public getAutoPast():boolean {
        if (!this.isActive) return false
        return JSON.parse(localStorage.getItem('autoPastStatus')||'false')
    }
    public setAutoPast(value:boolean):void{
        if (this.isActive) localStorage.setItem('autoPastStatus', JSON.stringify(value))
    }
    public clearTdpList(): void{
        if (this.isActive) localStorage.setItem('tdps', JSON.stringify([]))
    }
    public getTdps():Tdp[] {
        const stoItem = localStorage.getItem('tdps')
        if (stoItem===null) return []
        return JSON.parse(stoItem).map((tdp:Tdp)=> new Tdp(tdp))
    }
    public requestComparator(requestData:newPlot[] ):newPlot[] {
        /*
            compare les elements de types newPlot à rechercher en base avec 
            les éléments de type Tdp et stocké dans le localStorage pour 
            éviter toute requettes inutiles à la base de donnée.
        */
        const newTabReq = [...requestData]
        const searchTab = []
        if (!this.isActive) return newTabReq
        const tdps:Tdp[] =  this.getTdps()
        if (tdps.length<1) return newTabReq
        while(newTabReq.length>0){
            const req:newPlot = newTabReq.shift()||new newPlot()
            const comparator = ({tdpId}:Tdp)=>tdpId===req.rep+req.regletteType+req.regletteNbr
            const index = tdps.findIndex(comparator)
            if (index === -1) searchTab.push(req)
        }
        return searchTab
    }
    public storageStock(fetchedData:[any]):void{
        const tdps:Tdp[] =  this.getTdps()
        const newSession = [...fetchedData.filter(elem=>elem.fetched).map(element => {return  {...element, 'fetched':false}}), ...tdps];
        localStorage.setItem('tdps', JSON.stringify([...newSession]))
    }

}

function IsNewDay(firstDate:Date, secondeDate:Date):boolean {
    if (firstDate.getFullYear() !== secondeDate.getFullYear()) return false
    if (firstDate.getMonth() !== secondeDate.getMonth()) return false
    if (firstDate.getDate() !== secondeDate.getDate()) return false
    return true
}