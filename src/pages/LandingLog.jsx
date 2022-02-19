import React, { useState } from "react";
import Form from '../components/Form'
import "../assets/css/NavBarHome/styles.scss";
import { ValidateForm } from "../utils/ValidateForm";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignIn } from "../FilesStore/Actions/index";
import axios from "axios";
import { URL_BACK } from "../config";


const LandingOwner = (role) => {
  console.log(role)
  const history = useHistory();
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({});


  const [inputForm, setInputForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inputPassword: "",
    confirmPassword: "",
    role: "Client",
  });

  const clear = () => {
    setInputForm({
      firstName: "",
      lastName: "",
      email: "",
      inputPassword: "",
      confirmPassword: "",
      role: role,
    });
  };

  const inputFormHanlder = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors(ValidateForm({ ...inputForm, [name]: value }));
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (!inputForm.email.trim().length) {
      return message.error("Colocar Email");
    }
    if (!inputForm.inputPassword.trim().length) {
      return message.error("Colocar Contraseña");
    }
    if (formErrors.email || formErrors.inputPassword)
      return message.error("Error con los datos");

    const userSignIn = {
      email: inputForm.email,
      inputPassword: inputForm.inputPassword,
      role: role,
    };

    dispatch(SignIn(userSignIn, history));
    clear();
  };

  const forgotPasswordHandler = async () => {
    if (!inputForm.email.trim().length) return message.info("Colocar email");
    console.log(inputForm.email);
    axios
      .post(`${URL_BACK}/user/confirm-update-password`, { email: inputForm.email })
      .then(() => {
        message.success("Correo enviado");
      })
      .catch((error) => {
        console.log(error.response.data, "aca");
        message.error(error.response.data.message);
      });
  };

  return (
    <div>
      {

        role !== "Admin" ?
          <Form role={role} google={false} />
          : (
            <div id="registro" className="containerForm">
              <form className="content-form">
                <div className={`ingreso-container`}>
                  <h2>Ingresar</h2>
                  <div>
                    <input
                      type="text"
                      name="email"
                      placeholder="E-mail"
                      value={inputForm.email}
                      onChange={inputFormHanlder}
                    />
                    <p className="error-message">
                      {formErrors.email ? formErrors.email : "ㅤㅤ"}
                    </p>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      name="inputPassword"
                      value={inputForm.inputPassword}
                      onChange={inputFormHanlder}
                    />
                    <p className="error-message">
                      {formErrors.inputPassword ? formErrors.inputPassword : "ㅤㅤ"}
                    </p>
                  </div>
                  <p onClick={forgotPasswordHandler}>¿Olvidaste la contraseña?</p>
                  <button onClick={loginHandler}>Ingresar</button>
                </div>
              </form>
            </div >
          )
      }
    </div>
  )
}

export default LandingOwner