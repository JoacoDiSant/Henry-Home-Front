import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/DashboardUser/DashboardUser.scss";
import Loading from "../components/Loading";
import { getUserDetail } from "../FilesStore/Actions";
import defaultUser from '../assets/img/user_default.png'
import Cards from '../components/Cards'
import { Button } from 'antd'
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import { URL_BACK } from '../config'

function DashboardUser() {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const { userDetail } = useSelector((state) => state);
  const dispatch = useDispatch()
  console.log(userDetail)
  const [actualizar, setActualizar] = useState(1)
  const actualiza = ()=>{
    setActualizar(actualizar+1)
  }

  const deleteReservation= id => {
    axios.delete(`${URL_BACK}/reservation/${id}`)
    .then(res=>{
      dispatch(getUserDetail(user.result.id, user.result.role))
      console.log(res)
    })
    .catch(err=>console.log(err))
  }

  useEffect(() => {
    dispatch(getUserDetail(user.result.id, user.result.role))
  }, [dispatch, user.result.id, user.result.role, actualizar]);

  if (!userDetail) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="Container-General">
        
        <div>
          <div className="DashboardUser-userInfo">
            <h1>Información General</h1>
            <img src={userDetail.imageUrl || defaultUser} alt="" />
            <p>Nombre: {`${userDetail.firstName} ${userDetail.lastName}`}</p>
            <p>Email: {`${userDetail.email}`}</p>
            <p>Rol: {userDetail.role}</p>
          </div>
          <div className="Container-Favs">
            <h1 className="DashboardUser-section-Title" id="Favs-hotels">
              Hoteles Favoritos
            </h1>
            <div className="Favs-Cards">
              {userDetail.favs.length === 0 ? (
                <div>{`No Tienes Hotel Favorito :(`}</div>
              ) : (
                <div>
                  {userDetail.favs.map((f) => {
                    return (
                      <Cards
                        name={f.name}
                        key={f.id}
                        id={f.id}
                        img={f.images}
                        price={f.pricePerNight}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="Container-Reservs">
            <h1 className="DashboardUser-section-Title">
              Ultimas reservaciones
            </h1>
            <div className="Last-reservs">
                {!userDetail.Reservations ? (
                  <div>{`No Tienes Reservaciones Previas :(`}</div>
                ) : (
                  <table className="DashboardUser_reservationInfo" >
                    <thead>
                      <tr>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetail.Reservations.map((f) => {
                        return (
                          <tr key={f.id}>
                            <td>{f.date_start}</td>
                            <td>{f.date_end}</td>
                            <td>{f.status}</td>
                            <td><a href={f.link_mercado_pago} target='_blank' rel="noreferrer">Pagar</a><Button type="text" onClick={()=>deleteReservation(f.id)}><strong>Eliminar</strong></Button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
            </div>
          </div>
            
        </div>
            <div className="reviews-container">
              <h3>Tus reseñas: </h3>
                {userDetail?.Reviews?.length ? userDetail.Reviews.map((e)=><ReviewCard actualizar={actualiza} review={e} dash={true} token={user.token} />) 
                : <p> Aun no has redactado ninguna reseña </p>}
            </div>
      </div>
    );
  }
}
// 
export default DashboardUser;
