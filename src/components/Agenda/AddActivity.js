import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddActivity extends Component {
     state = {
          curriculumactivity: '', 
          manager : '',
          hour : '',
          date : '',
          description : '',
          priority : '',
          state : '',
     }


     createActivity = () => {
        //  toast.success("Holiiiiiiiiiiiiiiiiiiiii")
        const {date, description, hour, id, manager, priority, state, curriculumactivity} = this.state;
        if(date.trim()===''|| description.trim()===''|| hour.trim()===''|| manager.trim()===''|| priority.trim()===''|| state.trim()===''|| curriculumactivity.trim()===''){
             toast.error("Todos los campos son necesarios")
        }else{
             const activity = {
               curriculumactivity: this.state.curriculumactivity, 
               manager : this.state.manager,
               hour : this.state.hour,
               date : this.state.date,
               description :this.state.description,
               priority : this.state.priority,
               state : this.state.state,
             }
          // enviar por props o petición de axios
           axios.post(`http://localhost:3000/activity`,  activity )
          .then(res => {
               if (res.status === 201) {
                    toast(
                         'Actividad Creada',
                         'Se creo correctamente',
                         'success'
                    )
                    let activityId = { id: res.data.id };
                    const nuevoActivity = Object.assign({}, res.data.activity, activityId);

                    this.setState(prevState => ({
                         Activity: [...prevState.activity, nuevoActivity]
                    }))
               }
          }) 
     }}

     onChangeInput = e => {
          let state = e.target.name;
          let value = e.target.value;
          this.setState({[state]: value})
     }

     render() {
          return (
               <div className="m-5">
                    <legend className="text-center">Crear Actividad</legend>
                    <div className="form-group">
                         <label>Titulo Actividad:</label>
                         <input onChange={this.onChangeInput} type="text"  name="curriculumactivity" value={this.state.curriculumactivity} className="form-control" placeholder="Titulo del Actividad" />
                    </div>
                    <div className="form-group">
                         <label>Encargado: </label>
                         <input  onChange={this.onChangeInput} className="form-control" name="manager" value={this.state.manager} placeholder="Encargado..."/>
                    </div>
                    <div className="form-group">
                         <label>Hora: </label>
                         <input onChange={this.onChangeInput} type="time" className="form-control" name="hour" value={this.state.hour} placeholder="Hora..."/>
                    </div>
                    <div className="form-group">
                         <label>fecha: </label>
                         <input onChange={this.onChangeInput} type="date" className="form-control" name="date" value={this.state.date} placeholder="Fecha..."/>
                    </div>
                    <div className="form-group">
                         <label>Descripcion: </label>
                         <textarea onChange={this.onChangeInput} className="form-control" name="description" value={this.state.description} placeholder="Descripcion..."></textarea>
                    </div>
                    <div className="form-group">
                         <label>Prioridad: </label>

                         <select className="form-control">
                                <option value="" disabled defaultValue>Selecione una Prioridad</option>
                                <option onChange={this.onChangeInput} name="priority" className="form-control" value={this.state.priority} >Alta</option>
                                <option onChange={this.onChangeInput} name="priority" className="form-control" value={this.state.priority} >Media</option>
                                <option onChange={this.onChangeInput} name="priority" className="form-control" value={this.state.priority}>Baja</option>
                            </select>
                        {/*  <input onChange={this.onChangeInput} name="priority" className="form-control" value={this.state.priority} placeholder="Prioridad..."/> */}
                    </div>
                    <div className="form-group">
                         <label>Estado: </label>
                         <input onChange={this.onChangeInput} name="state" className="form-control" value={this.state.state} placeholder="Estado..."/>
                    </div>

                    <button onClick={() => this.createActivity()} className="btn btn-primary">Crear</button>
                    <ToastContainer />
               </div>
                    
          );
     }
}

export default AddActivity;