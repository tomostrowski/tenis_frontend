import React, { Component } from 'react'

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showModal: false
         }
    }
    render() { 
        if(!this.props.showModal){
            return null;
        }        
        return ( 
            <React.Fragment>
            <div id="myModal" className="modal">
                    <div className="modal-content">
                    <span id="close" className="close" onClick={this.closeModal}>&times;</span>
                    {this.props.children}
                    {/* <button onClick={this.closeModal} className="btn btn-secondary close-button">Zamknij</button> */}
                    </div>
            </div>
            </React.Fragment>
         );
    }

        closeModal= e =>{
            this.props.showModalCallback && this.props.showModalCallback(e);
        } 

}

export default Modal;
