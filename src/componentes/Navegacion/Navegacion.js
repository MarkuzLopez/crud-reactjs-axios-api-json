import React from 'react';
import './Navegacion.css';
import {Link} from 'react-router-dom';

const Navegacion = () =>  { 
    return (
        <nav className="col-12 col-md-8">
            <Link to={'/'}>Todo los Posts</Link>
            <Link to={'/crear'}>Nuevo Posts </Link>
        </nav>
    );
}

export default Navegacion;