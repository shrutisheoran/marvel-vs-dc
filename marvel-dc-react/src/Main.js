import React, { Component, PropTypes} from 'react';
import serializeForm from 'form-serialize'

class Main extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash:true } )
        if(this.props.onURLSubmit)
            this.props.onURLSubmit(values)
    }
    render() {
        return(
            <div class='main'>
                <h1 class='header'>MARVEL Vs DC</h1>
                <h2 style={{color: '#8f1313'}}>Enter the image address (Image should be in jpg or png format)</h2>
                <form onSubmit={this.handleSubmit} >
                    <input type='input' className='input-url' name='image'/><br/><br/>
                    <input className='submit-url' type='Submit' value='Submit' />
                </form><br/><br/>
                <div className='box'>
                    <img src={this.props.info.image} height='250px'  width="200px"/><br/>
                    <h2>MARVEL Vs DC: <font color='green'>{this.props.info.title}</font></h2>
                    <h2>{this.props.info.title} Score: <font color='#8f1313'>{this.props.info.score*100}%</font></h2>
                    <h2>Lower Score: <font color='#8f1313'>{Math.round(100-this.props.info.score*100)}%</font></h2>
                </div>
            </div>
        )
    }
}

export default Main;