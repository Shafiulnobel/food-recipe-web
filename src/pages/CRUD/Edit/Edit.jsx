import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import Swal from 'sweetalert2';

const Edit = () => {
    const loadRecipe = useLoaderData();
    const [titleError, setTitleError] = useState('');
    const [ingredientsError, setIngredientsError] = useState('');
    const [instructionError, setInstructionError] = useState('');

    const [recipeData, setRecipeData] = useState({
        title: loadRecipe?.title || '',
        ingredients: loadRecipe?.ingredients || [],
        instruction: loadRecipe?.instruction || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddIngredient = () => {
        const newIngredient = document.getElementById('ingredient').value;

        // Check for empty ingredient
        if (newIngredient.trim() === '') {
            setIngredientsError('Ingredient cannot be empty');
            return;
        } else {
            setIngredientsError('');
        }

        setRecipeData((prevData) => ({
            ...prevData,
            ingredients: [...prevData.ingredients, newIngredient],
        }));

        document.getElementById('ingredient').value = ''; // Clear input field after adding ingredient
    };

    const handleCancel = (index) => {
        const updatedIngredients = [...recipeData.ingredients];
        updatedIngredients.splice(index, 1);
        setRecipeData({
            ...recipeData,
            ingredients: updatedIngredients,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for empty title
        if (recipeData.title.trim() === '') {
            setTitleError('Recipe title cannot be empty');
            return;
        } else {
            setTitleError('');
        }

        // Check for empty ingredients
        if (recipeData.ingredients.length === 0) {
            setIngredientsError('At least one ingredient is required');
            return;
        } else {
            setIngredientsError('');
        }

        // Check for empty instruction
        if (recipeData.instruction.trim() === '') {
            setInstructionError('Recipe instruction cannot be empty');
            return;
        } else {
            setInstructionError('');
        }

        // Send PUT request to update the recipe
        fetch(`https://recipe-web-app-server.vercel.app/recipes/${loadRecipe._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Recipe Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    });
                } else {
                    Swal.fire({
                        title: 'No Update!',
                        text: 'Nothing Updated',
                        icon: 'info',
                        confirmButtonText: 'Ok',
                    });
                }
            })
            .catch((error) => {
                console.error('Error updating recipe:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-5">
                <div className="mb-5">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Recipe Title
                    </label>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        defaultValue={loadRecipe?.title}
                        name="title"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Recipe Title"
                        required
                    />
                    {titleError && (
                        <p className="text-red-500 text-sm mt-1">{titleError}</p>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="ingredient"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Recipe Ingredients
                    </label>
                    <div className="flex flex-row ">
                        <input
                            type="text"
                            id="ingredient"
                            name="ingredient"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Recipe Ingredients"
                        />
                        <button
                            type="button"
                            onClick={handleAddIngredient}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ms-3"
                        >
                            Add
                        </button>
                    </div>
                    {ingredientsError && (
                        <p className="text-red-500 text-sm mt-1">{ingredientsError}</p>
                    )}
                    <ul>
                        {recipeData.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center">
                                <svg
                                    className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                {ingredient}
                                <button onClick={() => handleCancel(index)} className="ms-2">
                                    <MdCancel />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="instruction"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Recipe Instruction
                    </label>
                    <textarea
                        id="instruction"
                        onChange={handleInputChange}
                        name="instruction"
                        defaultValue={loadRecipe?.instruction}
                        rows="10"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Instruction"
                        required
                    ></textarea>
                    {instructionError && (
                        <p className="text-red-500 text-sm mt-1">{instructionError}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Edit;