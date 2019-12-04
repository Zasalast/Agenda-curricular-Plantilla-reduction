import React, { Component } from 'react'; import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Page from 'components/Page';
import {Link} from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
const tableTypes = ['Prioritario', 'Importante', 'Sin Prioridad'];

class TablePage extends Component {
constructor(props){
  super(props);
  this.state = {
    activity:this.props.activity
  };
  
}
 /*  state = {
    actividades: []
  } */

/*   getDataAgenda() {
    axios.get(`http://localhost:3000/actividad`)
      .then(res => {
        this.setState({ actividades: [...res.data] })
      })
      .catch(error => console.error(error))
  }

  async componentDidMount() {
    this.getDataAgenda()
  } */
  prioridadAlta =(index) =>{
    console.log(index);
  }
  verActividad =(index) =>{
    console.log(index);
  }
  handleClick = (e) =>{
    axios.delete(`http://localhost:3000/activity/${e}`)
    .then(res=>{
         if(res.status === 200) {
              const activity = [...this.props.activity];
              console.log("eliminando")
              let resultado = activity.filter(actividad => (
               actividad.id != e
              ));
              this.setState({
                activity: resultado
              })
         }
    })
  }



  
  deleteactivity = (id) => {
    axios.delete(`http://localhost:3000/activity/${id}`)
         .then(res=>{
           console.log(res.status)
              if(res.status === 200) {
                   const activity = [...this.state.activity];
                   
                   let resultado = activity.filter(actividad => (
                    actividad.id != id
                   ));
                   this.setState({
                    activity: resultado
                   })
              }
         })
}



  renderHeaderTable() {
    return (
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Encargado</th>
        <th scope="col">Fecha</th>
        <th scope="col">Hora</th>
        <th scope="col">Prioridad</th>
        <th scope="col">Estado</th>
        <th scope="col">Ver</th>
        <th scope="col">Editar</th>
        <th scope="col">Eliminar</th>
        <th scope="col">+ Prioridad</th>
      </tr>
    );
  }







  render() {
    return (
      <Page
        title="Agenda"
        breadcrumbs={[{ name: 'Actividades', active: true }]}
        className="TablePage"
      >
        {tableTypes.map((tableType, inde) => (
          <Row key={inde}>
            <Row  >
              <Col>
                <Card className="mb-3">
                  <CardHeader>{tableType || 'default'}</CardHeader>
                  <CardBody>
                    {this.renderHeaderTable()}

                    {this.props.activity.map((activity, index) => {
                       console.log(this.props.activity)
                        const {curriculumactivity,manager, date,hour, priority, state, id } = activity;
                        return (
                          <tr className="actividad" key={index} >
                            <td>{curriculumactivity} {/* {activi.actividadcurricular} */}</td>
                            <td>{manager} {/*  {activi.encargado} */}</td>
                            <td>{date} {/* {activi.fecha} */}</td>
                            <td>{hour} </td>
                            <td>{priority} {/* {activi.hora} */}</td>
                            <td>{state} {/* {activi.hora} */}</td>
                            <td>
                              <Link to={{pathname:'/activity',state:{data: activity}}}  className="btn btn-primary">
                                VER
                            </Link>
                            </td>
                            <td>
                              <button /* onClick={this.editarActividad} */ class="btn btn-warning"  >
                                Editar
                                  </button> </td>
                            <td>
                              <button   onClick={() => this.deleteactivity(id)}    className="btn btn-danger">
                                ELIMINAR
                                  </button> </td>
                            <td>  <button  class="btn btn-outline-danger">
                              PRIORIDAD +++
                                      </button>
                            </td>
                          </tr>)

                      })
                    }

                  </CardBody>
                </Card>
              </Col>   </Row>

          </Row>
        ))}
      </Page>
    );
  }
}

export default TablePage;