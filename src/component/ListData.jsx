import React, { useEffect, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { Link } from "react-router";
import { AiOutlineClose } from "react-icons/ai";



// remove(ref(db, 'dataList/' + id))

//         setPopupWindow(!popupWindow)



const ListData = () => {

    const db = getDatabase();
    const [data, setData] = useState([])
    const [popupWindow, setPopupWindow] = useState(false)
    const [updatePpopupWindow, setUpdatePopupWindow] = useState(false)



    const [updateName, setUpdateName] = useState("")
    const [updateCity, setUpdateCity] = useState("")
    const [updateAge, setUpdateAge] = useState("")


    const [updateNameError, setUpdateNameError] = useState("")
    const [updateCityError, setUpdateCityError] = useState("")
    const [updateAgeError, setUpdateAgeError] = useState("")


    const [globalId, setGlobalId] = useState(null)
    const [editId, setEditId] = useState(null)




    useEffect(() => {

        const starCountRef = ref(db, 'dataList/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const Arr = [];
            snapshot.forEach((item) => {
                Arr.push({ ...item.val(), id: item.key })
            })

            setData(Arr);
        });

    }, []);




    const handelUpdateName = (e) => {
        e.preventDefault()
        setUpdateName(e.target.value);
        setUpdateNameError("")
    }
    const handelUpdateCity = (e) => {
        e.preventDefault()
        setUpdateCity(e.target.value);
        setUpdateCityError("")

    }
    const handelUpdateAge = (e) => {
        e.preventDefault()
        setUpdateAge(e.target.value);
        setUpdateAgeError("")

    }


  



    const handleeDeleteList = (id) => {

        setGlobalId(id);


        setPopupWindow(!popupWindow)



    }

    const handleEditList = (id) => {       

        setEditId(id);
        

        setUpdatePopupWindow(!updatePpopupWindow)


    }


    const handleDelete = () => {

        console.log(globalId);

        remove(ref(db, 'dataList/' + globalId))

        setPopupWindow(!popupWindow)

    }

    const handleUpdateList = () => {

          console.log(editId);
          

        if (!updateName) {
            setUpdateNameError("Enter the name please")
        }
        if (!updateCity) {
            setUpdateCityError("Enter the city name")
        }
        if (!updateAge) {
            setUpdateAgeError("Enter the age please")
        }

        else if (updateName && updateCity && updateAge) {

        update(ref(db, 'dataList/' + editId),{
 
            userName: updateName,
            cityName: updateCity,
            age: updateAge,

        }).then(()=>{
            setUpdatePopupWindow(!updatePpopupWindow);
        })



        }



    }





    return (
        <div className="relative h-screen">
            <div className="container mx-auto p-6 ">

                {/* ===========PopUpWindow....============ */}

                {
                    popupWindow &&
                    <div className=" flex items-center justify-center   absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 ">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-5">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-lg font-semibold">Delete Confirmation</h2>
                                <button>
                                    <AiOutlineClose onClick={() => setPopupWindow(false)} className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <p className="mt-3 text-gray-700">Are you sure you want to delete this? This action cannot be undone.</p>
                            <div className="flex justify-end mt-5 space-x-2">
                                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">
                                    Delete
                                </button>

                                <button onClick={() => setPopupWindow(false)} className="px-4 py-2 border rounded-md">
                                    Cancel
                                </button>

                            </div>
                        </div>
                    </div>
                }

                {/* ============Working on it=============== */}

                {
                    updatePpopupWindow &&
                    <div className=" flex items-center justify-center   absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
                            <h2 className="text-xl font-semibold mb-4">Update Information</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input onChange={handelUpdateName}
                                    type="text"
                                    className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="your name"
                                />
                            </div>
                            <p className="text-red-500" > {
                                updateNameError && updateNameError
                            }</p>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">City Name</label>
                                <input onChange={handelUpdateCity}
                                    type="text"
                                    className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="your city name"
                                />
                            </div>

                            <p className="text-red-500" > {
                                updateCityError && updateCityError
                            }</p>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input onChange={handelUpdateAge}
                                    type="number"
                                    className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="your age"
                                />
                            </div>
                            <p className="text-red-500" > {
                                updateAgeError && updateAgeError
                            }</p>
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setUpdatePopupWindow(!updatePpopupWindow)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
                                <button onClick={handleUpdateList} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update</button>
                            </div>
                        </div>
                    </div>

                }






                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">User List</h2>
                    <button className="mb-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        <Link to="/userdata" className="flex items-center gap-2" > <FaUserPlus className="mr-2" />  Add User </Link>
                    </button>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Age</th>
                                    <th className="border border-gray-300 px-4 py-2">City name</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {

                                    data.map((item, index) => (

                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">{item.userName}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.age}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.cityName}</td>
                                            <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                                <button onClick={()=>{handleEditList(item.id)}}  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                                    <FaEdit  />
                                                </button>
                                                <button onClick={() => { handleeDeleteList(item.id) }} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))


                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ListData;
