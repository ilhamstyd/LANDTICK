import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

export const MyTicketPending = () => {
  const navigate = useNavigate();

  const param = useParams();
  console.log("INI DETAIL TICKET :", param.id);

  const handleBuy = async (id) => {
    try {
      const response = await API.get(`/transaction/${id}`);
      // navigate(`/payment/${param.id}`);
      console.log("test :", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  let { data: transaction } = useQuery("transactioneCache", async () => {
    const response = await API.get(`/transaction-client`);
    console.log("myticketpending", response.data.data);
    return response.data.data;
  });

  return (
    <>
      <Card className="mt-2 rounded-none shadow-none border-0 ml-20 me-3">
        <h3 className="fw-semibold ms-5 mt-3">Tiket Saya</h3>
        {transaction?.map((transactions, index) => (
          <>
            <Card
              className="ms-5 mt-3"
              style={{ width: "1035px", height: "344px" }}
              key={index}
            >
              <div>
                <img
                  className="position-absolute ms-4 my-auto"
                  src="/images/Land.png"
                  alt="Logo"
                />
                <img src="/images/Vector.png" alt="Rectangle" />
              </div>
              <div
                className="position-absolute text-end"
                style={{ marginLeft: "820px" }}
              >
                <h3 className="">Kereta Api</h3>
                <p className=" fw-semibold text-secondary">
                  sabtu, 21 Februari 2022
                </p>
                {transactions?.status === "success" ? (
                <>
                <img className=" mt-3" src="/images/Barcode.png" alt="" />
                <p className="mt-3">INV0101</p>
                </>
                ) : (
                <p></p>
                )}
              </div>

              <div className="d-flex">
                <div>
                  <h1 className="ms-5 mt-5 fw-bold">
                    {transactions?.ticket.train_name}
                  </h1>
                  <h5 className="ms-5 mt-3">
                    {transactions?.ticket.train_type}
                  </h5>

                  {transactions?.status === "pending" ? (
                    <div
                      className="font-size-14px text-center rounded ms-5 mt-3"
                      style={{
                        width: "69px",
                        height: "24px",
                        color: "#FF9900",
                        backgroundColor: "rgba(255,153,0,0.125)",
                      }}
                    >
                      <p>{transactions?.status}</p>
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
                      <p>{transactions?.status}</p>
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
                      {transactions?.ticket.start_time}
                    </h5>
                    <h5 className="text-secondary">
                      {transactions?.ticket.start_date}
                    </h5>
                  </div>
                  <div className="mt-5">
                    <h5 className="fw-bold">
                      {transactions?.ticket.arrival_time}
                    </h5>
                    <h5 className="text-secondary">
                      {transactions?.ticket.start_date}
                    </h5>
                  </div>
                </div>
                <div className="ms-5 mt-4">
                  <div>
                    <h5 className="fw-bold">
                      {transactions?.ticket.start_station.kota}
                    </h5>
                    <h5 className="text-secondary">
                      {transactions?.ticket.start_station.name}
                    </h5>
                  </div>
                  <div className="mt-5">
                    <h5 className="fw-bold">
                      {transactions?.ticket.end_station.kota}
                    </h5>
                    <h5 className="text-secondary">
                      {transactions?.ticket.end_station.name}
                    </h5>
                  </div>
                </div>
              </div>

              <div className=" mt-3 ">
                <div class="row ms-3 border-1 border-dark">
                  <p className="col col-sm-2">No. Tanda Pengenal</p>
                  <p className="col col-sm-2">Nama Pemesan</p>
                  <p className="col col-sm-2">No. Handphone</p>
                  <p className="col col-sm-2">Email</p>
                  <p className="col col-sm-4"></p>
                  <hr></hr>
                </div>
                <div className="row ms-4 mb-2 text-secondary">
                  <p className="col col-sm-2">{transactions?.user.id}</p>
                  <p className="col col-sm-2">{transactions?.user.username}</p>
                  <p className="col col-sm-2">{transactions?.user.phone}</p>
                  <p className="col col-sm-2">{transactions?.user.email}</p>
                  <div className="col col-sm-4 mb-3 bg-danger">
                    {transactions?.status === "pending" ? (
                      <Button onClick={() => {handleBuy(transactions?.ID); navigate(`/payment/${transactions?.ID}`)}}>
                        Bayar Sekarang
                      </Button>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </>
        ))}
      </Card>
    </>
  );
};
