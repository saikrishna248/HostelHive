import React, { useState } from "react";
import * as XLSX from "xlsx";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useRef } from "react";

function ExcelUpload() {
//  debugger;
  //Redux implementation 2
  const { isAuthenticated } = useSelector((state) => state.auth);
 
  // 1. Get the user from Redux
    const userFromRedux = useSelector((state) => state.auth.user);

    // 2. Initialize useState (falling back to an empty string)
    const [username, setUsername] = useState(userFromRedux?.fullName || "");


  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  // 🔐 Protect route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Login");
    }
  }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     if (!isAuthenticated) return;
//   }, [isAuthenticated]);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  /* ================= EXCEL UPLOAD ================= */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const uint8Array = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(uint8Array, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formatted = jsonData.map((row) => ({
        productCategory: row["Product Category"] || "",
        q1Sales: Number(row["Q1 Sales"] || 0),
        q2Sales: Number(row["Q2 Sales"] || 0),
        q3Sales: Number(row["Q3 Sales"] || 0),
        q4Sales: Number(row["Q4 Sales"] || 0),
        total:
          Number(row["Q1 Sales"] || 0) +
          Number(row["Q2 Sales"] || 0) +
          Number(row["Q3 Sales"] || 0) +
          Number(row["Q4 Sales"] || 0),
      }));

      setData(formatted);
      setCurrentPage(1);
    };

    reader.readAsArrayBuffer(file);
  };

  /* ================= EDIT ================= */
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = field === "productCategory" ? value : Number(value);

    updated[index].total =
      updated[index].q1Sales +
      updated[index].q2Sales +
      updated[index].q3Sales +
      updated[index].q4Sales;

    setData(updated);
  };

  /* ================= ADD / DELETE ================= */
  const addRow = () => {
    setData([
      ...data,
      {
        productCategory: "",
        q1Sales: 0,
        q2Sales: 0,
        q3Sales: 0,
        q4Sales: 0,
        total: 0,
      },
    ]);
  };

  const deleteRow = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  /* ================= SUBMIT ================= */
  const submitData = async () => {
    try {
      //   await axios.post(
      //     "https://localhost:44393/api/sales/upload",
      //     data
      //   );
      const payload = {
        username: username,
        salesData: data,
      };
      await api.post("sales/upload", payload);

      alert("Data saved successfully!");
      // ✅ Clear screen
      setData([]);
      setCurrentPage(1);
      // ✅ clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      // ✅ Clear file input (optional)
      //   document.getElementById("excelFile").value = "";
    } catch (error) {
      console.error(error);
      alert("Error while saving data");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Excel Upload with Pagination & Submit
      </h2>

      <input
        type="file"
        id="excelFile"
        ref={fileInputRef}
        accept=".xls,.xlsx"
        onChange={handleFileUpload}
        className="mb-4 block w-full text-sm
        file:mr-4 file:py-2 file:px-4
        file:rounded file:border-0
        file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />

      {data.length > 0 && (
        <>
          {/* Action Buttons */}
          <div className="flex gap-3 mb-3">
            <button
              onClick={addRow}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add Row
            </button>

            <button
              onClick={submitData}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit to Server
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-2">Category</th>
                  <th className="border px-2 py-2">Q1</th>
                  <th className="border px-2 py-2">Q2</th>
                  <th className="border px-2 py-2">Q3</th>
                  <th className="border px-2 py-2">Q4</th>
                  <th className="border px-2 py-2">Total</th>
                  <th className="border px-2 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((row, i) => {
                  const actualIndex = startIndex + i;

                  return (
                    <tr key={actualIndex} className="text-center">
                      <td className="border px-2 py-1">
                        <input
                          value={row.productCategory}
                          onChange={(e) =>
                            handleChange(
                              actualIndex,
                              "productCategory",
                              e.target.value,
                            )
                          }
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>

                      {["q1Sales", "q2Sales", "q3Sales", "q4Sales"].map(
                        (field) => (
                          <td key={field} className="border px-2 py-1">
                            <input
                              type="number"
                              value={row[field]}
                              onChange={(e) =>
                                handleChange(actualIndex, field, e.target.value)
                              }
                              className="w-full border rounded px-2 py-1"
                            />
                          </td>
                        ),
                      )}

                      <td className="border px-2 py-1 font-semibold bg-gray-50">
                        {row.total}
                      </td>

                      <td className="border px-2 py-1">
                        <button
                          onClick={() => deleteRow(actualIndex)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ExcelUpload;
