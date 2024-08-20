import DateBar from "../../components/DateBar";
import HistoryMap from "../../components/HistoryMap";

const History = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="p-4">
                <DateBar/>
            </div>
            <div className="flex-grow">
                <HistoryMap employeeId="66bb053daa78d1f214016e2c"/>
            </div>
        </div>
    )
}


export default History;