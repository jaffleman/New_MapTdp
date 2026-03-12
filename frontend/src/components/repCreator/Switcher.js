import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Switcher extends React.Component{
  
    render(){
        const {number, back, next, fermes, handleClick,id} = this.props 
        const nextOrPlus = this.props.number === this.props.total? " + " : ">"
        return (
            <div style={{marginTop:'5px'}}>
                <Container fluid>
                    <Row style={{padding:"0px", marginLeft:'0px',marginRight:'0px'}}>
                        <Button size="sm" onClick={back}>{'<'}</Button>
                        <Col xs={10} style={{padding:"0px", marginLeft:'0px',marginRight:'0px'}}>{
                            fermes.map((elem)=>{
                                const num = elem.number>9?elem.number:`0${elem.number}`
                                const style = number===elem.number?{backgroundColor:"#e46b50",color:"black"}:{backgroundColor:"white",color:"black"}
                                return <Button size="sm" key={`${id}ferme${elem.number}`} className={`buttonFerme ${elem.number}`} style={style} type="button" onClick={()=>handleClick(elem.index)}>{num}</Button>
                            }) 
                        }</Col>
                        <Button size="sm" onClick={next}>{nextOrPlus}</Button>
                    </Row>
                </Container>
            </div>
        )
    }

}
export default Switcher