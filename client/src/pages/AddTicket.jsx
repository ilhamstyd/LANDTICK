import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../config/api";
import { useMutation } from "react-query";
import Swal from "sweetalert2"

export const AddTicket = () => {
  const Navigate = useNavigate()

  const [stations, setStations]= useState([])
  const [form, setForm] = useState({
    train_name: '',
    train_type: '',
    start_date: '',
    start_station_id: '',
    start_time: '',
    end_station_id: '',
    arrival_time: '',
    price: '',
    stock: '',
  });

  console.log(form);
  // Fetching category data
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
  
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("train_name", form.train_name);
      formData.set("train_type", form.train_type);
      formData.set("start_date", form.start_date);
      formData.set("start_time", form.start_time);
      formData.set("start_station_id", form.start_station_id);
      formData.set("end_station_id", form.end_station_id);
      formData.set("arrival_time", form.arrival_time);
      formData.set("price", form.price);
      formData.set("stock", form.stock);
      console.log(form.end_station_id);
      console.log(form.start_station_id);
      
      const response = await API.post("/ticket", formData);
      console.log("add ticket success", response)
      
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil Menambahkan Ticket Baru!",
          showConfirmButton: false,
          timer: 1500,
        });
        setForm({
          train_name: "",
          train_type: "",
          start_date: "",
          start_station_id: "",
          start_time: "",
          end_station_id: "",
          arrival_time: "",
          price: "",
          stock: "",
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Gagal Menambahkan Ticket Baru!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });
  
  useEffect(() => {
    getStations()
  }, []);
    return(
        <>
        <div className="container mt-5">
        <h1 className="fw-bold">Add Ticket</h1>
        <Form className="mt-5" onSubmit={(e) => {handleSubmit.mutate(e)}}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="train_name"
              placeholder="Nama Kereta"
              onChange={handleChange}
              value={form.train_name}
            />
          </Form.Group>

          <Form.Select
            className="mb-3"
            name="train_type"
            value={form.train_type}
            aria-label="Default select example"
            onChange={handleChange}
            required={true}
          >
            <option hidden>Jenis Kereta</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Bisnis">Bisnis</option>
            <option value="Eksekutif">Eksekutif</option>
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Control
              type="date"
              name="start_date"
              placeholder="Tanggal Keberangkatan"
              onChange={handleChange}
              value={form.start_date}
            />
          </Form.Group>

          <Form.Select className="mb-3"
            aria-label="Default select example"
            value={form.start_station_id}
            name="start_station_id"
            onChange={handleChange}
            >


            <option hidden>Stasiun Keberangkatan</option>
            {stations.map((item, index) =>(
              <option key={index} value={item.ID}>
                {item.name}
              </option>
            ))}
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="start_time"
              onChange={handleChange}
              value={form.start_time}
              placeholder="Jam Keberangkatan"
            />
          </Form.Group>

          <Form.Select className="mb-3"
            aria-label="Default select example"
            name="end_station_id"
            value={form.end_station_id}
            onChange={handleChange}
            >


            <option hidden>Stasiun Tujuan</option>
            {stations.map((item) =>(
              <option key={item.ID} value={item.ID}>
                {item.name}
              </option>
            ))}
          </Form.Select>


          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="arrival_time"
              onChange={handleChange}
              value={form.arrival_time}
              placeholder="Jam Tiba"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              onChange={handleChange}
              value={form.price}
              name="price"
              placeholder="Harga Ticket"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              onChange={handleChange}
              value={form.stock}
              name="stock"
              placeholder="qty"
            />
          </Form.Group>

          <Button
            className="mt-5"
            variant="outline-light fw-bold"
            type="submit"  
            style={{
              width: "535px",
              height: "50px",
              background: "#0ACF83",
              marginLeft: "282px"}}>Save</Button>
        </Form>
      </div>
        </>
    )
}