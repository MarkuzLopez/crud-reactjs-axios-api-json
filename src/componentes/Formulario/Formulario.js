import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Formulario extends Component { 

    // variables ref

    titleRef = React.createRef();
    bodyRef = React.createRef();

    crearPost = (e) => { 
        e.preventDefault();

        // declarar los ref objeto
        const newPost = { 
            title : this.titleRef.current.value,
            bodyRef : this.bodyRef.current.value,
            userId: 1
        }        
        
        // enviar por props ah router para la peticion con axios 
        this.props.crearPost(newPost)
    }

    render() { 
        return (
            <form onSubmit={this.crearPost} className="col-8">
                <legend className="text-center">Crear Nuevo Post</legend>
                <div className="form-group">
                    <label>Titulo del Post: </label>
                    <input type="text" ref={this.titleRef} className="form-control" placeholder="Titullo del Post" />
                </div>
                <div className="form-group">
                    <label>Contenido: </label>
                    <textarea className="form-control" ref={this.bodyRef} placeholder="Contenido... " ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Crear
                <Link to={'/'}></Link>
                 </button>                
            </form>
        )
    }
}

export default Formulario;