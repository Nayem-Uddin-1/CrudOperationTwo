import { useState } from "react";
import { FaUser, FaCity, FaCalendarAlt } from "react-icons/fa";
import { getDatabase, push, ref, set } from "firebase/database";
import { useNavigate } from "react-router";



 
export default function UserData() {

    const db = getDatabase();
    const navigate=useNavigate();


    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [age, setAge] = useState("")



    const [nameError, setNameError] = useState("")
    const [cityError, setCityError] = useState("")
    const [ageError, setAgeError] = useState("")


    const handleNameInfo = (e) => {

        setName(e.target.value)
        setNameError("")

    }
    const handleCityInfo = (e) => {
        setCity(e.target.value)
        setCityError("")
    }
    const handleAgeInfo = (e) => {
        setAge(e.target.value)
        setAgeError("")
    }

    const handleSubmit = (e) => {


        if (!name) {
            setNameError("Enter your name")

        }
        if (!city) {
            setCityError("Enter your city name")

        }
        if (!age) {
            setAgeError("Enter your age")

        }
        else if (name && city && age) {

           
            set(push(ref(db, 'dataList/')), {
                userName: name,
                cityName: city,
                age : age,
              }).then(()=>(
               
                setName(""),
                setCity(""),
                setAge(""),

               
                    navigate("/listdata")
             
                
                
              )).catch((err)=>(
                console.log(err)
                
              ))       
            
        }




    }





    return (


        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">User Information</h2>
                <div className="space-y-4">
                    <div className="flex items-center border rounded-lg p-2 shadow-sm">
                        <FaUser className="text-gray-500 mr-2" />
                        <input onChange={handleNameInfo} value={name} type="text" placeholder="Name" className="outline-none w-full" />

                    </div>
                    <p className="text-red-500">
                        {
                            nameError && nameError
                        }
                    </p>

                    <div className="flex items-center border rounded-lg p-2 shadow-sm">
                        <FaCity className="text-gray-500 mr-2" />
                        <input onChange={handleCityInfo} value={city} type="text" placeholder="City Name" className="outline-none w-full" />
                    </div>
                    <p className="text-red-500">
                        {
                            cityError && cityError
                        }
                    </p>
                    <div className="flex items-center border rounded-lg p-2 shadow-sm">
                        <FaCalendarAlt className="text-gray-500 mr-2" />
                        <input onChange={handleAgeInfo} value={age} type="number" placeholder="Age" className="outline-none w-full" />
                    </div>
                    <p className="text-red-500">
                        {
                            ageError && ageError
                        }
                    </p>
                    <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
