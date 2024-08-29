import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDateContext } from '../context/DateContext';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateBar = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const { selectedDate, setSelectedDate } = useDateContext();

    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (value: Value) => {
        if (Array.isArray(value)) {
            setSelectedDate(value[0]); // If it's a range, take the first date
        } else {
            setSelectedDate(value); // Otherwise, use the single date
        }
        setShowCalendar(false); 
    };

    return (
        <div className="relative">
            <button
                onClick={handleButtonClick}
                className="p-2 bg-blue-500 text-white rounded-md"
            >
                Select Date
            </button>

            {showCalendar && (
                <div className="absolute top-0 left-0 mt-2 bg-white shadow-lg rounded-md z-10">
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>
            )}
        </div>
    );
}

export default DateBar;