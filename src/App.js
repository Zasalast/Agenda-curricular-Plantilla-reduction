import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import AgregarActividad from './components/Agenda/AgregarActividad';
/* import ActividadPrioridadAlta from 'components/Agenda/ActividadPrioridadAlta'; */
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import SingleActividad from './components/Agenda/SingleActividad';
/* import swal from 'sweetalert2'; */
const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
/* const CardPage = React.lazy(() => import('pages/CardPage')); */
/* const ChartPage = React.lazy(() => import('pages/ChartPage')); */
/* const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage')); */
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
/* const ProgressPage = React.lazy(() => import('pages/ProgressPage')); */
const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
/* const WidgetPage = React.lazy(() => import('pages/WidgetPage')); */

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  state = {
    activity: []
  }

  getDataAgenda() {
    axios.get(`http://localhost:3000/activity/`)
      .then(res => {
        this.setState({ activity: [...res.data] })
      })
      .catch(error => console.error(error))
  }

  async componentDidMount() {
    this.getDataAgenda()
  }
  /* 
    state = { 
      actividades: []
  }
  componentDidMount() {
       this.obtenerActividad();
  }
  
  obtenerActividad = () => {
      axios.get(`http://localhost:3001/actividad`)
           .then(res => {
                this.setState({
                     actividades: res.data
                })
           })
  }
  
  borrarActividad = (id) => {
      axios.delete(`http://localhost:3001/actividad/${id}`)
           .then(res=>{
                if(res.status === 200) {
                     const actividades = [...this.state.actividades];
                     
                     let resultado = actividades.filter(actividad => (
                      actividad.id != id
                     ));
                     this.setState({
                      actividades: resultado
                     })
                }
           })
  }
  
  crearActividad = (actividad) => {
     axios.actividad(`http://localhost:3001/actividad`, {actividad})
            .then(res => {
                if(res.status === 201) {
                    swal(
                        'Actividad Creado',
                        'Se creo correctamente',
                        'success'
                    )
                    let actividadId = {id: res.data.id};
                   const nuevoActividad = Object.assign({}, res.data.actividad, actividadId);
  
                   this.setState(prevState => ({
                      actividades: [...prevState.actividades, nuevoActividad]
                   }))
                }
            })
  }
  
  editarActividad = (actividadActualizado) => {
    //  console.log(actividadActualizado);
  
     const {id} = actividadActualizado;
  
     axios.put(`http://localhost:3001/actividad/${id}`, {actividadActualizado})
        .then(res => {
            if(res.status === 200) {
  
                swal(
                    'actividad Actualizado',
                    'Se guardó correctamente',
                    'success'
                )
  
                let actividadId = res.data.id;
  
                const actividades = [...this.state.actividades];
  
                const actividadEditar = actividades.findIndex(actividad => actividadId === actividad.id );
  
                actividades[actividadEditar] = actividadActualizado;
  
                this.setState({
                  actividades
                })
            }
        })
  } */

  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                {/* <Route exact path="/" component={DashboardPage} /> */}
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                {/*  <Route exact path="/cards" component={CardPage} /> */}
                {/*    <Route exact path="/widgets" component={WidgetPage} /> */}
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                {/*  <Route exact path="/tables" component={TablePage} /> */}
                <Route exact path="/tables" render={() => {
                  return (
                    <TablePage activity={this.state.activity}
                    />
                  )
                }}
                />

               {/*  <Route exact path="/actividad/:actividadId" render={(props) => {
                    let idActividad = props.location.pathname.replace('/actividad/', '');
                    const activities = this.state.activity;
                    console.log(idActividad)
                    console.log(activities)
                  let filtro;
                  filtro = activities.filter(activi => (
                    activi.id ==idActividad
                  ))
                  console.log(filtro[0])
                  return (
                   <SingleActividad
                   id={idActividad}
                   activity={filtro[0]}
                    /> 
                  )
                }
                }
                /> */}
                
                <Route exact path="/badges" component={BadgePage} />
                <Route exact path="/activity" component={SingleActividad} />
                <Route
                  exact
                  path="/button-groups"
                  component={ButtonGroupPage}
                />
                {/*    <Route exact path="/dropdowns" component={DropdownPage} /> */}
                {/* <Route exact path="/progress" component={ProgressPage} /> */}
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/agregaractividad" component={AgregarActividad} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                {/*  <Route exact path="/charts" component={ChartPage} /> */}
                <Route exact path="/home" component={TablePage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
