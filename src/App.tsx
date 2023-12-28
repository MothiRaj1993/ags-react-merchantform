import "./App.css";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import OutputTable from "./OutputTable";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import InputFields from "./InputFields";
import FilterData from "./FilterData";
import axios from "axios";

const serverUrl = "http://localhost:3050/api/data";

const initialFormData: inputData = {
  fname: "",
  mail: "",
  number: "",
  website: "",
  contactName: "",
  contactPhone: "",
  contactMail: "",
  notes: "",
  type: "",
  category: "",
  percentage: "",
  activeFrom: "",
  criticalAccount: "",
  paymentOptions: "",
};
const Multiple: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<inputData[]>([]);
  const [formData, setformData] = useState<inputData>(initialFormData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterPaymentOption, setFilterPaymentOption] = useState<string | null>(
    null
  );
  const [filteredData, setFilteredData] = useState<inputData[]>(submittedData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(serverUrl);
        setSubmittedData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (editingIndex !== null) {
        const updatedData = await axios.put(
          `${serverUrl}/${submittedData[editingIndex]._id}`,
          formData
        );
        setSubmittedData((prevData) => {
          const updatedDataArray = [...prevData];
          updatedDataArray[editingIndex] = updatedData.data;
          return updatedDataArray;
        });

        setformData(initialFormData);
        setEditingIndex(null);
      } else {
        await axios.post(serverUrl, formData);
        setSubmittedData((prevData) => {
          let updatedData;
          if (editingIndex !== null) {
            updatedData = [...prevData];
            updatedData[editingIndex] = formData;
          } else {
            updatedData = [...prevData, formData];
          }
          return updatedData;
        });
      }

      setformData(initialFormData);
      setEditingIndex(null);
      navigate("/outputtable");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (data: inputData, index: number) => {
    setformData(data);
    setEditingIndex(index);
  };
  const handleDelete = async (index: number) => {
    try {
      await axios.delete(`${serverUrl}/${submittedData[index]._id}`);
      const updatedData = [...submittedData];
      updatedData.splice(index, 1);
      setSubmittedData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePaymentOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterPaymentOption(event.target.value);
  };
  const applyFilter = () => {
    let filteredDataByType = submittedData;

    if (filterType !== null) {
      filteredDataByType = submittedData.filter(
        (data) => data.type === filterType
      );
    }

    let filteredDataByPaymentOption = filteredDataByType;

    if (filterPaymentOption !== null) {
      filteredDataByPaymentOption = filteredDataByType.filter(
        (data) => data.paymentOptions === filterPaymentOption
      );
    }

    setFilteredData(filteredDataByPaymentOption);
  };
  const clearFilter = () => {
    setFilterType(null);
    setFilterPaymentOption(null);
    setFilteredData([]);
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header title="Merchant form" />
              <InputFields
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                filterType={filterType}
                filterPaymentOption={filterPaymentOption}
                handlePaymentOptionChange={handlePaymentOptionChange}
                applyFilter={applyFilter}
                clearFilter={clearFilter}
              />{" "}
            </>
          }
        />
        <Route
          path="/outputtable"
          element={
            <>
              <OutputTable
                submittedData={
                  filteredData.length ? filteredData : submittedData
                }
                setSubmittedData={setSubmittedData}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <FilterData
                filterType={filterType}
                filterPaymentOption={filterPaymentOption}
                setFilterType={setFilterType}
                handlePaymentOptionChange={handlePaymentOptionChange}
                applyFilter={applyFilter}
                clearFilter={clearFilter}
              />
            </>
          }
        />
      </Routes>
    </>
  );
};
export default Multiple;

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
