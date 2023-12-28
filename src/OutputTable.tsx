import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const serverUrl = "http://localhost:3050/api/data";

const OutputTable: React.FC<PropsType> = ({
  submittedData,
  setSubmittedData,
  onEdit,
  onDelete,
}) => {
  const handleDelete = async (index: number) => {
    try {
      const updatedData = [...submittedData];
      updatedData.splice(index, 1);
      setSubmittedData(updatedData);
      await axios.delete(`${serverUrl}/${submittedData[index]._id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <table
        id="dataTable"
        className="table-scroll"
        style={{ width: "100%", fontSize: "13px" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Contact name</th>
            <th>Contact phone</th>
            <th>Contact email</th>
            <th>Notes</th>
            <th>Type</th>
            <th>Category</th>
            <th>Commission percentage</th>
            <th>Active From</th>
            {/* <th>Logo</th> */}
            <th>Critical account</th>
            <th>Payment options</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <tr key={index}>
              <td>{data.fname}</td>
              <td>{data.mail}</td>
              <td>{data.number}</td>
              <td>{data.website}</td>
              <td>{data.contactName}</td>
              <td>{data.contactPhone}</td>
              <td>{data.contactMail}</td>
              <td>{data.notes}</td>
              <td>{data.type}</td>
              <td>{data.category}</td>
              <td>{data.percentage}</td>
              <td>{data.activeFrom}</td>
              <td>{data.criticalAccount}</td>
              <td>{data.paymentOptions}</td>
              <td>
                <center>
                  <button
                    className="editButton"
                    onClick={() => onEdit(data, index)}
                  >
                    <Link style={{ color: "white" }} to="/">
                      Edit
                    </Link>
                  </button>
                  <button
                    className="delButton"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        <button className="outputtablebtn">
          <Link style={{ color: "black" }} to="/">
            Home
          </Link>
        </button>
      </>
    </>
  );
};

export default OutputTable;

export interface inputData {
  [x: string]: any;
  fname: string;
  mail: string;
  number: string;
  website: string;
  contactName: string;
  contactPhone: string;
  contactMail: string;
  notes: string;
  type: string;
  category: string;
  percentage: string;
  activeFrom: string;
  // Logo:image;
  criticalAccount: string;
  paymentOptions: string;
}

interface PropsType {
  submittedData: inputData[];
  setSubmittedData: React.Dispatch<React.SetStateAction<inputData[]>>;
  onEdit: (data: inputData, index: number) => void;
  onDelete: (index: number) => void;
}
