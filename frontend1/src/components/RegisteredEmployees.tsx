import { useShowEmployees } from "../hooks/useShowEmployees";

const RegisteredEmployeesContainer = () => {
    const {loading, registeredEmployees} = useShowEmployees();
    return (
        <>
            <div className="flex justify-center mb-11 text-2xl font-bold">All Registered Employees</div>
            <div className="justify-center items-center bg-slate-100 p-6 rounded-xl shadow-lg">
                {loading? <span className="loading loading-spinner"></span> : 
                <>
                {registeredEmployees.map((employee) => (
                    <li className="" key={employee.uniqueId}>
                        {employee.name} - {employee.uniqueId}
                    </li>
                ))}
                </>}
                <div className="flex justify-center">
                    <button className="btn btn-neutral">Register New Employee</button>
                </div>
            </div>
        </>
    )
}

export default RegisteredEmployeesContainer;