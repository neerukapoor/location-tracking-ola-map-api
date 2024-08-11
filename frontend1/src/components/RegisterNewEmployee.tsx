// src/components/RegisterNewEmployee.tsx
import React, { useState } from "react";
import { useRegisterNewEmployee } from "../hooks/useRegisterNewEmployee";

const RegisterNewEmployee: React.FC = () => {
  const { loading, registerNewEmployee } = useRegisterNewEmployee();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerNewEmployee({ name, mobileNumber });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register New Employee</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterNewEmployee;
