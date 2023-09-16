import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { countries } from "../../core/domain/";
import { Form, ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Form as FormField, Row, Col, Button } from "react-bootstrap";

import { useUserData } from "../../services/useUserData";

interface Props {
  identificador: unknown;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  postalCode: Yup.string(),
  country: Yup.string(),
});

export const ModalFillData: React.FC<Props> = ({ identificador }) => {
  const [cities, setCities] = useState<string[]>([]);

  const ident = identificador as string | undefined;
  const { updateUser } = useUserData(ident);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryId = event.target.value;
    const countryInfo = countries.countries.find(
      (country) => country.identifier === selectedCountryId
    );

    if (countryInfo) {
      setCities(countryInfo.cities);
    } else {
      setCities([]);
    }
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    const transformedValues = {
      ...values,
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        country: values.country,
      },
    };

    updateUser.mutate(transformedValues, {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.error("Hubo un error al actualizar:", error.message);
        } else {
          console.error("Hubo un error al actualizar:", error);
        }
        setSubmitting(false);
      },
      onSuccess: (data: any) => {
        console.log(data);
        setSubmitting(false);
      },
    });
  };

  return (
    <Modal
      show={true}
      className="forms"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header className="custom-close-button"></Modal.Header>
      <Modal.Body>
        <h1>Nos gustaría saber tu nombre!</h1>
        <p className="grey-text">
          Introduce tu nombre para que sepamos a quién dirigirnos.
        </p>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <div className="row mt-4">
                <div className="col-md-12">
                  <Row className="mb-3">
                    <Col md={6} sm={12}>
                      <FormField.Group controlId="firstName">
                        <div className="flex-form-group">
                          <div>
                            <FormField.Label>First Name*</FormField.Label>
                          </div>
                          <div className="form-errors">
                            <ErrorMessage name="firstName" />
                          </div>
                        </div>
                        <Field
                          name="firstName"
                          type="text"
                          as={FormField.Control}
                          placeholder="Tu nombre (obligatorio)"
                        />
                      </FormField.Group>
                    </Col>

                    <Col md={6} sm={12}>
                      <FormField.Group controlId="lastName">
                        <FormField.Label>Last Name</FormField.Label>
                        <Field
                          name="lastName"
                          type="text"
                          as={FormField.Control}
                          placeholder="Tus apellidos (NO obligatorio)"
                        />
                      </FormField.Group>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <hr />
                  <p className="small grey-text">
                    No es obligatorio, pero si lo deseas, puedes rellenar
                    también esta información
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <Row className="mb-3">
                    <Col md={6} sm={12}>
                      <FormField.Group controlId="state">
                        <FormField.Label>State</FormField.Label>
                        <Field
                          name="state"
                          type="text"
                          as={FormField.Control}
                          placeholder="Enter state"
                        />
                      </FormField.Group>
                    </Col>
                    <Col md={6} sm={12}>
                      <FormField.Group controlId="country">
                        <FormField.Label>Country</FormField.Label>
                        <FormField.Select
                          aria-label="Select country"
                          name="country"
                          onChange={(e) => {
                            handleChange(e);
                            handleCountryChange(e);
                          }}
                          value={values.country}
                        >
                          <option value="">Select a country</option>
                          <option value="UK">UK</option>
                          <option value="France">France</option>
                          <option value="Italy">Italy</option>
                          <option value="España">España</option>
                          <option value="Portugal">Portugal</option>
                        </FormField.Select>
                      </FormField.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6} sm={12}>
                      <FormField.Group controlId="street">
                        <FormField.Label>Street</FormField.Label>
                        <Field
                          name="street"
                          type="text"
                          as={FormField.Control}
                          placeholder="Enter street"
                        />
                      </FormField.Group>
                    </Col>
                    <Col md={6} sm={12}>
                      <Row>
                        <Col xs={4}>
                          <FormField.Group controlId="postalCode">
                            <FormField.Label>Postal code</FormField.Label>
                            <Field
                              name="postalCode"
                              type="text"
                              as={FormField.Control}
                              placeholder="Enter postal code"
                            />
                          </FormField.Group>
                        </Col>
                        <Col xs={8}>
                          <FormField.Group controlId="city">
                            <FormField.Label>City</FormField.Label>
                            <FormField.Select
                              aria-label="Select city"
                              name="city"
                              onChange={handleChange}
                              value={values.city}
                            >
                              <option value="">Select a city</option>
                              {cities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </FormField.Select>
                          </FormField.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 d-flex justify-content-center">
                  <Button
                    disabled={isSubmitting}
                    variant="primary"
                    type="submit"
                    className="button-primary-form-md"
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
