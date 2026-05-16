const  initialState = {
    session : {},
    baseBrutData: [],
    mustLoad:false,
    ndToShow: null,
    //formValue: '',
    //getFetch: false,
    //fetchedResultData:[],
    alreadyShow:[],
    //fetchModal:false,
    modalData:{},
    /*tdpErr:{
        data:[]
    },*/
    //createReglette:false,
};
export default function  monStore(state = initialState, action){
    let nextState;
    switch (action.type) {

        case 'RESET_SESSION' :
            nextState = {...state, session:{}, baseBrutData: []}
        return nextState||state

        case 'SET_SESSION_DATA':
            nextState = {...state, session:action.value}
        return nextState||state

        case 'SET_BASE_DATA':
            nextState = {...state, baseBrutData: action.value}
        return nextState||state

        case 'TOGGLE_FAVORITE':{
           const check = state.alreadyShow.indexOf(action.value)===-1?true:false
            nextState = state.ndToShow !== action.value? {...state, ndToShow : action.value, alreadyShow : check?[...state.alreadyShow, action.value]:[...state.alreadyShow]} : {...state, ndToShow : null }            
        }
        return nextState||state

        case 'SET_REP_STRUCTURE':
            nextState = {...state, repStructure:{ tab:action.value }}
        return nextState||state

        case 'SET_REP_RCO':
            nextState = {...state, repStructure:action.value}
        return nextState||state
        
        /*case 'GET_FORM_VALUE':
            nextState = {...state, formValue: action.value, getFetch: true}
        return nextState||state*/

        case 'SHOW_MODAL':
            nextState = {...state, modalData:{...action.value}}
        return nextState||state

        case 'CLOSE_MODAL':
            nextState = {...state, tdpErr:{showModal:action.value, data:[]}}
        return nextState||state

        case 'SEND_REGLETTE_VALUE':
            nextState = {...state, createReglette:false}
        return nextState||state

        /*case 'GET_FETCH_VALUE':
            nextState = {...state, fetchedResultData: action.value, getFetch:false}
        return nextState||state*/

        /*case 'CREATE_REGLETTE':
            const {salle, rco, colone, posissionReglette, opt} = action.value;

            nextState = {...state, fetchModal:true, tdpErr:{...state.tdpErr, data:{...state.tdpErr.data,salle,rco,colone,posissionReglette,opt, }},}
        return nextState||state*/

        /*case 'CLOSE_REGLETTE':
            nextState = {...state,tdpErr:{...state.tdpErr, data:[]}, fetchModal:true}
            return nextState||state*/

        case 'STORE_TDP_STATE':
            nextState = {...state, TdpPreviousState: action.value }
        return nextState||state

        case 'UPDATE_LOADER':
            nextState = {...state, mustLoad: action.value }
        return nextState||state

        case 'RESET_APP':
            nextState = initialState
        return nextState||state

        case 'ADD_SAlLE' :
            nextState = {...state, repCreatorData:{...state.repCreatorData, brut:[...state.repCreatorData.brut, {ferme:1, level:1, rco:1, rep:action.value.rep , salle:action.value.salle}] } }
        return nextState||state

        case 'ADD_RCO' :
            nextState = {...state, repCreatorData:{...state.repCreatorData, brut:[...state.repCreatorData.brut, {ferme:1, level:1, rco:action.value.rco, rep:action.value.rep , salle:action.value.salle}]}}
        return nextState||state
        
        default:
            return state
    }
}







