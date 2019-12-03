import React, { Component } from 'react';
class SingleActividad extends Component {
     mostrarPost = (props) => {
          if(!props.activity) return null;
          const {fecha,idActividad } = this.props.activity;

          return (
               <React.Fragment>
                    <h1>{fecha}</h1>
                    . d.
               </React.Fragment>
          )
     }

     render() { 

          return ( 
               <div className="col-12 col-md-8">
                 { this.props.activity.map(person => <li>{person.fecha}</li>)}
           {console.log("ssssssssssssss")}
               </div>
          );
     }
}
 
export default SingleActividad;