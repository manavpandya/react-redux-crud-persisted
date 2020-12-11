import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { connect, useSelector, useDispatch } from "react-redux";
import {
  selectRecords,
  deleteRecord
} from '../actions';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

function List(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const [searchString, setsearchString] = useState();
  const [queryResult, setqueryResult] = useState();

  useEffect(() => {
    dispatch(selectRecords())
  });

  const onEditClick = (item) => {
    history.push({
      pathname: '/form',
      state: {
        item: item,
        mode: 'update'
      }
    })
  }

  const onDeleteClick = (id) => {
    dispatch(deleteRecord(id));
    swal("Success!", "Record is Deleted!", "error");
  }

  const onChangeSearchString = (val) => {
    let tempSearchResult = props?.records?.filter(item => item.fname === val)
    if (tempSearchResult && tempSearchResult.length > 0) {
      setqueryResult(tempSearchResult)
    } else {
      setqueryResult(props.records)
    }
  }

  return (
    <div className="common-page-container">
      <div>
        <div className="form-group">
          <input value={searchString} type="text" className="form-control" name="searchString" id="searchString" onChange={(e) => onChangeSearchString(e.target.value)} placeholder="Search User" />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Country</th>
            <th scope="col">Pincode</th>
            <th scope="col">State</th>
            <th scope="col">Phone</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {(queryResult && queryResult.length > 0) ?
            (
              (queryResult && queryResult.length) ?
                queryResult.map((item, index) => {
                  return <tr key={index}>
                    <th id={index} scope="row">{item.id}</th>
                    <td className="col-wd-12">{item.fname}</td>
                    <td className="col-wd-25">{item.address}</td>
                    <td className="col-wd-12">{item.country}</td>
                    <td className="col-wd-12">{item.pincode}</td>
                    <td>{item.state}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button onClick={() => onEditClick(item)}>Edit</button>{" "}
                      <button onClick={() => onDeleteClick(item.id)}>Delete</button>
                    </td>
                  </tr>
                })
                : <>
                  <div>
                    <p>No records are found</p>
                  </div>
                </>
            ) :
            (
              (props.records && props.records.length) ?
                props.records.map((item, index) => {
                  return <tr key={index}>
                    <th id={index} scope="row">{item.id}</th>
                    <td className="col-wd-12">{item.fname}</td>
                    <td className="col-wd-25">{item.address}</td>
                    <td className="col-wd-12">{item.country}</td>
                    <td className="col-wd-12">{item.pincode}</td>
                    <td>{item.state}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button onClick={() => onEditClick(item)}>Edit</button>{" "}
                      <button onClick={() => onDeleteClick(item.id)}>Delete</button>
                    </td>
                  </tr>
                })
                : <>
                  <div>
                    <p>No records are found</p>
                  </div>
                </>
            )

          }
          {
          }
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => ({
  records: state?.record?.records
});

export default connect(mapStateToProps, null)(List);