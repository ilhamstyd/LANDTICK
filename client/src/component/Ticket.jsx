import { Card,Row,Container,Col } from "react-bootstrap";
import ModalLogin from "./ModalLogin";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import ModalSuccessAddTicket from "./ModalSucsesTicket";
import { API } from "../config/api";
import { useQuery } from "react-query";


const Ticket = ({startStation, endStation, search}) => {

  const [state] = useContext(UserContext);

  
  let {data: tickets, refetch } =
  useQuery("ticketCache", async () => {
    const response = search? (await API.get(`/filter-ticket?startStationId=${startStation}&endStationId=${endStation}`))
    : (await API.get("/tickets"))
    return response.data.data;
  })
  


  const [showLogin, setShowLogin] = useState(false);
  const handleClose = () => {
    setShowLogin(false);
  };

  const [showSuccess, setShowsuccess] = useState(false);
  const handleCloseSuccess = () => {
      setShowsuccess(false);
    };

    const [ID, setID] = useState()

    useEffect(() => {
      refetch();
    }, [search]);
      return(
        <>
        {tickets < 1 ?
        (<h5 className="mt-5 d-flex justify-content-center fw-bold">Admin Has Not Added Tickets</h5>
        ):(
        <>
          {tickets?.map((ticket, index) => (
            <Container className="my-5 shadow" style={{height: "100px", cursor: "pointer" }} onClick={() =>{{state.isLogin === true ? (setShowsuccess(true)):(setShowLogin(true))} ; setID(ticket.id)} } key={index}>
            <Row>
                  <Col md={2}>
                    <h5 className="fw-bold">{ticket.train_name}</h5>
                    <h5 className="text-secondary">{ticket.train_type}</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="fw-bold">{ticket.start_time}</h5>
                    <h5 className="text-secondary">{ticket.start_station.name}</h5>
                  </Col>
                  <Col md={2} className="flex align-items-center justify-content-center">
                    <img src="/images/Arrow.png" alt="" className="" style={{ marginLeft: "0px" }} />
                  </Col>
                  <Col md={2}>
                    <h5 className="fw-bold">{ticket.arrival_time}</h5>
                    <h5 className="text-secondary">{ticket.end_station.name}</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="fw-bold">5j 05m</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="fw-bold text-danger ">{ticket.price}</h5>
                  </Col>
                </Row>
        </Container>
          ))}</>)}
          <ModalLogin show={showLogin} setShow={setShowLogin} onHide={handleClose} />
          <ModalSuccessAddTicket idticket={ID} show={showSuccess} setShow={setShowsuccess} onhide={handleCloseSuccess} />
        
        </>
      )

    
}

export default Ticket;