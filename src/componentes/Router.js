import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Navegacion from "./Navegacion/Navegacion";
import axios from "axios";
import swal from "sweetalert2";
import Posts from "./Posts/ Posts";
import SinglePost from "./SinglePost/SinglePost";
import Formulario from "./Formulario/Formulario";
import Editar from "./Editar";

class Router extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.obtenerPosts();
  }

  obtenerPosts = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
      this.setState({
        posts: res.data
      });
    });
  };

  borrarPost = id => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(resp => {
        if (resp.status === 200) {
          const posts = [...this.state.posts];

          let resultado = posts.filter(post => post.id !== id);

          this.setState({
            posts: resultado
          });
        }
      });
  };

  crearPost = post => {
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, { post })
      .then(res => {
        if (res.status === 201) {
          swal({
            type: "success",
            title: "Tu Dato ha sido guardado correctamente",
            showConfirmButton: true,
            timer: 1500
          });

          let postId = { id: res.data.id }; // se obtiene el id de la respuesta json

          const nuevoPost = Object.assign({}, res.data.post, postId); // se obtiene el json original y se agrega un nuevo atributo mediante la propiedad Object.assign

          this.setState(prevState => ({
            posts: [...prevState.posts, nuevoPost] /// se obtiene una copia del estado origina y se agrega el nuevo estado.
          }));
        }
      });
  };

  editarPost = (postActualizado) => { 

    const {id} = postActualizado; 
    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { postActualizado })
    .then( resp => {        
        // this.obtenerPosts(); 
        if(resp.status === 200 ) { 

            swal({
                type: "success",
                title: "Tu Dato ha sido ACTUALIZADO correctamente",
                showConfirmButton: true,
                timer: 1500
              });

              
            let postId =  resp.data.id;

            const posts = [...this.state.posts]; // se obtiene copia del post 

            const postEditar = posts.findIndex(post => postId === post.id ); /// aqui se obttiene todos los posts
            /// despues se obtiene el indice  y se pasa los valores a a la varibale del json
            console.log(posts[postEditar]);
            
            posts[postEditar] = postActualizado; /// se actualiza la informacion con los datos en el indice

            this.setState({ 
                posts
            })
        }             
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row justify-content-center">
            <Header />
            <Navegacion />
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return (
                    <Posts
                      posts={this.state.posts}
                      borrarPost={this.borrarPost}
                    />
                  );
                }}
              />

              <Route
                exact
                path="/post/:postId"
                render={props => {
                  let idPost = props.location.pathname.replace("/post/", "");

                  const posts = this.state.posts;

                  let filtro;
                  console.log(idPost);

                  filtro = posts.filter(post => post.id === Number(idPost));

                  return <SinglePost post={filtro[0]} />;
                }}
              />

              <Route
                exact
                path="/crear"
                render={() => {
                  return <Formulario crearPost={this.crearPost} />;
                }}
              />

              <Route
                exact
                path="/editar/:postId"
                render={props => {
                  let idPost = props.location.pathname.replace("/editar/", "");

                  const posts = this.state.posts;

                  let filtro;
                  filtro = posts.filter(post => post.id === Number(idPost));
                  
                  return ( 
                      <Editar
                        post={filtro[0]}
                        editarPost={this.editarPost}
                      />
                  )

                }}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
