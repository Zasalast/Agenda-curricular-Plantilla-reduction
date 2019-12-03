import React from 'react';
import { connect } from 'react-redux';

const ActividadPrioridadAlta = ({ ActividadesImportates, noprioridadAlta, eliminarActiPrioritaria }) => {

  return (
    <section>
      <h2>ACTIVIDADES PRIORITARIAS</h2>
      <div className="contenedor-juagores">
        <article>
          <table className="table">

            <thead>
              <tbody >  <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Encargado</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>

                <th scope="col">Accion</th>
              </tr>

                {ActividadesImportates.map(activi => (
                  <tr className="actividad-prioritaria" key={activi.id}>
                    <td> {activi.actividadcurricular}</td>
                    <td> {activi.encargado}</td>
                    <td> {activi.fecha}</td>
                    <td> {activi.hora}</td>
                    <td>
                      <button /* to={`/actividad/${id}`} */ className="btn btn-primary">
                        VER
                           </button>
                      <button onClick={() => noprioridadAlta(activi)} className="btn btn-primary">
                        PRIORIDAD +
                           </button>

                      <button /* onClick={this.editarActividad} */ className="btn btn-light">
                        Editar
                           </button>
                      <button onClick={() => eliminarActiPrioritaria(activi)} className="btn btn-danger">
                        ELIMINAR
                           </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </thead>
          </table>
        </article>
      </div>
    </section>
  );

}
const mapStateToProps = (state) => ({
  ActividadesImportates: state.ActividadesImportates
})
const mapDispatchToProps = (dispatch) => ({
  noprioridadAlta(eliminarprio) {
    dispatch({
      type: "ACTIVIDAD_NO_PRIORITARIA",
      eliminarprio
    })
  }, eliminarActiPrioritaria(actividaeli) {
    dispatch({
      type: "ACTIVIDAD_ELIMINAR_PRIORITARIA",
      actividaeli
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ActividadPrioridadAlta)