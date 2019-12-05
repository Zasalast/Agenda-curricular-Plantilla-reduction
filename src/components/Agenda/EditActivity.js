import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import PropTypes from 'utils/propTypes';


import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody, CardDeck, Progress } from 'reactstrap';

import Todos, { propTypes as TodosPropTypes } from 'components/Todos';

import Typography from '../Typography';

class EditActivity extends Component {

     state = {
          // activity: null,
          curriculumactivity: '',
          manager: '',
          hour: '',
          date: '',
          description: '',
          prioritySelected: null,
          stateSelected: null,
     }


     componentDidMount() {
          const { data } = this.props.location.state;
          console.log(data);
const{ curriculumactivity,
     manager,
     hour,
     date,
     description,
     priority,
     state}=data;


// curriculumactivity: data.curriculumactivity,
//                manager: data.manager,
//                hour: data.hour,
//                date: data.date,
//                description: data.description,
//                prioritySelected: data.priority,
//                stateSelected: data.state, 
          this.setState({    
               curriculumactivity,
               manager,
               hour,
               date,
               description,
               prioritySelected:priority,
               stateSelected:state,
          })

     }
  
     createActivity = () => {
          const { date, description, hour,   manager, priority, state, curriculumactivity } = this.state;
          const {  id  } = this.state.activity;
          if (date.trim() === '' || description.trim() === '' || hour.trim() === '' || manager.trim() === '' || priority === null || state === null || curriculumactivity.trim() === '') {
               toast.error("Todos los campos son necesarios")
          } else {
               const activityUpdate = {
                    id:"6",
                    curriculumactivity: "Muerte metodos",
                    manager: "Adios elio",
                    hour: "4:30",
                    date: "2012-03-04",
                    description: "Actualizando",
                    priority: "Altaa",
                    state: "1",
               }
               console.log("activityUpdate"); console.log(activityUpdate);
               // enviar por props o petición de axios
              console.log("id"); console.log(this.state.activity.id);
               // const {id} = activityUpdate;
               axios.put(`http://localhost:3000/activity`, activityUpdate)
                  .then(res => {
                      if(res.status === 200) {
                           console.log(res.data);
                         toast(
                              'actividad Actualizado',
                              'Se guardó correctamente',
                              'success'
                          )
                          let activityId = res.data.id;
                          const activity = [...this.state.activity];
                          const activityEdit = activity.findIndex(actividad => activityId === actividad.id );
                          activity[activityEdit] = activityUpdate;
                          this.setState({
                              activity
                          })
                      }
                  }).catch(console.log)
          }
     }

     editActivity = () => {

          const staties = [
               { defaultValue: 'Proceso', label: 'Proceso' },
               { defaultValue: 'Terminado', label: 'Terminado' },
               { defaultValue: 'Pendiente', label: 'Pendiente' }
          ]
          const priorities = [
               { defaultValue: 'Alto', label: 'Alto' },
               { defaultValue: 'Medio', label: 'Medio' },
               { defaultValue: 'Bajo', label: 'Bajo' }
          ]
          const { date, description, hour, id, manager, priority, state, curriculumactivity } = this.state.activity;
          return (
               <div className="cr-content">
                  
                         <h1>Actividad Curricular</h1>
                         <div className="position-relative">
                              <div   >
                              <div className="form-group">
                            <input onChange={this.onChangeInput} type="text" name="curriculumactivity" value= {id}   className="form-control" />
                                  
                              </div>
                                 
                                   <div className="form-group">                                  <label>Titulo Actividad:</label>
                                        <input onChange={this.onChangeInput} type="text" name="curriculumactivity" defaultValue={curriculumactivity} className="form-control" />
                                   </div>
                                   <div className="form-group">
                                        <label>Encargado:</label>
                                        <input onChange={this.onChangeInput} type="text" name="manager" value={manager}     className="form-control" />
                                   </div>
                                   <div className="form-group">
                                        <label>Fecha :</label>
                                        <input onChange={this.onChangeInput} type="text" name="date" defaultValue={date} className="form-control" />
                                   </div>
                                   <div className="form-group">
                                        <label> Hora:</label>
                                        <input onChange={this.onChangeInput} type="text" name="hour" defaultValue={hour}  className="form-control" />
                                   </div>
                                   <div className="form-group">
                                        <label> Descripción:</label>
                                        <input onChange={this.onChangeInput} type="text" name="description" defaultValue={description} className="form-control" />
                                   </div>
                                   <div className="form-group">
                                        <label> Prioridad:</label>
                                        <Select onChange={this.onChangePrority} name="priority" options={priorities} defaultValue={this.state.priority} />
                  
                                        {/* <input onChange={this.onChangeInput} type="text" name="priority" defaultValue={priority} className="form-control" /> */}
                                   </div>
                                   <div className="form-group">
                                        <label> Estado:</label>
                                        {/* <input onChange={this.onChangeInput} type="text" name="state" defaultValue={state} className="form-control" /> */}
                                        <Select onChange={this.onChangeState} name="state" options={staties} defaultValue={this.state.state} />

                                   </div>


                              </div>
                         </div>

                         <div className="form-group">
                         <button onClick={() => this.createActivity()} className="btn btn-primary">Editar</button>
                         <ToastContainer />
                    </div> 
               </div>

          )
     }
     onChangeState = item => this.setState({ 
          stateSelected: item.defaultValue
      })
     
     onChangePrority = item => this.setState({ 
          prioritySelected: item.defaultValue
     })


     onChangeInput = e => {
          let state = e.target.name;
          let value = e.target.defaultValue;
          this.setState({ [state]: value })
     }

     render() {
        

          return (
               <div>
                    {this.state.activity && this.editActivity(this.props)}
                   
               </div>
          );
     }
}

export default EditActivity;