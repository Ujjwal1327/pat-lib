import { faEnvelope, faLocation, faPhone, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../components/PageTitle";
import { useState } from "react";
import { db } from "../Firebase";
import { format } from "date-fns"; // to format date and time
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function Contact() {
    const [name, setName] = useState('');
    const [num, setNum] = useState('');
    const [add, setAdd] = useState('');
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const visitorsCollectionRef = collection(db, 'visitors');

    const validateInputs = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!num.trim() || !/^\d{10}$/.test(num)) newErrors.num = "Valid phone number is required.";
        if (!add.trim()) newErrors.add = "Address is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddVisitor = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        setLoading(true);
        try {
            const currentDate = new Date();
            const formattedDate = format(currentDate, "MM/dd/yyyy");
            const formattedTime = format(currentDate, "hh:mm a");

            const newVisitor = {
                name,
                number: num,
                address: add,
                reminder: 0,
                date: formattedDate,
                time: formattedTime,
                createdAt: Timestamp.now(),
            };

            await addDoc(visitorsCollectionRef, newVisitor);

            setName("");
            setNum("");
            setAdd("");
            setAlert({ type: 'success', message: 'Shift added successfully!' });
        } catch (err) {
            setAlert({ type: 'error', message: 'Error adding visitors. Please try again.' });
        } finally {
            setLoading(false);
            setTimeout(() => setAlert(null), 2000);
        }
    };

    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
            <PageTitle title="Contact" />

            {alert && (
                <div
                    className={`fixed top-20 left-1/2 -translate-x-1/2 sm:right-0 m-2 mx-auto text-center w-[90%] py-5 mb-4 text-white ${alert.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {alert.message}
                </div>
            )}

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 shadow-2xl">
                <div className="overflow-hidden">
                    <div className="grid grid-cols-1 w-full md:grid-cols-2">
                        {/* Left Details */}
                        <div className="p-6 mr-2 bg-blue-800 sm:rounded-lg w-full flex flex-col gap-3">
                            <h1 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
                                Get in touch:
                            </h1>
                            <p className="text-normal text-lg sm:text-xl font-medium text-gray-100 mt-2">
                                Fill in the form to start a conversation
                            </p>

                            <div className="flex items-center mt-8 text-gray-100">
                                <FontAwesomeIcon icon={faLocation} className="text-2xl" />
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    Gur ki mandi, Patna 800007
                                </div>
                            </div>

                            <div className="flex items-center mt-4 text-gray-100">
                                <FontAwesomeIcon icon={faPhone} className="text-2xl" />
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    +91 8271170731
                                </div>
                            </div>

                            <div className="flex items-center mt-2 text-gray-100">
                                <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    ashish@gmail.com
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <form onSubmit={handleAddVisitor} className="p-6 flex flex-col justify-center gap-3">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="hidden">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none"
                                />
                                {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="tel" className="hidden">
                                    Number
                                </label>
                                <input
                                    type="tel"
                                    name="tel"
                                    id="tel"
                                    value={num}
                                    onChange={(e) => setNum(e.target.value)}
                                    placeholder="Telephone Number"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none"
                                />
                                {errors.num && <span className="text-red-500 text-sm mt-1">{errors.num}</span>}
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="add" className="hidden">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="add"
                                    id="add"
                                    value={add}
                                    onChange={(e) => setAdd(e.target.value)}
                                    placeholder="Address"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none"
                                />
                                {errors.add && <span className="text-red-500 text-sm mt-1">{errors.add}</span>}
                            </div>

                            <button
                                type="submit"
                                className="md:w-32 bg-blue-700 text-white font-semibold text-xl py-3 px-6 rounded-lg mt-3 hover:bg-blue-900 transition ease-in-out duration-300 flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            className="animate-spin text-4xl text-white"
                                        />
                                    </div>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
