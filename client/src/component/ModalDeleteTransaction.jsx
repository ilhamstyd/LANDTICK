import { Button, Modal } from 'react-bootstrap'
import { API } from '../config/api'
import { useQuery, useMutation } from 'react-query'
import Swal from "sweetalert2"

export default function DeleteData(props) {

    console.log("ini props id delete :", props.id)
    const HandleSubmit = useMutation( async(e) => {
        try{
            e.preventDefault();
            const response = await API.delete(`/transaction/${props.id}`);
    
            console.log(" trc success : ", response)
            alert("success")
            Swal.fire({
                position: "center",
                icon: "success",
                title: "berhasil hapus transaction",
                showConfirmButton: false,
                timer: 1500,
            });
            props.onHide()
            
        } catch(error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "delete Failed",
                showConfirmButton: false,
                timer: 1500,
            });
            console.log(" failed : ", error);
        }
    })

    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Body className="text-dark">
                <div style={{ fontSize: '20px', fontWeight: '900' }}>
                    Delete Transaction
                </div>
                <div style={{ fontSize: '16px', fontWeight: '500' }} className="mt-2">
                    Are you sure you want to delete this Transaction?
                </div>
                <div className="text-end mt-5">
                    <Button onClick={(e) => HandleSubmit.mutate(e)} size="sm" className="btn-success me-2" style={{ width: '135px' }}>Yes, Delete</Button>
                    <Button size="sm" className="btn-danger" style={{ width: '135px' }}>No, Keep it</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
