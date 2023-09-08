import { RefObject, FunctionComponent, useState } from "react";
import { Usuario } from "../interfaces";
import { useDataProfileProcessor } from "teloc-hooks";

interface ModalWindowProps {
  closeModal: () => void;
  modalRef: RefObject<HTMLDivElement>;
  identUser: string;
}

const ModalWindowFillData: FunctionComponent<ModalWindowProps> = ({
  closeModal,
  modalRef,
  identUser,
}) => {
  const initialState = {
    firstName: "",
    lastName: "",
    address: {
      street: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
    },
  };

  const { processData } = useDataProfileProcessor();
  const [values, setValues] = useState(initialState); // Utilizamos useState para el estado
  const [formProcessed, setFormProcessed] = useState(false); // Utilizamos useState para el estado
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    general?: string;
  }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validatedData = {
      identUser,
      ...values,
    };
    try {
      const processed = await processData(validatedData);
      if (processed) {
        console.log("ssssssssssssssssssss");
        setFormProcessed(true);
        window.location.reload();
      }
    } catch (error) {
      console.error("Hubo un error al procesar los datos:", error);
      setErrors({ ...errors, general: "Hubo un error al procesar los datos." });
    }
  };

  const isFormValid = () => {
    return values.firstName.trim() !== "" && values.lastName.trim() !== "";
  };

  return (
    <div className="dashboard modal fade" tabIndex={-1} ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered dashboard__modal-dialog">
        <div className="modal-content">
          <div className="modal-body p-5">
            <div className="row">
              <div className="col-md-12 mb-4">
                <h3 className="mb-3">¿Quién eres?</h3>
                <p>Antes de continuar, nos gustaría saber tu nombre.</p>
                <p>
                  El resto de datos puedes rellenarlos más tarde si lo deseas.
                </p>
              </div>
            </div>
            <div className="row" id="left">
              <div className="col-md-12 dashboard__formulario">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Primera columna */}
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="firstName">Nombre*</label>
                        <input
                          type="text"
                          placeholder="Nombre"
                          name="firstName"
                          className="form-control"
                          value={values.firstName}
                          onChange={handleChange}
                        />
                        {errors.firstName && (
                          <div className="error-text">{errors.firstName}</div>
                        )}
                      </div>
                      <div>
                        <hr />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="street">Calle</label>
                        <input
                          type="text"
                          placeholder="Calle"
                          name="street"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-4">
                        <div className="d-flex justify-content-start">
                          <div className="w-25 me-3">
                            <label htmlFor="street">Código Postal</label>
                            <input
                              type="text"
                              placeholder="Código Postal"
                              name="postalCode"
                              className="w-100 form-control"
                            />
                          </div>
                          <div className="w-75">
                            <label htmlFor="street">Ciudad</label>
                            <input
                              type="text"
                              placeholder="Ciudad"
                              name="city"
                              className="w-100 form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Segunda columna */}
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="lastName">Apellidos*</label>
                        <input
                          type="text"
                          placeholder="Apellido"
                          name="lastName"
                          className="form-control"
                          value={values.lastName}
                          onChange={handleChange}
                        />
                        {errors.lastName && (
                          <div className="error-text">{errors.lastName}</div>
                        )}
                      </div>
                      <div>
                        <hr />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="state">Estado</label>
                        <input
                          type="text"
                          placeholder="Estado"
                          name="state"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="country">País</label>
                        <input
                          type="text"
                          placeholder="País"
                          name="country"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <button type="submit" disabled={!isFormValid()}>
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowFillData;
