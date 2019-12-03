import React, { Component } from 'react';
import Page from 'components/Page';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';
export default class AgregarActividad extends Component {
    state = {
        error: false
    }
    nombreActividadRef = React.createRef();
    nombreEncargadoActividadRef = React.createRef();
    fechaActividadRef = React.createRef();
    horaActividadRef = React.createRef();
    DescripciónActividadRef = React.createRef();
    prioridadActividadRef = React.createRef();
    estadoActividadRef = React.createRef();

/*     crearNewActividad = (e) => {
        e.preventDefault();
        const actividadcurricular = this.nombreActividadRef.current.value,
            encargado = this.nombreEncargadoActividadRef.current.value,
            hora = this.horaActividadRef.current.value,
            fecha = this.fechaActividadRef.current.value,
            descripcion = this.DescripciónActividadRef.current.value;
 

        if (actividadcurricular === '' || encargado === '' || hora === '' || fecha === '' || descripcion === ''
          ) {
            this.setState({ error: true })
        } else {

            const nuevaActividad = {
                id: Math.random() * (2000 - 1) + 2,
                actividadcurricular,
                encargado,
                hora,
                fecha,
                descripcion,
      
            }

           
            this.props.crearActividad(nuevaActividad);
            this.setState({ error: false })
        }

    } */


    crearNewActividad = (actividad) => {

        const actividadcurricular = this.nombreActividadRef.current.value,
        encargado = this.nombreEncargadoActividadRef.current.value,
        hora = this.horaActividadRef.current.value,
        fecha = this.fechaActividadRef.current.value,
        descripcion = this.DescripciónActividadRef.current.value;


    if (actividadcurricular === '' || encargado === '' || hora === '' || fecha === '' || descripcion === ''
      ) {
        this.setState({ error: true })
    } else {

        const nuevaActividad = {
           
            actividadcurricular:"Ba333ja",
            encargado:"Ba333333ja",
            hora:"Baja333333",
            fecha:"Baj3333333a",
            descripcion:"Ba33333333ja",
            prioridad:"Ba33333ja",
            estado:false
        }

        axios.actividad(`http://localhost:3001/actividad`, {nuevaActividad})
               .then(res => {
                   if(res.status === 201) {
                    toast(
                           'Actividad Creado',
                           'Se creo correctamente',
                           'success'
                       )
                       let actividadId = {id: res.data.id};
                      const nuevoActividad = Object.assign({}, res.data.actividad, actividadId);
     
                      this.setState(prevState => ({
                        activity: [...prevState.activity, nuevoActividad]
                      }))
                   }
               })
     }}
    render() {
        const existeError = this.state.error;
        return (
            <Page
                title="Actividad"
                breadcrumbs={[{ name: 'Agregar Actividad', active: true }]}
                className="TablePage"
            >
                <form onSubmit={this.crearNewActividad}>

                    <div className="form-group row">

                        <label className="col-sm-4 col-lg-2 col-form-label">Nombre Actividad</label>

                        <div className="col-sm-8 col-lg-10">

                            <input ref={this.nombreActividadRef} type="text" className="form-control" placeholder="Nombre Actividad" />

                        </div>

                    </div>

                    <div className="form-group row">

                        <label className="col-sm-4 col-lg-2 col-form-label">Nombre Encargado</label>

                        <div className="col-sm-8 col-lg-10">

                            <input ref={this.nombreEncargadoActividadRef} type="text" className="form-control" placeholder="Nombre Encargado de Realizar Actividad" />

                        </div>

                    </div>



                    <div className="form-group row">

                        <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>

                        <div className="col-sm-8 col-lg-4  mb-4 mb-lg-0">

                            <input ref={this.fechaActividadRef} type="date" className="form-control" />

                        </div>



                        <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>

                        <div className="col-sm-8 col-lg-4">

                            <input ref={this.horaActividadRef} type="time" className="form-control" />

                        </div>

                    </div>



                    <div className="form-group row">

                        <label className="col-sm-4 col-lg-2 col-form-label">Prioridad</label>

                        <div className="col-sm-8 col-lg-10">
            <select  className="form-control">
            <option   value="" disabled defaultValue>Selecione una Prioridad</option>
            <option ref={this.prioridadActividadRef} value="alta">Alta</option>
            <option ref={this.prioridadActividadRef}  value="media">Media</option>
            <option ref={this.prioridadActividadRef}  value="baja">Baja</option>
            </select>
                        {/*     <textarea ref={this.prioridadActividadRef} className="form-control"></textarea> */}

                        </div>

                    </div>

                    <div className="form-group row">

                        <label className="col-sm-4 col-lg-2 col-form-label">Estado</label>

                        <div className="col-sm-8 col-lg-10">

                            {/* <textarea ref={this.estadoActividadRef} className="form-control"></textarea> */}
                            <select  className="form-control">
            <option  ref={this.estadoActividadRef}   defaultValue="true">Selecione Estado</option>
            <option ref={this.estadoActividadRef} value="alta">En proceso</option>
            <option ref={this.estadoActividadRef}  value="media">Terminada</option>
            <option ref={this.estadoActividadRef}  value="media">Pendiente</option>
            </select>
                        </div>

                    </div>

                    <div className="form-group row">

                        <label className="col-sm-4 col-lg-2 col-form-label">Descripción</label>

                        <div className="col-sm-8 col-lg-10">

                            <textarea ref={this.DescripciónActividadRef} className="form-control"></textarea>

                        </div>

                    </div>

                    <div className="form-group row justify-content-end">

                        <div className="col-sm-3">

                            <button type="submit" className="btn btn-success w-100">Agregar</button>

                        </div>

                    </div>

                </form>
                {existeError ? <div className='alert alert-danger text-center'>
                    Todos los campos son necesarios
                </div> : ''}
            </Page>
        );
    }
}

/* AgregarActividad.propTypes = {
    actividades: PropTypes.array.isRequired,
    eliminarActividad: PropTypes.func.isRequired
} */