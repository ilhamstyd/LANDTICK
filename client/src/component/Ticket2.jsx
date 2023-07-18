import { Row,Container,Col } from "react-bootstrap";
import ModalSuccessAddTicket from "./ModalSucsesTicket";
import { useState } from "react";
import { useNavigate } from "react-router";

const Ticket = () => {

    let navigate = useNavigate();

    //Modal Sucsess AddTicket
    const [showSuccess, setShowsuccess] = useState(false);
    const handleCloseSuccess = () => {
        setShowsuccess(false);
        navigate("/myticketpending")
      };
    
      const popSuccess = () => {
        setShowsuccess(true);
      };

    return(
        <>
        <Container className="my-5 shadow" style={{height: "100px", cursor: "pointer" }} onClick={popSuccess}>
            <Row>
                  <Col md={2}>
                    <h5 className="fw-bold">Argo Wills</h5>
                    <h5 className="text-secondary">Ekonomi</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="fw-bold">05.00</h5>
                    <h5 className="text-secondary">Gambir</h5>
                  </Col>
                  <Col md={2} className="flex align-items-center justify-content-center">
                    <img src="/images/Arrow.png" alt="" className="" style={{ marginLeft: "0px" }} />
                  </Col>
                  <Col md={2}>
                    <h5 className="fw-bold">10.05</h5>
                    <h5 className="text-secondary">Surabaya</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="fw-bold">5j 05m</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="fw-bold text-danger ">Rp.250.000</h5>
                  </Col>
                </Row>
        </Container>
        <ModalSuccessAddTicket show={showSuccess} onHide={handleCloseSuccess} handleSuccess={popSuccess} />
        </>
    )
}

export default Ticket;