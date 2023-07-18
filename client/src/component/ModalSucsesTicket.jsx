import { Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";
import Swal from "sweetalert2"


export default function ModalSuccessAddTicket(props) {
    
const navigate = useNavigate()
console.log("ini props",props.idticket)

const form = new FormData()
form.set("ticket_id", props.idticket)

setAuthToken(localStorage.token);

const HandleSubmit = useMutation( async(e) => {
    try{
        // e.preventDefault();
        const response = await API.post('/transaction', form);

        console.log(" trc success : ", response)
        navigate(`/myticketpending/${response.data.data.ID}`)
        
    } catch(error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "transaction Failed",
            showConfirmButton: false,
            timer: 1500,
        });
        console.log(" failed : ", error);
    }
})


    return (
        <>
            <Modal show={props.show} onHide={props.setShow} centered size="lg">
                <Modal.Body className=" m-auto p-0 w-100">
                    <div >
                        <Alert className="w-100 m-auto fs-2" style={{ textAlign: "center" }} variant="light">
                            Ticket Anda Berhasil Ditambahkan silahkan lakukan pembayaran klik {" "}
                            <span className="fw-bold" style={{cursor: "pointer"}} onClick={(e) => {HandleSubmit.mutate(e)}}>Disini</span>
                        </Alert>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}