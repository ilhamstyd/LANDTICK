import React, {useState} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import{ useMutation} from 'react-query';
import { API } from "../config/api";
import Swal from "sweetalert2"

 const ModalRegister = (props) => {

  const title = 'Landtick';
  document.title = 'ilham | ' + title;
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullname: '',
    username:'',
    email: '',
    password: '',
    phone:'',
  });

  const { fullname, username, email, password, phone } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/register', form);

      console.log("register success : ", response)

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setForm({
        fullname: '',
        username:'',
        email: '',
        password: '',
        phone:'',
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Register Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("register failed : ", error);
    }
    props.onHide()
  });

   
  return (
    <>
    <Modal show={props.show} onHide={props.onHide} centered>
      <div className="px-5 pb-3">
        <p className="fs-3 fw-bold text-center" style={{ color: "#EC7AB7", paddingTop: 45 }}>
          Register
        </p>
        {message && message}
        <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              className="p-2 mb-3"
              placeholder="Fullname"
              type="text"
              name="fullname"
              onChange={handleChange}
              value={fullname}
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
              required
              />
              </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Control
              className="p-2 mb-3"
              type="text"
              name="username"
              onChange={handleChange}
              value={username}
              placeholder="Username"
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
              required
              />
              </Form.Group>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Control
              className="p-2 mb-3"
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="Email"
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
                required
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Control
              className="p-2 mb-3"
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              placeholder="Password"
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
                required
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Control
              className="p-2 mb-3"
              type="number"
              name="phone"
              onChange={handleChange}
              value={phone}
              placeholder="Phone"
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
              required
            />
            </Form.Group>

          <Button type="submit" className="fw-bold border-0 w-100 py-2 mt-3" style={{ background: "linear-gradient(180deg, #EC7AB7 0%, #EC7A7A 100%)", borderRadius: "50px" }}>
            Register
          </Button>
        </Form>

        <p className="text-center mt-3">
          Sudah Punya Akun ? Klik {" "}
          <span onClick={props.onClick} className="fw-bold" style={{ cursor: "pointer" }}>
            Disini
          </span>
        </p>
      </div>
    </Modal>
    </>
  );
};

export default ModalRegister;
