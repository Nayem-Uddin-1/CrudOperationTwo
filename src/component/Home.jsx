import React from 'react'
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from 'react-redux';





function Home() {

    const user = useSelector((state) => state.users);
    console.log(user);


    return (
        <>
            <div className="container mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">User List</h2>
                    <button className="mb-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        <FaUserPlus className="mr-2" /> Add User
                    </button>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Age</th>
                                    <th className="border border-gray-300 px-4 py-2">City</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {/* <tr>
                <td className="border border-gray-300 px-4 py-2">John Doe</td>
                <td className="border border-gray-300 px-4 py-2">25</td>
                <td className="border border-gray-300 px-4 py-2">johndoe@gmail.com</td>
                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    <FaEdit />
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr> */}

                                {user.map((item, i) => (

                                    <tr >
                                        <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.age}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.city}</td>
                                        <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                      
                                      <div className='flex justify-center items-center'>
                                      <button className=" flex items-center justify-center bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                                <FaEdit />
                                            </button>
                                            <button className=" flex items-center justify-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                                <FaTrash />
                                            </button>
                                      </div>
                                          
                                        </td>
                                    </tr>


                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Home