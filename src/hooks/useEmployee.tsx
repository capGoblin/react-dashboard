import { useState, useEffect } from "react";
import APIClient from "../services/api-client"; // Assuming APIClient is in the same directory

export interface Employee {
  id: string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
  profile_image: string;
}

const apiClient = new APIClient<Employee>("/employees");

const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (employees) return;
        const result = await apiClient.getAll();
        console.log(result);
        setEmployees(result.data);
      } catch (error: any) {
        setError(error || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { employees, error, isLoading };
};

export default useEmployee;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEmployees } from "../features/employee/employeeSlice";
// import { RootState } from "../features/store";

// // import { decrement, increment } from "../features/employee/employeeSlice";

// const EmployeeList = () => {
//   const dispatch = useDispatch();
//   // const employees = useSelector((state) => state.employees);
//   const employees = useSelector((state: RootState) => state.employee.employees);
//   const error = "";
//   const isLoading = "";

//   useEffect(() => {
//     // if (!employees) {
//     const fetchData = async () => {
//       // if (!employees) {
//       dispatch(await fetchEmployees());
//       // }
//     };

//     fetchData();
//     // }
//   }, [dispatch]);

//   return { employees, error, isLoading };
// };

// export default EmployeeList;
