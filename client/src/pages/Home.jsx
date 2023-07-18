import Jumbotron from "../component/Jumbotron";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Ticket from "../component/Ticket";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2"

export default function Home() {

  const [stations, setStations] = useState([])
  const [form, setForm] = useState({
    start_station_id:'',
    end_station_id:'',
  });

  const [filteredTickets, setFilteredTickets] = useState([]);

  const getStations = async () => {
    try {
      const response = await API.get('/stations');
      setStations(response.data.data.stations);
    } catch (error) {
      console.log(error);
    }
  };
    const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const [search, setSearch] = useState(false)

const handleClick = (e) => {
  e.preventDefault()
  form.start_station_id==''&& form.end_station_id==''? setSearch(false) : setSearch(true)
}

  useEffect(() => {
    getStations()
  }, []);
  
return(
<>
    <Jumbotron/>
    <div className="d-flex" style={{ background: "#FFFFFF", marginTop: "-40px", boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)", marginLeft: "60px", borderRadius: "5px" }}>
        <div className="d-flex" style={{ background: "#F2F2F2", width: "284px", height: "236px", borderRadius: "5px" }}>
          <div className="mt-4" style={{ background: "#E67E22", width: "9px", height: "53px" }}></div>
          <div className="d-flex mt-4" style={{ background: "#FFFFFF", width: "284px", height: "53px" }}>
            <img className="items-center my-auto" src="/images/Icon.png" alt="" style={{ width: "30px", height: "30px" }} />
            <h5 className="items-center ms-3 my-auto">Tiket Kereta Api</h5>
          </div>
        </div>
        <div className="ms-3 mt-2">
          <form id="ticket-search-form">
            <h4>Tiket Kereta Api</h4>
            <div className="d-flex">
              <div style={{ width: "350px" }}>
                <h5>Asal</h5>
                <div className="">
                  <Form.Select aria-label="Default select example"
                  name="start_station_id"
                  value={form.start_station_id}
                  onChange={handleChange}>
                  <option hidden>Stasiun Keberangkatan</option>
                  {stations.map((item, index) =>(
                    <option key={index} value={item.ID}>
                      {item.name}
                    </option>
                  ))}
                  </Form.Select>
                </div>

                <div className="d-flex">
                  <h5 className="mt-3">Tanggal Berangkat</h5>
                  <div className="d-flex">
                    <Form.Group className="ms-5 mt-3 fw-bold" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Pulang Pergi" />
                    </Form.Group>
                  </div>
                </div>
                <Form.Control className="mt-2"
                type="date" id="departure_date"
                name="start_date"
                // value={form.start_date}
                onChange={handleChange}
                style={{ width: "138px", height: "30px" }} />

              </div>

              <div>
                <img className="mt-4 ms-3" src="/images/switch.png" alt="" style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="ms-3" style={{ width: "350px"}}>
                <h5>Tujuan</h5>
                <div className="">
                  <Form.Select aria-label="Default select example"
                  name="end_station_id"
                  value={form.end_station_id}
                  onChange={handleChange}>

                    <option hidden>Stasiun Tujuan</option>
                    {stations.map((item) =>(
                      <option key={item.ID} value={item.ID}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className="d-flex mt-3">
                  <div>
                    <h5 className="">Dewasa</h5>
                    <Form.Select aria-label="Default select example" name="qty" style={{ width: "116px", height: "auto" }}>
                      <option value="0" hidden>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </div>
                  <div className="ms-3">
                    <h5>Bayi</h5>
                    <Form.Select aria-label="Default select example" name="anak" style={{ width: "116px", height: "auto" }}>
                      <option value hidden="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </div>
                  <div style={{marginTop:"5px"}}>
                  <Button
                    type="submit"
                    className="ms-2 p-0 px-1 rounded mt-4"
                    onClick={handleClick}
                    style={{ background: "linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)", height:"40px", width:"100%"}}>
                    Cari Ticket
                  </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Container className="mt-4">
        <Row className="fs-5">
            <Col md={2}>Nama Kereta</Col>
            <Col md={2}>Berangkat</Col>
            <Col md={2} className="text-white">Jeda</Col>
            <Col md={2}>Tiba</Col>
            <Col md={2}>Durasi</Col>
            <Col md={2}>Harga Per Orang</Col>
        </Row>
      </Container>
      <Ticket startStation={form.start_station_id} endStation={form.end_station_id} search={search}/>
</>
)
}