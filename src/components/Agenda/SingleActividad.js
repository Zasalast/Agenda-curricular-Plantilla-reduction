import React, { Component } from 'react';
import PropTypes from 'utils/propTypes';


import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody, CardDeck, Progress } from 'reactstrap';

import Todos, { propTypes as TodosPropTypes } from 'components/Todos';

import Typography from '../Typography';
class SingleActividad extends Component {
     
state={
     activity:null
}


     componentDidMount(){
          const{data} = this.props.location.state;
          this.setState({activity: data}, () => console.log(this.state.activity))
     
     }
     
     mostrarActivity = () => {
          const { date, description, hour, id, manager, priority, state, curriculumactivity } = this.state.activity;
          return (
               <div className="cr-content">
                    <Card  >
                         <h1>Actividad Curricular</h1>
                         <div className="position-relative">
                              <CardImgOverlay   >
                                   <p>  {id}</p>
                                   <CardTitle  > <h2> {curriculumactivity}</h2>
                                   </CardTitle>
                                   <CardText  >{description} </CardText>

                                   < CardText  >{date}</CardText>

                                   <CardText  > {manager}</CardText >
                                   <CardText  > {priority}</CardText>
                                   <CardText  >  {hour}</CardText>
                                   <CardText  >   {state}</CardText>

                              </CardImgOverlay>
                         </div>

                    </Card> 
               </div>

          )
     }

     render() {
          return (
               <div>
                    { this.state.activity && this.mostrarActivity(this.props)} 
                    hola
               </div>
          );
     }
}

export default SingleActividad;