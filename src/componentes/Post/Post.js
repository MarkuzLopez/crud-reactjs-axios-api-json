import React, { Component } from 'react';
import {Link} from  'react-router-dom';
import Swal from 'sweetalert2';

class Post extends Component  {     

    deletePostConfimacion = () => { 

        const { id } = this.props.info;

        Swal({
            title: '¿Estas Seguro?',
            text: "No podrar revertir los cambios",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar esto!'
          }).then((result) => {
            if (result.value) {
            this.props.borrarPost(id);
              Swal(
                'Borrado!',
                'Tu Rehistro ha sido borrado exitosamente.',
                'success'
              )
            }
          })        
    } 

    render () {   
        const {id, title} = this.props.info;

        return (
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                    <Link to={`/post/${id}`} className="btn btn-primary" >Ver</Link>
                    <Link to={`/editar/${id}`} className="btn btn-warning" >Editar</Link>
                    <button onClick={ this.deletePostConfimacion } type="button" className="btn btn-danger">dell</button> 
                    {/* <button onClick={ () => this.props.borrarPost(id) } type="button" className="btn btn-danger">dell</button> */}
                </td>
            </tr>    
        )
    }
}

export default Post;