import {Modal, Button, Form} from "react-bootstrap"
import { useNavigate } from "react-router-dom";

export default function ModalEditStatus(props) {

const navigate = useNavigate()

  return (
            <>
            <Modal show={props.show} onHide={props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centere>
            <div className="p-4">
            <Modal.Header closeButton closeVariant="danger">
            <div className="position-absolute top-0 start-0">
                    <img className="position-absolute ms-4 my-auto" src="/images/Land.png" alt="Logo" />
                    <img src="/images/Vector.png" alt="Rectangle" />
                  </div>
            </Modal.Header>      
            <Form className="mt-4">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              className="p-2 mb-3 disableTextInput"
              type="text"
              required
              name="fullname"
              placeholder="1"
              disabled
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Control
              className="p-2 mb-3"
              type="text"
              required
              name="username"
              placeholder="Anto"
              disabled
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Control
              className="p-2 mb-3"
              type="email"
              required
              name="email"
              placeholder="Surabaya - Jakarta"
              disabled
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Control
              className="p-2 mb-3"
              required
              type="password"
              name="password"
              placeholder="Password"
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Control
              className="p-2 mb-3"
              required
              type="number"
              name="phone"
              placeholder="Bca.jpg"
              disabled
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Select className="p-2 mb-3"
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}>
                <option hidden>Approved</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
            </Form.Select>
          </Form.Group>

          <Button onClick={() => {navigate("/adminApprove")}} variant="success" className="fw-bold border-0 w-100 py-2 mt-3" style={{ borderRadius: "50px" }}>
            Edit
          </Button>
        </Form>
        </div>
        </Modal>
    </>
  );
}
