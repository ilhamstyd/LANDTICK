import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";

export const Payment = () => {

  const param = useParams()
  // let id = parseInt(param.id)
  console.log("INI PARAM PAYMENT :", param.id)

  let {data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get(`/transaction/${param.id}`);
    console.log("ini di payment :",response.data.data)
    return response.data.data;
  })

  const Navigate = useNavigate()

    return (
            <>
                <div className="ms-5 mt-5 d-flex">
                    <div>
                      <h3>Invoice</h3>
                      <div className="">
                        <Card style={{ background: "#EEEEEE", width: "630px", height: "110px" }}>
                          <div className="d-flex pt-4">
                              <img className="ms-2" src="/images/error.png" alt="" />
                              <p>Silakan melakukan pembayaran memalui M-Banking, E-Banking dan ATM Ke No.rek Yang Tertera.</p>
                          </div>
                        </Card>
                        <Card style={{ marginTop: "24px", width: "630px", height: "110px" }}>
                          <div>
                            <img className="position-absolute ms-4 my-auto" src="/images/Land.png" alt="Logo" />
                            <img src="/images/Vector.png" alt="Rectangle" />
                          </div>
                          <div>
                            <table class="mt-5 border-1 border-dark w-100">
                              <thead>
                                <tr className="border-bottom border-2">
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
                                  <td className="text-secondary">{transaction?.user?.id}</td>
                                  <td className="text-secondary">{transaction?.user?.fullname}</td>
                                  <td className="text-secondary">{transaction?.user?.phone}</td>
                                  <td className="text-secondary">{transaction?.user?.email}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </Card>
                        <div className="d-flex mt-3">
                          <div className="mt-5">
                            <h4>Rincian Harga</h4>
                            <Card style={{ width: "400px", height: "130px" }}>
                              <div className="d-flex my-auto justify-content-between">
                                <h5 className="ms-5">
                                 (Adult) x 1
                                </h5>
                                <h5 className="me-5">{transaction?.ticket?.price}</h5>
                              </div>
                              <div className="d-flex justify-content-between" style={{ background: "#E6E6E6" }}>
                                <h5 className="ms-5 mt-2">Total</h5>
                                <h5 className="fw-bold me-5 mt-2">{transaction?.ticket?.price}</h5>
                              </div>
                            </Card>
                            <Button
                              type="submit"
                              variant="outline-light"
                              className="fw-bold mt-3 mb-5"
                              style={{ width: "400px", height: "auto", background: "linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)" }}
                              onClick={() => Navigate("/my-ticket/{transaction?.ID}")}
                            >Bayar Sekarang
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ms-3 mt-5" style={{ background: "#F5F5F5", width: "447px", height: "414px" }}>
                      <div style={{ background: "#D0D0D0", width: "447px", height: "115px" }}>
                        <div className="d-flex justify-content-between">
                          <div className="mt-3 ms-4">
                            <h3 className="fw-bold">Kereta Api</h3>
                            <div className="d-flex mt-2"><p className="fw-bold text-secondary">Saturday</p> <p className="text-secondary">,{transaction?.ticket?.start_date}</p></div>
                          </div>
                          <div className="mt-4 me-3">
                            <img src="/images/Barcode.png" alt="" />
                            <p>INV0101</p>
                          </div>
                        </div>
                      </div>
                      <div className="ms-4 mt-3">
                        <div>
                          <h3 className="fw-bold">{transaction?.ticket?.train_name}</h3>
                          <p className="text-secondary">{transaction?.ticket?.train_type}</p>
                        </div>
                        <div className="d-flex">
                          <div className="mt-5">
                            <div className="rounded-circle" style={{ width: "16px", height: "16px", border: "2px solid #EC7AB7" }}></div>
                            <div className="ms-2 mt-3 border-start border-2" style={{ width: "0px", height: "50px" }}></div>
                            <div className="rounded-circle mt-3" style={{ width: "16px", height: "16px", backgroundColor: "#EC7AB7" }}></div>
                          </div>
                          <div className="ms-4 mt-4">
                            <div>
                              <h5 className="fw-semibold">{transaction?.ticket?.start_time}</h5>
                              <p className="text-secondary">{transaction?.ticket?.start_date}</p>
                            </div>
                            <div className="mt-5">
                              <h5 className="fw-semibold">{transaction?.ticket?.arrival_time}</h5>
                              <p className="text-secondary">{transaction?.ticket?.start_date}</p>
                            </div>
                          </div>
                          <div className="ms-4 mt-4">
                            <div>
                              <h5 className="fw-semibold">{transaction?.ticket?.start_station.kota}</h5>
                              <p className="text-secondary">{transaction?.ticket?.start_station.name}</p>
                            </div>
                            <div className="mt-5">
                              <h5 className="fw-semibold">{transaction?.ticket?.end_station.kota}</h5>
                              <p className="text-secondary">{transaction?.ticket?.end_station.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </>
      );
}