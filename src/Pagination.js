import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError("failed to fetch data");
        alert("failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentEmployees = employees.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Employee Data Table</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <table
            border="1"
            width="100%"
            cellPadding="10"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#226f22", color: "white" }}>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              style={{
                background: "#226f22",
                color: "white",
                padding: "8px",
                cursor: "pointer",
              }}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span
              style={{
                backgroundColor: "#226f22",
                color: "white",
                padding: "10px",
              }}
            >
              {currentPage}
            </span>
            <button
              style={{
                background: "#226f22",
                color: "white",
                padding: "8px",
                cursor: "pointer",
              }}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
