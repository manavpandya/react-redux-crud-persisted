import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useHistory, useLocation } from "react-router-dom";
import { useFormFields } from "./libs/CustomFormHooks";
import { useDispatch } from "react-redux";
import {
  addRecord,
  updateRecord
} from '../actions';
import swal from 'sweetalert';

function Form(props) {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const [fname, setfname] = useState();
  const [address, setaddress] = useState();
  const [pincode, setpincode] = useState();
  const [value, setValue] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState('No state selected');
  const [fields, handleFieldChange] = useFormFields({
    fname: "",
    address: "",
    pincode: "",
    state: "",
  });

  useEffect(() => {
    if (location?.state?.item && location?.state?.mode) {
      const data = location.state.item;
      setFormData(data);
      fetchState(data.pincode);
      setfname(data.fname);
      setaddress(data.address);
      setpincode(data.pincode);
      setState(data.state);
      setValue(data.phone);
      setCountry(data.country);
    } else {

    }
  }, []);

  const oncoutryChange = (e) => {
    setCountry(e.target.value)
  }

  const onPincodeChange = (e) => {
    fetchState(e.target.value)
  }

  const fetchState = async (value) => {
    await fetch(`https://api.worldpostallocations.com/pincode?postalcode=${value}&countrycode=${country}`)
      .then(response => response.json())
      .then(data => setState(data?.result && data.result.length > 0 && data.result[0].state));
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (location?.state?.mode === 'update') {
      let body = {
        id: formData.id,
        fname: fname,
        address: address,
        pincode: pincode,
        state: state,
        country: country,
        phone: value
      }
      swal("Success!", "Record is Updated!", "success").then((value) => {
        if (value === true) {
          history.push('/list')
        }
      });
      dispatch(updateRecord(body));
    } else {
      let body = {
        id: Math.random().toString(16).slice(-4),
        fname: fname,
        address: address,
        pincode: pincode,
        state: state,
        country: country,
        phone: value
      }
      swal("Success!", "Record is Added!", "success").then((value) => {
        if (value === true) {
          history.push('/list')
        }
      });
      dispatch(addRecord(body));
    }

  }

  return (
    <div className="common-page-container">
      <div >
        <form className="form-container">
          <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input value={fname} type="text" className="form-control" name="fname" id="fname" onChange={(e) => setfname(e.target.value)} placeholder="Enter first name" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea value={address} className="form-control" name="address" id="address" rows="3" onChange={(e) => setaddress(e.target.value)} placeholder="Enter address"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select value={country} name="country" id="country" className="form-control" onChange={oncoutryChange} >
              <option>Select Country</option>
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="CA">CA</option>
              <option value="NZ">NZ</option>
              <option value="AU">AU</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input type="text" value={pincode} onBlur={onPincodeChange} onChange={(e) => setpincode(e.target.value)} className="form-control" name="pincode" id="pincode" placeholder="Enter pincode" />
          </div>
          <div className="form-group row">
            <label htmlFor="state" className="col-sm-2 col-form-label">State</label>
            <div className="col-sm-10">
              <input type="text" value={state} readOnly className="form-control-plaintext" onChange={(e) => setState(e.target.value)} id="state" name="state" value={state} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <div className="col-sm-10">
              <PhoneInput
                id="phone"
                placeholder="Enter phone number"
                value={value}
                onChange={setValue} />
            </div>
          </div>
          <button type="button" onClick={onFormSubmit} className="btn btn-primary">{location?.state?.mode === 'update' ? 'UPDATE' : 'SUBMIT'}</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
