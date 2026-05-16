import newPlot from '../classes/newPlot'

const newFilter = (text: string) => {
    /*
        Allow to found tdp element in a given text nased on regEx
        input: string => output: Array<string>
    */
    const regex = /([a-zA-Z]){3}([0-9]){2}((-[0-9])|(-([0-9]{2}))|) ((L\/INX)|(A\/TEL)|(R\/DEG)|(T\/LIF)|(linx)|(atel)|(rdeg)|tlif)(\w){2}([0-9]){3}|(([a-zA-Z]){3}([0-9]){2}((-[0-9])|(-([0-9]{2}))|) ((L\/INX)|(A\/TEL)|(R\/DEG)|(T\/LIF)|(linx)|(atel)|(rdeg)|tlif)(\w){2})/gmi;
    let tab:RegExpExecArray|null;
    const matchRegexTab:string[] = [];
    while ((tab = regex.exec(text)) !== null) if (!(matchRegexTab.includes(tab[0]))) matchRegexTab.push(tab[0])
    return matchRegexTab;
}

/*
const text = 'lot : vit94-3 L/INX27068, IP : 82.226.17.133 0146820644 (24997468)2Plus de synchronisationPlot : vit94-4 L/INX45004, IP : 82.230.154.50147184081 (25743767)2Plus de synchronisationPlot : vit94-4 L/INX52124, IP : 82.234.189.610146822664 (25402620)3Pertes impactantePlot : vit94-4 L/INX52125, IP : 82.234.189.620146822656 (25403041)2Perte de synchronisation fréquentePlot : vit94-5 L/INX80099, IP : 82.243.49.2040146812091 (21221393)2Pertes impactantesPlot : vit94-5 L/INX81096, IP : 82.243.50.410143658546 (23258177)3Plus de synchronisationPlot : vit94-6 R/DEG90108, IP : 2a01:e0a:4be:a3f0::10146801765 (24590200)3Perte de synchronisation fréquentePlot : vit94-11 R/DEG95033, IP : 83.156.100.340143919264 (18913027)1Perte de synchronisation fréquentePlot : vit94-11 R/DEG99021, IP : 83.156.102.300146807785 (10624912)1Plus de synchronisationPlot : vit94-10 R/DEGF8061, IP : 78.240.192.780146825722 (9092764)Sébastien M.Mon PlanningMes TDPActiver PTIAppel SupportInfo AbonnéAnalyse WifiParamètresÀ propos de GTI-PlanningDéconnexionQuitterTDP - IVR94 - lundi 28 septembre- 12 TDPmore_vert12 TDPIVR94'
const filterResult = filter(text)//?
*/

const transforme = (params:string[]):newPlot[] => params.map(value => new newPlot(value));


const reduce = (tabA:newPlot[]):newPlot[] => {
    /*
        Merge items with same parameters
        input: Array<Plot>
        output: Array<Plot>
    */
    const tabB:newPlot[]=[]
    while(tabA.length>0){
        const A = tabA.shift()||new newPlot()
        const comparator = ({tdpId}:newPlot)=>tdpId === A.tdpId
        const index = tabB.findIndex(comparator)
        if (index === -1) tabB.push(A)
        else tabB[index].plot.push(A.plot[0])
    }
    return tabB
}


export default function extraireLesDonnees(data:string):newPlot[] {
    return reduce(transforme(newFilter(data)))
}