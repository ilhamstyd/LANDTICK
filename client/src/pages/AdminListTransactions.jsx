import {Table} from "react-bootstrap"
import { useState, useEffect } from "react";
import ModalEditStatus from "../component/ModalEditStatus";
import ModalTicketDetailAdmin from "../component/ModalTicketDetailAdmin";
import DeleteData from "../component/ModalDeleteTransaction";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import Swal from "sweetalert2"



export const AdminListTransactions = () => {

  let {data: transactions } = useQuery("admintransactionCache", async () => {
    const response = await API.get("/transactions");
    console.log("ini list :", response.data.data)
    return response.data.data;
  })

  const [ID, setID] = useState(null); 

  //modal edit & detail
  const [showSuccessEdit, setShowsuccessEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => {
      setShowsuccessEdit(false);
      setShowDetail(false);
      setShowDelete(false);
    };
  
    const popSuccessEdit = () => {
      setShowsuccessEdit(true);
      
    };

    const popSuccessDetail = () => {
      setShowDetail(true)
    }

    const popSuccessDelete = () => {
      setShowDelete(true)
    }

    return(
      <>

        <div className="container mt-3">
        <h1>List Transaksi</h1>
        <div className="mt-3">
          <Table striped className="m-auto w-100" style={{ border: "none", width: "100%" }}>
            <thead className="">
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Ticket</th>
                <th>Status Payment</th>
                <th className=" text-center">Action</th>
              </tr>
            </thead>
            {transactions?.map((transaction, index) => (
            <>
                <tbody>
                  <tr>
                    <td>{index+1}</td>
                    <td>{transaction?.user.fullname}</td>
                    <td>
                    {transaction?.ticket.start_station.name} - {transaction?.ticket.end_station.name}
                    </td>
                    {transaction?.status === "pending" ? 
                    (<td style={{ color: "#FF9900" }}>{transaction?.status}</td>)
                     :
                    (<td style={{ color: "yellowgreen" }}>{transaction?.status}</td>)}
                    

                    <td className="d-flex justify-content-center">
                          <img onClick={() => {popSuccessDetail(); setID(transaction?.ID)}} src="/images/IconSearch.png" alt="" style={{ cursor: "pointer" }} />
                          <img onClick={() => {popSuccessDelete(); setID(transaction?.ID)}} src="/images/IconTrash.png" alt="" className="ms-5" style={{ cursor: "pointer" }} />
                          <img onClick={popSuccessEdit} src="/images/IconEdit.png" alt="" className="ms-5" style={{ cursor: "pointer" }} />
                    </td>
                  </tr>
            </tbody>
            </>      
            ))}
          <div style={{height:"150px"}}></div>
          </Table>
        </div>
      </div>
      <ModalEditStatus show={showSuccessEdit} onHide={handleClose} handleCloseSuccessEdit={popSuccessEdit} />
      <ModalTicketDetailAdmin id={ID} show={showDetail} onHide={handleClose} handleCloseSuccessEdit={popSuccessDetail} />
      <DeleteData id={ID} show={showDelete} onHide={handleClose} handleCloseSuccesDelete={popSuccessDelete}/>
    </>
    )
}