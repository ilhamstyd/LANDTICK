import { Card } from "react-bootstrap";
import { API } from "../config/api";
import { useQuery } from "react-query";

export default function MyTicket() {
  let { data: transaction } = useQuery("mytransactionCache", async () => {
    const response = await API.get("/transaction-client");
    console.log("coba :", response.data.data);
    return response.data.data;
  });

  return (
    <>
      <Card className="mt-2 rounded-none shadow-none border-0 ml-20 me-3">
        <h2 className="fw-bold ms-5">My Ticket</h2>

        {transaction?.map((transactions, index) => (
          <>
            <Card
              className="ms-5 mt-3"
              style={{ width: "1035px", height: "344px" }}
              key={index}
            >
              <div>
                <div>
                  <img
                    className="position-absolute ms-4 my-auto"
                    src="/images/Land.png"
                    alt="Logo"
                  />
                  <img src="/images/Vector.png" alt="Rectangle" />
                </div>
                <div
                  className="position-absolute text-center"
                  style={{ marginLeft: "770px" }}
                >
                  <h3 className="">Kereta Api</h3>
                  <p className="fs-5 fw-semibold text-secondary">
                    sabtu, 21 Februari 2022
                  </p>
                  <img className=" mt-3" src="/images/Barcode.png" alt="" />
                  <p className="mt-3">INV0101</p>
                </div>
                <div className="d-flex">
                  <div>
                    <h1 className="ms-5 mt-5 fw-bold">
                      {transactions.ticket.train_name}
                    </h1>
                    <h5 className="ms-5 mt-3">
                      {transactions.ticket.train_type}
                    </h5>
                    {transactions.status === "pending" ? (
                      <div
                        className="font-size-14px text-center rounded ms-5 mt-3"
                        style={{
                          width: "69px",
                          height: "24px",
                          color: "#FF9900",
                          backgroundColor: "rgba(255,153,0,0.125)",
                        }}
                      >
                        <p>{transactions.status}</p>
                      </div>
                    ) : (
                      <div
                        className="font-size-14px text-center rounded ms-5 mt-3"
                        style={{
                          width: "69px",
                          height: "24px",
                          color: "#78A85A",
                          backgroundColor: "rgba(120,168,90,0.125)",
                        }}
                      >
                        <p>{transactions.status}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 ms-5">
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
                        {transactions.ticket.start_time}
                      </h5>
                      <h5 className="text-secondary">
                        {transactions.ticket.start_date}
                      </h5>
                    </div>
                    <div className="mt-5">
                      <h5 className="fw-bold">
                        {transactions.ticket.arrival_time}
                      </h5>
                      <h5 className="text-secondary">
                        {transactions.ticket.start_date}
                      </h5>
                    </div>
                  </div>
                  <div className="ms-5 mt-4">
                    <div>
                      <h5 className="fw-bold">
                        {transactions.ticket.start_station_id.kota}
                      </h5>
                      <h5 className="text-secondary">
                        {transactions.ticket.start_station_id.name}
                      </h5>
                    </div>
                    <div className="mt-5">
                      <h5 className="fw-bold">
                        {transactions.ticket.start_station_id.kota}
                      </h5>
                      <h5 className="text-secondary">
                        {transactions.ticket.start_station_id.name}
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="row ms-3 mt-4 border-1 border-dark">
                  <p className="col col-sm-2">No. Tanda Pengenal</p>
                  <p className="col col-sm-4">Nama Pemesan</p>
                  <p className="col col-sm-2">No. Handphone</p>
                  <p className="col col-sm-4">Email</p>
                  <hr></hr>
                </div>
                <div className="row ms-4 text-secondary">
                  <p className="col col-sm-2">{transactions.user.id}</p>
                  <p className="col col-sm-4">{transactions.user.fullname}</p>
                  <p className="col col-sm-2">{transactions.user.phone}</p>
                  <p className="col col-sm-4">{transactions.user.email}</p>
                </div>
              </div>
            </Card>
          </>
        ))}
      </Card>
    </>
  );
}
