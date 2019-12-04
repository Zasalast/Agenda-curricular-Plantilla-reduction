import React, { Component } from 'react';
import Page from 'components/Page';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
/* import PropTypes from 'prop-types'; */
export default class AgregarActividad extends Component {
    state = {
        error: false
    }
    curriculumactivityRef = React.createRef();
    managerActividadRef = React.createRef();
    hourActividadRef = React.createRef();
    dateActividadRef = React.createRef();
    descriptionActividadRef = React.createRef();
    priorityActividadRef = React.createRef();
    stateActividadRef = React.createRef();
    crearNewActividad = (actividad) => {
        const curriculumactivity = this.curriculumactivityRef.current.value,
            manager = this.nombremanagerActividadRef.current.value,
            hour = this.hourActividadRef.current.value,
            date = this.dateActividadRef.current.value,
            description = this.descriptionActividadRef.current.value,
        priority = this.priorityActividadRef.current.value,
        state = this.stateActividadRef.current.value;

        if (curriculumactivity === '' || manager === '' || hour === '' || date === '' || description === '') {
            this.setState({ error: true })
        } else {

            const nuevaActividad = {
                curriculumactivity,
                manager,
                hour,
                date,
                description,
                priority: "Baja",
                state: false
            }

            axios.actividad(`http://localhost:3001/activity`, { nuevaActividad })
                .then(res => {
                    if (res.status === 201) {
                        toast(
                            'Actividad Creado',
                            'Se creo correctamente',
                            'success'
                        )
                        let actividadId = { id: res.data.id };
                        const nuevoActividad = Object.assign({}, res.data.actividad, actividadId);

                        this.setState(prevState => ({
                            activity: [...prevState.activity, nuevoActividad]
                        }))
                    }
                })
        }
    }
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
                            <input ref={this.curriculumactivityRef} type="text" className="form-control" placeholder="Nombre Actividad" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Nombre Encargado</label>
                        <div className="col-sm-8 col-lg-10">
                            <input ref={this.nombremanagerActividadRef} type="text" className="form-control" placeholder="Nombre Encargado de Realizar Actividad" />
                        </div>
                    </div>



                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
                        <div className="col-sm-8 col-lg-4  mb-4 mb-lg-0">
                            <input ref={this.dateActividadRef} type="date" className="form-control" />
                        </div>



                        <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
                        <div className="col-sm-8 col-lg-4">
                            <input ref={this.hourActividadRef} type="time" className="form-control" />
                        </div>
                    </div>



                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Prioridad</label>
                        <div className="col-sm-8 col-lg-10">
                            <select className="form-control">
                                <option value="" disabled defaultValue>Selecione una Prioridad</option>
                                <option ref={this.priorityActividadRef} value="alta">Alta</option>
                                <option ref={this.priorityActividadRef} value="media">Media</option>
                                <option ref={this.priorityActividadRef} value="baja">Baja</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Estado</label>
                        <div className="col-sm-8 col-lg-10">
                            <select className="form-control">
                                <option ref={this.stateActividadRef} defaultValue="true">Selecione Estado</option>
                                <option ref={this.stateActividadRef} value="proceso">En proceso</option>
                                <option ref={this.stateActividadRef} value="terminada">Terminada</option>
                                <option ref={this.stateActividadRef} value="pendiente">Pendiente</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Descripción</label>
                        <div className="col-sm-8 col-lg-10">
                            <textarea ref={this.descriptionActividadRef} className="form-control" placeholder="Descripción..."></textarea>
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
