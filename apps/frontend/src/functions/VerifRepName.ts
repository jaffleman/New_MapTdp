import { Tdp } from '../classes/Tdp';
import {fetcher} from './fetcher'

const VerifRepName = async (repName:string, callBack:(result:Tdp[], repName?:string)=>void) => {
        const regex = /^([a-z]){3}([0-9]){2}$/;
        if (!regex.test(repName)) {
                const resultErr = {'err':new Error(`${repName}: Le nom du rep est incorrect`)}
                return resultErr
        }
        fetcher("searchRep","POST",[{rep:repName}])
        .then(result=>  callBack(result, repName))
}
export default VerifRepName