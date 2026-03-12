
const loader= (value:boolean,props:any)=> {
    props.dispatch({
        type: "UPDATE_LOADER",
        value: value
    })
}
export default loader