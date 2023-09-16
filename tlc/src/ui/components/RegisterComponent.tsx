// RegisterComponent.tsx

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { Form as FormField } from "react-bootstrap";

import { Usuario } from "../../interfaces/user";
import { useRegister } from "../../services/useRegister";
import { ModalPolicysComponent } from "./ModalPolicys";

interface RegisterComponentProps {
  onSuccess?: () => void;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("email no válido").required("Requerido"),
  password: Yup.string()
    .min(6, "¡Muy corto!")
    .max(50, "¡Muy largo!")
    .required("Requerido"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "no coinciden")
    .required("Requerido"),
  privacyPolicy: Yup.boolean()
    .required("Debes estar de acuerdo antes de enviar.")
    .oneOf([true], "Debes estar de acuerdo antes de enviar."),
});

export const RegisterComponent: React.FC<RegisterComponentProps> = ({
  onSuccess,
}) => {
  const { register, error } = useRegister();
  const [showModalPolicys, setShowModalPolicys] = useState(false);

  const handlePolicysClick = () => {
    setShowModalPolicys(true);
  };

  const handlePolicysClose = () => {
    setShowModalPolicys(false);
  };

  const handleSubmit = async (values: Usuario) => {
    const success = await register(values);

    if (success) {
      onSuccess?.();
      window.location.reload();
    } else {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <>
      <div className="globals forms">
        <h3>Crea tu cuenta</h3>
        <p className="grey-text middle sans-serif mb-5">
          Si todavía no tienes una cuenta, crea una ahora!
        </p>
        <Formik
          initialValues={{
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolicy: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormField.Group className="mb-3">
                <div className="flex-form-group">
                  <div>
                    <FormField.Label>Email address</FormField.Label>
                  </div>
                  <div className="form-errors">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <Field
                  name="email"
                  type="email"
                  as={FormField.Control}
                  placeholder="Introduce tu email"
                />
              </FormField.Group>

              <FormField.Group className="mb-3">
                <div className="flex-form-group">
                  <div>
                    <FormField.Label>Contraseña</FormField.Label>
                  </div>
                  <div className="form-errors">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <Field
                  name="password"
                  type="password"
                  as={FormField.Control}
                  placeholder="Introduce tu contraseña"
                />
              </FormField.Group>

              <FormField.Group className="mb-3">
                <div className="flex-form-group">
                  <div>
                    <FormField.Label>Repite contraseña</FormField.Label>
                  </div>
                  <div className="form-errors">
                    <ErrorMessage name="repeatPassword" />
                  </div>
                </div>
                <Field
                  name="repeatPassword"
                  type="password"
                  as={FormField.Control}
                  placeholder="Repite contraseña"
                />
              </FormField.Group>

              <FormField.Group className="mb-3 small sans-serif">
                <div className="d-flex align-items-left ">
                  <Field
                    className="me-1"
                    name="privacyPolicy"
                    type="checkbox"
                    as={FormField.Check}
                    label="Acepto las"
                  />
                  <a
                    onClick={handlePolicysClick}
                    className="ml-3 link-no-a"
                    style={{ cursor: "pointer" }}
                  >
                    políticas de privacidad
                  </a>
                </div>
                <div className="form-errors">
                  <ErrorMessage name="privacyPolicy" />
                </div>
              </FormField.Group>

              <Button
                variant="primary"
                className="button-primary-form"
                type="submit"
                disabled={isSubmitting}
              >
                Crear cuenta
              </Button>
            </Form>
          )}
        </Formik>
        <ModalPolicysComponent
          show={showModalPolicys}
          onHide={handlePolicysClose}
        />
      </div>
    </>
  );
};
