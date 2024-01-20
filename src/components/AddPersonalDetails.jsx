import React from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { addPersonalData } from '../reducers/commonReducer';


const AddPersonalDetails = () => {

    const dispatch = useDispatch()
    const totalPrice = useSelector(state => state.common.totalPrice)
    let today = new Date().toISOString().slice(0, 10)

    const schema = yup.object().shape({
        vr_no: yup.number().required(),
        vr_date: yup.string().required(),
        ac_name: yup.string().required(),
        ac_amt: yup.number().required(),
        status: yup.string().required()
    });

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    async function onResult(data) {
        // console.log(data);
        dispatch(addPersonalData(data))
    }


    return (
        <>
            <h1>Your Details</h1>
            <form onSubmit={handleSubmit(onResult)}>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <label className='form-label'>Your Number</label>
                        <input type='number' {...register("vr_no")} className={`form-control ${errors.vr_no && "is-invalid"}`} />
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <label className='form-label'>Date</label>
                        <input type='date' {...register("vr_date")} className={`form-control ${errors.vr_date && "is-invalid"}`} defaultValue={today} />
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <label className='form-label'>Name</label>
                        <input type='text' {...register("ac_name")} className={`form-control ${errors.ac_name && "is-invalid"}`} />
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <label className='form-label'>Total Price</label>
                        <input type='number' {...register("ac_amt")} className={`form-control ${errors.ac_amt && "is-invalid"}`} defaultValue={totalPrice} readOnly />
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <label className='form-label'>Status</label>
                        <select className={`form-control ${errors.status && "is-invalid"}`} {...register("status")}>
                            <option value={""}>--selected--</option>
                            <option value={"A"} selected>Active</option>
                            <option value={"I"}>In-Active</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-end gap-3'>
                    <button type='submit' className='btn btn-primary btn-sm'>Submit</button>
                    <button type='reset' className='btn btn-secondary btn-sm' onClick={() => reset()}>Reset</button>
                </div>
            </form>
        </>
    )
}

export default AddPersonalDetails