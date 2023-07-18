import { Modal, ModalHeader } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";

export default function ModalTicketDetailAdmin(props) {
  console.log("ini props iddetail :", props.id);
  let { data: transaction } = useQuery(
    "admindetailtransactionCache",
    async () => {
      const response = await API.get(`transaction/${props.id}`);
      console.log("ini detail :", response);
      return response.data.data;
    } 
    // jika kamu pusing  dengan codingan maka hapus saja codemu sekarang
    );

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader closeButton className="row">
          <div className="position-absolute top-0 start-0">
            <img
              className="position-absolute ms-4 my-auto"
              src="/images/Land.png"
              alt="Logo"
            />
            <img src="/images/Vector.png" alt="Rectangle" />
          </div>
          <h1 className="col mt-4">
            INVOICE{" "}
            <p className="col text-secondary fw-semibold fs-6">
              kode Invoice : INV0101
            </p>
          </h1>
        </ModalHeader>
          <Modal.Body>
            <div className="d-flex">
              <div>
                <div className="d-flex mt-2 gap-5">
                  <div>
                    <h4 className="fw-bold mt-0">Kereta Api</h4>
                    <p className="text-secondary">23, Februari 2023</p>
                  </div>
                  <div className="">
                    <img src="/images/Barcode.png" alt="" />
                    <p>TCK0101</p>
                  </div>
                </div>
                <div>
                  <div>
                    <h4 className="fw-bold">
                      {transaction?.ticket.train_name}
                    </h4>
                    <p>{transaction?.ticket.train_type}</p>
                  </div>
                  <div className="d-flex">
                    <div className="mt-5">
                      <div
                        className="rounded-circle"
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid #EC7AB7",
                        }}
                      ></div>
                      <div
                        className="ms-2 mt-3 border-start border-2"
                        style={{ width: "0px", height: "50px" }}
                      ></div>
                      <div
                        className="rounded-circle mt-3"
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "#EC7AB7",
                        }}
                      ></div>
                    </div>
                    <div className="ms-3 mt-4">
                      <div>
                        <h5 className="fw-bold">
                          {transaction?.ticket.start_time}
                        </h5>
                        <h5 className="text-secondary">
                          {transaction?.ticket.start_date}
                        </h5>
                      </div>
                      <div className="mt-5">
                        <h5 className="fw-bold">
                          {transaction?.ticket.arrival_time}
                        </h5>
                        <h5 className="text-secondary">
                          {transaction?.ticket.start_date}
                        </h5>
                      </div>
                    </div>
                    <div className="ms-5 mt-4">
                      <div>
                        <h5 className="fw-bold">
                          {transaction?.ticket.start_station.kota}
                        </h5>
                        <h5 className="text-secondary">
                          {transaction?.ticket.start_station.name}
                        </h5>
                      </div>
                      <div className="mt-5">
                        <h5 className="fw-bold">
                          {transaction?.ticket.end_station.kota}
                        </h5>
                        <h5 className="text-secondary">
                          {transaction?.ticket.start_station.name}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-100 mt-5">
              <table class="mt-3 border-top border-bottom border-1 border-dark w-100">
                <thead>
                  <tr>
                    <th>No. Tanda Pengenal</th>
                    <th>Nama Pemesan</th>
                    <th>No. Handphone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="text-secondary">{transaction?.user.id}</td>
                    <td className="text-secondary">
                      {transaction?.user.fullname}
                    </td>
                    <td className="text-secondary">
                      {transaction?.user.phone}
                    </td>
                    <td className="text-secondary">
                      {transaction?.user.email}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-3" style={{ background: "#E6E6E6" }}>
              <div className="d-flex justify-content-between align-items-center py-3">
                <h5 className="ms-3 mb-0 fw-bold">Total</h5>
                <h5 className="me-3 mb-0 text-danger fw-bold">
                  {transaction?.ticket.price}
                </h5>
              </div>
            </div>
          </Modal.Body>
      </Modal>
    </>
  );
}
