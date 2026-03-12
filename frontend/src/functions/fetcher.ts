import { Tdp } from "../classes/Tdp"

interface RepTab{
    rep:string
}
export async function fetcher (route:string, method:string, data:Tdp[]|RepTab[], callback?:any){
    if (data.length === 0){
        if (callback) return callback()
        else return {data:[]}
    }else{
        const body = JSON.stringify(data)
        const result = await fetch(process.env.REACT_APP_URL +`${route}`,
        { 
            method,
            mode: 'cors',
            body,
            headers:{
                'Content-Type' : 'application/json'
            }
        }).catch(err => {
            alert('probleme')
            return {err}
        })
        if ("ok" in result){
            const ladata = await result.json()
            if (callback) callback({data: ladata})
            else return {data:ladata}
        }else return {err:result.err}
    }
}