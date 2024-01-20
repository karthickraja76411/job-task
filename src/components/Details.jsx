import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../reducers/commonReducer';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import AddDetails from "./AddDetails"

const Details = () => {

    const dispatch = useDispatch();
    const detailsData = useSelector(state => state.common.productData);
    const total = useSelector(state => state.common.totalPrice);
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);

    const defaultModal = () => {
        setShow(false)
    }

    return (

        <>
            <div className="table-responsive mt-4 print">
                <table className='table'>
                    <thead>
                        <tr>
                            <td>S.No</td>
                            <td>Item Code</td>
                            <td>Item Name</td>
                            <td>Qty</td>
                            <td>Rate</td>
                            <td>Amount</td>
                            <td className='print-none'>Action</td>
                        </tr>
                    </thead>

                    <tbody>
                        {detailsData && detailsData.map((x, i) => (
                            <tr key={i}>
                                <td>{x.sr_no}</td>
                                <td>{x.item_code}</td>
                                <td>{x.item_name}</td>
                                <td>{x.qty}</td>
                                <td>{x.rate}</td>
                                <td>{x.qty * x.rate}</td>
                                <td className='print-none'>
                                    <div className='d-flex gap-2'>
                                        <i className="fa-solid fa-pen-to-square text-warning" style={{ cursor: "pointer" }} title='update' onClick={() => { setShow(true); setData(x) }}></i>
                                        <i className="fa-solid fa-trash text-danger" onClick={() => dispatch(deleteProduct(i))} style={{ cursor: "pointer" }} title='delete'></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {detailsData.length !== 0 && <tr>
                            <td colSpan={5} className='text-end'>Total</td>
                            <td>{total}</td>
                        </tr>}

                        {detailsData && detailsData.length === 0 && <tr><td colSpan={6} className='text-center'>No Data to Display</td></tr>}
                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddDetails data={data} defaultModal={defaultModal}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Details