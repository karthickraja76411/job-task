import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../reducers/commonReducer';

const Details = () => {

    const dispatch = useDispatch();
    const detailsData = useSelector(state => state.common.productData);
    const [total, setToatal] = useState(0);

    useEffect(() => {
        detailsData.filter(x => setToatal(total + x.qty * x.rate))
    }, [])

    return (
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
                                    <i className="fa-solid fa-pen-to-square text-warning" style={{ cursor: "pointer" }} title='update'></i>
                                    <i className="fa-solid fa-trash text-danger" onClick={() => dispatch(deleteProduct(i))} style={{ cursor: "pointer" }} title='delete'></i>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {(detailsData && total !== 0 )&& <tr>
                        <td colSpan={5} className='text-end'>Total</td>
                        <td>{total}</td>
                    </tr>}

                    {detailsData && detailsData.length === 0 && <tr><td colSpan={6} className='text-center'>No Data to Display</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export default Details