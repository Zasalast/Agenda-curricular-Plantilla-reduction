import React, { Component } from 'react';
import PropTypes from 'utils/propTypes';


import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody, CardDeck, Progress } from 'reactstrap';

import Todos, { propTypes as TodosPropTypes } from 'components/Todos';

import Typography from '../Typography';
class SingleActividad extends Component {
     mostrarActivity = (props) => {
          if (!props.activity) return null;
          const { date, description, hour, id, manager, priority, state, curriculumactivity } = this.props.activity;
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
                    {this.mostrarActivity(this.props)}
               </div>
          );
     }
}

export default SingleActividad;