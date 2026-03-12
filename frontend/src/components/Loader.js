import React from 'react';
import {connect} from 'react-redux';

const Loader = (props) => {
    if (!props.mustLoad) return null
    return <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div> 
}
const mapStateToProps = (state)=>{return {mustLoad:state.mustLoad}}
export default connect(mapStateToProps)(Loader);