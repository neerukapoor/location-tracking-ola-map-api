import { useNavigate } from "react-router-dom";
import { useEmployeeDetailsForEmployee } from "../../hooks/useEmployeeDetailsForEmployee";

const Tracking = () => {
    const {loading, employeeDetailsForEmployee} = useEmployeeDetailsForEmployee();
    console.log("neeru in tracking for employee " + employeeDetailsForEmployee?.id + " " + employeeDetailsForEmployee?.name)
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/employeeMap")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-100 to-blue-200flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-100 to-blue-200">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <span className="loading loading-spinner"></span>
                    </div>
                ) : (
                    <div className="text-lg mb-4">
                        <strong>{employeeDetailsForEmployee?.name}</strong> | {employeeDetailsForEmployee?.id}
                    </div>
                )}
                <button
                    onClick={handleClick}
                    className="btn btn-primary w-full mt-4"
                >
                    Let's Start!!
                </button>
            </div>
        </div>
    );
};

export default Tracking;
