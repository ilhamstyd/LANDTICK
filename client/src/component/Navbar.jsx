import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from "react-query";
import { API, setAuthToken } from '../config/api';
import Swal from "sweetalert2"
import {Container, Nav, Navbar, NavDropdown, Button, NavLink} from 'react-bootstrap';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import { UserContext } from '../UserContext/UserContext';
import Profile from "../assets/image/blank-profile.png";
import Logout from "../assets/image/Logout.png";
import IconAddTicket from "../assets/image/more.png";
import IconPayment from "../assets/image/bill.png";
import Ticket from "../assets/image/Ticket.png";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function Navigationbar(props) {

  const param = useParams()
  let id = parseInt(param.id)
  
  const Navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleShowLogin = () => {
    handleClose(true);
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    handleClose(true);
    setShowRegister(true);
  };

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
    Navigate("/");
    // window.location.reload();
  };

  return (
    <>
      <Navbar
        className=""
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.25)",
          height: "60px",
        }}
      >
        <Container>
          <Link to="/"><Navbar.Brand href="/">
            <img src="/images/LandTick.png" alt="LandTick" />
            <img className="ms-2" src="/images/Logo.png" alt="Logo LandTick" />
          </Navbar.Brand></Link>
          <Navbar.Collapse id="">
            {state.isLogin === true ? (
              state.user.role === "admin" ? (
                <Nav className="ms-auto gap-3">
                  <h5
                    className="fw-bold "
                    style={{ color: "#EC7A7A", marginTop: "20px" }}
                  >{state.user.username}</h5>
                  <NavDropdown
                    align="end"
                    id="dropdown"
                    title={
                      <img
                        src={Profile}
                        alt=""
                        className="rounded-circle "
                        style={{
                          cursor: "pointer",
                          objectFit: "cover",
                          width: "50px",
                          height: "50px",}}/>}>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                      <NavDropdown.Item className="d-flex align-items-center">
                      <img src={IconAddTicket} alt="" />
                      <Link to="/AddTicket" className='text-decoration-none text-dark'><span className="ms-3 fw-bold">Add Ticket</span></Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                    <NavDropdown.Item
                      className="d-flex align-items-center"
                      onClick={logout}>
                      <img src={Logout} style={{ width: "40px" }} alt="" />
                      <span className="ms-3 fw-bold">Logout</span>
                    </NavDropdown.Item> 
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav className="ms-auto gap-2">
                  <h5
                    className="fw-bold "
                    style={{ color: "#EC7A7A", marginTop: "20px" }}>Hallo,{state.user.username}</h5>
                  <NavDropdown
                    id="dropdown"
                    title={
                      <img
                        src={Profile}
                        alt=""
                        className="rounded-circle   "
                        style={{
                          cursor: "pointer",
                          objectFit: "cover",
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    }>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                   <NavDropdown.Item> <Link to="/my-ticket" className='text-decoration-none text-black'>
                      <img
                        src={Ticket}
                        alt=""
                        style={{ width: 40, height: 38.17}}
                      />
                      <span className="ms-2 fw-bold">My Ticket</span>
                      </Link></NavDropdown.Item>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                    <NavDropdown.Item onClick={logout}>
                      <img
                        src={Logout}
                        alt=""
                        style={{ width: 40, height: 38.17 }}
                      />
                      <span className="ms-2 fw-bold">Logout</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )
            ) : (
              <Nav className="ms-auto gap-3">
                <NavLink className="text-decoration-none">
                  <Button
                    size="sm"
                    className="fw-bold d-flex justify-content-center align-items-center"
                    variant="outline-light"
                    onClick={handleShowRegister}
                    style={{
                      border: "2px solid #EC7AB7",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "white",
                      width: "112px",
                      height: "40px",
                    }}>Register</Button>
                </NavLink>
                <NavLink className="text-decoration-none">
                  <Button
                    size="sm"
                    className="fw-bold"
                    href=""
                    style={{
                      background:
                        "linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "white",
                      width: "112px",
                      height: "40px",
                    }}
                    variant="outline-light"
                    onClick={handleShowLogin}
                  >
                    Login
                  </Button>
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin
        show={showLogin}
        onHide={handleClose}
        onClick={handleShowRegister}
      />
      <ModalRegister
        show={showRegister}
        onHide={handleClose}
        onClick={handleShowLogin}
      />
    </>
  );
  // return (
  //   <>
  //     <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
  //       <Container>
  //         <Navbar.Brand href="#home" style={{ height: '3.75rem' }}>
  //           <Link to="/">
  //             <img src="/images/LandTick.png" alt="LandTick" />
  //             <img className="ms-2" src="/images/Logo.png" alt="Logo LandTick" />
  //           </Link>
  //         </Navbar.Brand>
  //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //         <Navbar.Collapse id="responsive-navbar-nav">
  //           <Nav className="me-auto" />
  //           <Nav>
  //             {isLogin ? (
  //               <>
  //                 {isAdmin ? (
  //                   <Nav className="me-5">
  //                     <h5 className="mt-3 text-secondary"></h5>
  //                     <NavDropdown
  //                       title={
  //                         <img
  //                           src={Profile}
  //                           alt=""
  //                           className="rounded-circle me-3"
  //                           style={{
  //                             cursor: 'pointer',
  //                             objectFit: 'cover',
  //                             width: '50px',
  //                             height: '50px',
  //                           }}
  //                         />
  //                       }
  //                     >
  //                       <Link to="/AddTicket" className="text-decoration-none text-dark">
  //                         <NavDropdown.Item className="d-flex align-items-center" href="/admin-add-ticket">
  //                           <img src={IconAddTicket} alt="" />
  //                           <span className="ms-3 fw-bold">Add Ticket</span>
  //                         </NavDropdown.Item>
  //                       </Link>
  //                       <NavDropdown.Divider />
  //                       <Link to="/" className="text-decoration-none text-dark">
  //                         <NavDropdown.Item className="d-flex align-items-center" onClick={handleLogout}>
  //                           <img src={Logout} alt="" />
  //                           <span className="ms-3 fw-bold">Logout</span>
  //                         </NavDropdown.Item>
  //                       </Link>
  //                     </NavDropdown>
  //                   </Nav>
  //                 ) : (
  //                   <Nav className="me-5">
  //                     <h5 className="mt-3">{emailLogin}</h5>
  //                     <NavDropdown
  //                       title={
  //                         <img
  //                           src={Profile}
  //                           alt=""
  //                           className="rounded-circle"
  //                           style={{
  //                             cursor: 'pointer',
  //                             objectFit: 'cover',
  //                             width: '50px',
  //                             height: '50px',
  //                           }}
  //                         />
  //                       }
  //                     >
  //                       <NavDropdown.Divider style={{ background: '#EC7AB7' }} />
  //                       <NavDropdown.Item href="/my-ticket-approve">
  //                         <Link to="/my-ticket" className="text-decoration-none text-dark">
  //                           <img src={Ticket} alt="" style={{ width: 40, height: 38.17 }} />
  //                           <span className="ms-2 fw-bold">My Ticket</span>
  //                         </Link>
  //                       </NavDropdown.Item>
  //                       <NavDropdown.Divider style={{ background: '#EC7AB7' }} />
  //                       <NavDropdown.Item>
  //                         <Link to="/payment" className="text-decoration-none text-dark">
  //                           <img src={IconPayment} alt="" style={{ width: 40, height: 38.17 }} />
  //                           <span className="ms-2 fw-bold">Payment</span>
  //                         </Link>
  //                       </NavDropdown.Item>
  //                       <NavDropdown.Divider style={{ background: '#EC7AB7' }} />
  //                       <NavDropdown.Item onClick={handleLogout}>
  //                         <Link to="/" className="text-decoration-none text-dark">
  //                           <img src={Logout} alt="" style={{ width: 40, height: 38.17 }} />
  //                           <span className="ms-2 fw-bold">Logout</span>
  //                         </Link>
  //                       </NavDropdown.Item>
  //                     </NavDropdown>
  //                   </Nav>
  //                 )}
  //               </>
  //             ) : (
  //               <>
  //                 <Nav.Link>
  //                   <Button
  //                     href=""
  //                     style={{
  //                       background: 'linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)',
  //                       fontSize: 19,
  //                       fontWeight: 600,
  //                       color: 'white',
  //                       width: '100px',
  //                       height: '40px',
  //                     }}
  //                     variant="outline-light"
  //                     onClick={handleShowLogin}
  //                   >
  //                     Login
  //                   </Button>
  //                 </Nav.Link>
  //                 <Nav.Link>
  //                   <Button
  //                     href=""
  //                     style={{
  //                       background: 'linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)',
  //                       fontSize: 19,
  //                       fontWeight: 600,
  //                       color: 'white',
  //                       width: '100px',
  //                       height: '40px',
  //                     }}
  //                     variant="outline-light"
  //                     onClick={handleShowRegister}
  //                   >
  //                     Register
  //                   </Button>
  //                 </Nav.Link>
  //               </>
  //             )}
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>
  //     <ModalLogin show={showLogin} onHide={handleClose} onClick={handleShowRegister} />
  //     <ModalRegister show={showRegister} onHide={handleClose} onClick={handleShowLogin} />
  //   </>
  // );
}

export default Navigationbar;