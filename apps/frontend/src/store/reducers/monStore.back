const  initialState = {
    mustLoad:false,
    ndToShow: null,
    formValue: '',
    getFetch: false,
    fetchedResultData:[],
    alreadyShow:[],
    fetchModal:false,
    modalData:{},
    tdpErr:{
        data:[]
    },
    createReglette:false,
    repStructure:{
        "tab":[[[[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]]]]]
    },
    cho:{
        "tab":[[[[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["L/INX02","I"],["L/INX03","I"],["L/INX04","I"],["L/INX05","I"],["L/INX06","I"],["L/INX14","I"],["L/INX15","I"],["L/INX16","I"]],[["L/INX17","I"],["L/INX19","I"],["L/INX20","I"],["L/INX21","I"],["L/INX28","I"],["L/INX29","I"],["L/INX30","I"],["L/INX31"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["T/LIF34","I"],["T/LIF35","I"],["T/LIF36","I"],["T/LIF37","I"],["T/LIF38","I"],["T/LIF39","I"],["R/DEGB3"],["R/DEGB4"]],[["L/INX32"],["L/INX33"],["L/INX44"],["L/INX45"],["L/INX46"],["L/INX58"],["L/INX59"],["L/INX60"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["L/INX85"],["L/INX86"],["L/INX87"],["L/INX88"],["L/INX89"],["L/INX90"],["L/INX91"],["L/INX92"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["L/INX93"],["L/INX94"],["L/INX95"],["L/INX96"],["L/INX97"],["L/INX98"],["L/INX99"],["R/DEGA0"]],[["R/DEGA1"],["R/DEGA2"],["R/DEGA3"],["R/DEGA4"],["R/DEGA6"],["R/DEGA7"],["R/DEGB9"],["R/DEGC0"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["R/DEGB5"],["R/DEGB6"],["R/DEGB7"],["R/DEGB8"],["R/DEGD4"],["R/DEGD5"],["R/DEGD6"],["R/DEGF8"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["R/DEGD0"],["R/DEGD1"],["R/DEGD2"],["R/DEGD3"],["R/DEGD7"],["R/DEGD8"],["R/DEGE0"],["R/DEGE2"]],[["R/DEGE3"],["R/DEGE4"],["R/DEGE5"],["R/DEGE6"],["R/DEGE7"],["R/DEGE8"],["R/DEGE9"],["R/DEGF0"]],[["R/DEGF1"],["R/DEGF2"],["R/DEGF3"],["R/DEGF4"],["R/DEGF5"],["R/DEGF6"],["R/DEGG1"],["R/DEGG2"]],[["R/DEGG3"],["R/DEGG6"],["R/DEGG7"],["R/DEGG8"],["R/DEGG9"],["R/DEGH0"],["R/DEGH1"],["R/DEGH3"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["R/DEGF9"],["R/DEGG0"],["R/DEGH3"],["R/DEGH4"],["R/DEGH5"],["R/DEGJ0"],["R/DEGJ1"],["R/DEGJ2"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["x"],["x"],["x"],["x"],["x"],["R/DEGL1"],["R/DEGL2"],["R/DEGL3"]],[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]],[["R/DEGL4"],["R/DEGL5"],["R/DEGL6"],["R/DEGL7"],["x"],["x"],["x"],["x"]]]]]}


};
export default function  monStore(state = initialState, action){
    let nextState;
    switch (action.type) {

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
        
        case 'GET_FORM_VALUE':
            nextState = {...state, formValue: action.value, getFetch: true}
        return nextState||state

        case 'SHOW_MODAL':
            nextState = {...state, modalData:{...action.value}}
        return nextState||state

        case 'CLOSE_MODAL':
            nextState = {...state, tdpErr:{showModal:action.value, data:[]}}
        return nextState||state

        case 'SEND_REGLETTE_VALUE':
            nextState = {...state, createReglette:false}
        return nextState||state

        case 'GET_FETCH_VALUE':
            nextState = {...state, fetchedResultData: action.value, getFetch:false}
        return nextState||state

        case 'CREATE_REGLETTE':
            const {salle, rco, colone, posissionReglette, opt} = action.value;

            nextState = {...state, fetchModal:true, tdpErr:{...state.tdpErr, data:{...state.tdpErr.data,salle,rco,colone,posissionReglette,opt, }},}
        return nextState||state

        case 'CLOSE_REGLETTE':
            nextState = {...state,tdpErr:{...state.tdpErr, data:[]}, fetchModal:true}
            return nextState||state

        case 'STORE_TDP_STATE':
            nextState = {...state, TdpPreviousState: action.value }
        return nextState||state

        case 'UPDATE_LOADER':
            nextState = {...state, mustLoad: action.value }
        return nextState||state

        case 'RESET_APP':
            nextState = initialState
        return nextState||state

        default:
            return state
    }
}







