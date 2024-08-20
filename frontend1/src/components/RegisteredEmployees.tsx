import { useShowEmployees } from "../hooks/useShowEmployees";
import { useNavigate } from "react-router-dom";

const RegisteredEmployeesContainer = () => {
    const {loading, registeredEmployees} = useShowEmployees();
    const navigate = useNavigate();

    const copyToClipboard = (text: string, event: React.MouseEvent) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text);
        alert("Password copied to clipboard!");
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    const handleRowClick = (uniqueId: string) => {
        navigate(`/map?uniqueId=${uniqueId}`);
    };

    const handleWatchHistory = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigate("/history")
    }
    

    return (
        <>
            <div className="flex justify-center mb-11 text-2xl font-bold text-center">All Registered Employees</div>
            <div className="bg-slate-100 p-4 md:p-6 rounded-xl shadow-lg max-w-full md:max-w-[700px] mx-auto">
                <div className="grid grid-cols-4 font-bold border-b-2 pb-2 mb-4 text-sm md:text-base">
                    <div>Name</div>
                    <div>ID</div>
                    <div>Password</div>
                    <div>Watch History</div>
                </div>
                {loading? (
                    <div className="flex justify-center items-center">
                        <span className="loading loading-spinner"></span>
                    </div>
                ) : (
                <ul className="overflow-auto max-h-[350px]">
                    {registeredEmployees.map((employee) => (
                        <li className="grid grid-cols-4 gap-4 p-2 border-b text-sm md:text-base cursor-pointer hover:bg-gray-200"
                        key={employee.uniqueId}
                        onClick={() => handleRowClick(employee.uniqueId)}>
                            <div className="font-medium">{employee.name}</div>
                            <div>{employee.uniqueId}</div>
                            <div className="flex items-center">
                                <span className="mr-2">••••••••</span>
                                <button
                                    className="btn btn-sm btn-neutral"
                                    onClick={(e) => copyToClipboard(employee.password, e)}
                                >
                                    Copy
                                </button>
                            </div>
                            <div>
                            <button className="btn btn-sm btn-neutral" onClick={handleWatchHistory}>Watch History</button>
                            </div>
                        </li>
                    ))}
                </ul>
                )}
                <div className="flex justify-center mt-5">
                    <button className="btn btn-neutral w-full md:w-auto" onClick={handleRegisterClick}>Register New Employee</button>
                </div>
            </div>
        </>
    )
}

export default RegisteredEmployeesContainer;