import { Tdp } from "../classes/Tdp"

export default function tabSorter(tabOrigine:Tdp[], tabModifier:Tdp[]) {
    return{
        tCreatedElem:tabModifier.filter(elem => elem.status === "ghost" && elem.regletteType !== 'x' && elem.regletteNbr.length === 2),
        tEditedElem:(tabModifier.filter(elem => elem.status === 'original' && elem.regletteType !== 'x' && elem.regletteNbr.length === 2))
        .filter(elem => {
            const elemOrigine = tabOrigine.find(elemO => elemO._id === elem._id)||new Tdp({})
            return (elem.regletteType !== elemOrigine.regletteType || elem.regletteNbr !== elemOrigine.regletteNbr || elem.option !== elemOrigine.option)
        }),
        tDeletedElem:tabModifier.filter(elem => elem.status === 'original' && elem.regletteNbr === '' && elem.regletteType === 'x')
    }
}