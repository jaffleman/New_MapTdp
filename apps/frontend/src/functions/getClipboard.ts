
export default async function getClipboardContent(callback:(text:string)=>void){
    if(navigator.clipboard) navigator.clipboard.readText().then(text =>callback(text))    
}