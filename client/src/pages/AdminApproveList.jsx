import {Table} from "react-bootstrap"


export const AdminApproveList = () => {

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
                <th>Bukti Transfer</th>
                <th className=" text-center">Status Payment</th>
              </tr>
            </thead>
            <tbody>
                  <tr>
                    <td>1</td>
                    <td>ilham Setyadji</td>
                    <td>
                      Stasiun Tanah Abang - Stasiun Lempuyangan
                    </td>
                    <td>Bca.jpg</td>
                    {/* <td style={{ color: "#78A85A" }}></td>
                    <td style={{ color: "#E83939" }}></td> */}
                    <td className=" text-center" style={{ color: "#FF9900" }}>Pending</td>
                  </tr>
            </tbody>
            <tbody>
                  <tr>
                    <td>1</td>
                    <td>ilham Setyadji</td>
                    <td>
                      Stasiun Tanah Abang - Stasiun Lempuyangan
                    </td>
                    <td>Bca.jpg</td>
                    {/* <td style={{ color: "#78A85A" }}></td>
                    <td style={{ color: "#E83939" }}></td> */}
                    <td className=" text-center" style={{ color: "#FF9900" }}>Pending</td>
                  </tr>
            </tbody>
            <tbody>
                  <tr>
                    <td>1</td>
                    <td>ilham Setyadji</td>
                    <td>
                      Stasiun Tanah Abang - Stasiun Lempuyangan
                    </td>
                    <td>Bca.jpg</td>
                    {/* <td style={{ color: "#78A85A" }}></td>
                    <td style={{ color: "#E83939" }}></td> */}
                    <td className=" text-center" style={{ color: "#FF9900" }}>Pending</td>
                  </tr>
            </tbody>

            </Table>
        </div>
      </div>
      <div style={{height:"200px"}}></div>
    </>
    )
}