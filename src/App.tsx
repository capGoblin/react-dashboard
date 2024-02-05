import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { FiSearch } from "react-icons/fi";
// import "./App.css";
import "./styles/Home.scss";
// import "./styles/Card.scss";
import BarChartNames from "./components/BarChartNames";
import BarChartAge from "./components/BarChartAge";
import Card from "./components/Card";
import useEmployee from "./hooks/useEmployee";

function App() {
  const [count, setCount] = useState(0);
  const { employees, error, isLoading } = useEmployee();
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;

  let currentEmployees = null;
  if (employees) {
    currentEmployees = employees.slice(startIndex, endIndex);
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  console.log(employees);

  return (
    <>
      <div className="dashboard-header">
        <h1>Employee Dashboard</h1>

        <div className="search-bar">
          <p>
            <FiSearch />
          </p>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="my-container">
        <Card className="grid-item">
          <BarChartNames />
        </Card>

        <Card className="grid-item">
          <BarChartAge />
        </Card>
      </div>
      <div className="employee-list">
        <h2>Employee List</h2>
        {currentEmployees &&
          currentEmployees.map((employee) => (
            <div key={employee.id} className="employee-container">
              <strong>Name:</strong> {employee.employee_name},{" "}
              <strong>Age:</strong> {employee.employee_age},{" "}
              <strong>Salary:</strong> {employee.employee_salary}
            </div>
          ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
      {/* </div> */}
      {/* // </div> */}
    </>
  );
}

export default App;
