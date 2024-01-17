import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const[loading,setLoading] =useState(true)
    useEffect(() => {
        fetch('https://recipe-web-app-server.vercel.app/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data);
                setLoading(false);  // Set loading to false when data is received
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setLoading(false);  // Set loading to false in case of an error
            });
    }, []);
    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const response = await fetch(`https://recipe-web-app-server.vercel.app/recipes/${id}`, {
                    method: 'DELETE'
                });

                const data = await response.json();

                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));
                }
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the recipe.",
                icon: "error"
            });
        }
    };
    return (
        <div className='container mx-auto my-5 txt'>
            <h1 className='text-center text-3xl font-bold'>What We Offer</h1>
            <div className='w-1/2 flex justify-center mt-5'>
            <Link to="/create"><button className="btn btn-neutral ">Create</button></Link>
            </div>
            
            <div className="overflow-x-auto my-5 flex justify-center">
           
            
            {loading?<span className="loading loading-bars loading-lg"></span>:
                <table className="table w-1/2">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                 
                               {recipes.map((recipe, index) => (
                                <tr key={recipe._id}>
                                    <th>{index+1}</th>
                                    <td>{recipe.title}</td>
                                    <td><button><Link to={`recipes/${recipe._id}`}><IoIosInformationCircle /></Link></button> | <Link to={`edit/${recipe._id}`}><button><FaEdit /></button></Link> | <button onClick={() => handleDelete(recipe._id)}><MdDelete /></button></td>
                                </tr>
                            ))}
              
                    </tbody>
                </table>}
            </div>
        </div>
    );
};

export default AllRecipes;