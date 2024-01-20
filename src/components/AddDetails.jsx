import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux';
import { addProductData, defaultSet, updateProductData } from '../reducers/commonReducer';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';


const AddDetails = (props) => {

    const data = props?.data;
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(null);
    const userID = useSelector(state => state.common.personalData);
    const productDetailsLength = useSelector(state => state.common.productData.length);
    const productData = useSelector(state => state.common.productData);
    const totalPrice = useSelector((state) => state.common.totalPrice)

    const schema = yup.object().shape({
        // item_code: yup.string().required(),
        item_name: yup.string().required(),
        qty: yup.number().required(),
        rate: yup.number().required(),
        description: yup.string().required()
    });

    const formOptions = {
        resolver: yupResolver(schema),
    }

    if (data) {
        formOptions.defaultValues = {
            item_name: JSON.stringify({ item_code: data.item_code, item_name: data.item_name }),
            qty: data.qty,
            rate: data.rate,
            description: data.description,
            vr_no: data.vr_no,
            sr_no: data.sr_no
        };
    }

    const { register, reset, handleSubmit, formState: { errors } } = useForm(formOptions);

    function onSubmit(values) {
        const product = JSON.parse(values.item_name)
        const changeDate = { ...values, item_code: product.item_code, item_name: product.item_name, vr_no: userID.vr_no, sr_no: productDetailsLength + 1 }
        data ? onUpdate(values) : onResult(changeDate)
    }


    async function onResult(values) {
        // console.log(values);
        dispatch(addProductData(values))
        reset()
    }

    useEffect(() => {

        dropdownOptions()

    }, [])


    function dropdownOptions() {
        fetch("http://5.189.180.8:8010/item").then(x => { return x.json() }).then(x => { setDropdown(x) }).catch(err => console.log("error", err))
    }

    async function addFullData() {

        const convertData = { header_table: { ...userID, vr_date: moment(userID.vr_date).format("YYYY-DD-MM") }, detail_table: productData }
        // console.log(convertData);
        const headers = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(convertData)
        }
        fetch("http://5.189.180.8:8010/header/multiple", headers).then(x => x.json()).then(x => { console.log(x); window.print(); dispatch(defaultSet()) })
    }

    function onUpdate(values) {
        const product = JSON.parse(values.item_name)
        const changeData = { ...values, item_code: product.item_code, item_name: product.item_name }
        // console.log("data", changeData);
        dispatch(updateProductData(changeData))
        props?.defaultModal()
    }



    return (
        <div className='print-none'>
            {!data && <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex gap-3">
                        <li className="nav-item">
                            <button className='btn btn-primary btn-sm' onClick={() => { dispatch(defaultSet(null)) }}>New</button>
                        </li>
                        <li className="nav-item">
                            <button className='btn btn-info btn-sm' onClick={() => handleSubmit(onSubmit)()}>Insert</button>
                        </li>
                        {+productDetailsLength !== 0 && <li className="nav-item">
                            <button className='btn btn-success btn-sm' onClick={() => addFullData()}>Save</button>
                        </li>}
                        {+productDetailsLength !== 0 && <li className="nav-item">
                            <button className='btn btn-warning btn-sm' onClick={() => window.print()}>Print</button>
                        </li>}
                    </ul>
                </div>
            </nav>}

            {!data && <h1>Product Details total-{totalPrice} count-{productDetailsLength}</h1>}
            {dropdown ? <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    {/* <div className="col-lg-4 col-md-6">
                        <label className='form-label'>Item Code</label>
                        <select className={`form-control ${errors.item_code && "is-invalid"}`} {...register("item_code")} onChange={(e) => handleOptionKey(e.target.value)} >
                            <option value={""}>--selected--</option>
                            {dropdown.map((x, i) => <option value={specificData && specificData.item_code} key={i}  >{x.item_code}</option>)}
                        </select>
                    </div> */}
                    <div className="col-lg-6 col-md-6">
                        <label className='form-label'>Item Name</label>
                        <select className={`form-control ${errors.item_name && "is-invalid"}`} {...register("item_name")}>
                            <option value={""}>--selected--</option>
                            {dropdown.map((x, i) => <option value={JSON.stringify(x)} key={i}>{x.item_name}</option>)}
                        </select>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <label className='form-label'>Quantity</label>
                        <input type='number' {...register("qty")} className={`form-control ${errors.qty && "is-invalid"}`} />
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <label className='form-label'>Rate</label>
                        <input type='number' {...register("rate")} className={`form-control ${errors.rate && "is-invalid"}`} />
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <label className='form-label'>Decription</label>
                        <textarea {...register("description")} className={`form-control ${errors.description && "is-invalid"}`}></textarea>
                    </div>

                </div>
                <div className='d-flex align-items-center justify-content-end gap-3'>
                    {!data && <button type='reset' className='btn btn-secondary btn-sm' onClick={() => reset()}>Reset</button>}
                    {data && <button className='btn btn-secondary btn-sm' onClick={() => handleSubmit(onSubmit)()}>Update</button>}
                </div>
            </form> :
                <div className='text-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>}
        </div>
    )
}

export default AddDetails