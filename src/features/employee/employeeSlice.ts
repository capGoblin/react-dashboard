import { createSlice } from "@reduxjs/toolkit";
import APIClient from "../../services/api-client";
export interface Employee {
  id: string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
  profile_image: string;
}

const apiClient = new APIClient<Employee>("/employees");

// Define the initial state for the slice
const initialState = {
  employees: [],
  error: null,
  isLoading: false,
};

// Create an async thunk for fetching employees
export const fetchEmployees = async () => {
  try {
    // setIsLoading(true);
    // if (employees) return;
    const result = await apiClient.getAll();
    console.log(result);
    return result.data;

    // setEmployees(result.data);
  } catch (error) {
    // setError(error || "An error occurred");
  } finally {
    // setIsLoading(false);
  }
};
export const counterSlice = createSlice({
  name: "employee",
  initialState: {
    employees: null,
  },
  reducers: {
    increment: () => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      //   state += 1;
    },
    // decrement: (state) => {
    //   state -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
