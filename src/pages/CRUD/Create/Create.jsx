import React, { useState } from 'react';
import Swal from 'sweetalert2';
const Create = () => {
    const [titleError, setTitleError] = useState('');
    const [ingredientsError, setIngredientsError] = useState('');
    const [instructionError, setInstructionError] = useState('');
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: [],
        instruction: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setRecipeData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleIngredient = () => {
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
            ingredients: [...prevData.ingredients, newIngredient]
        }));
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
        fetch('https://recipe-web-app-server.vercel.app/recipes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(recipeData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Recipe Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    setRecipeData({
                        title: '',
                        ingredients: [],
                        instruction: ''
                    });

                }
            })
            .catch(error => {
                console.error('Error adding recipe:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} class="max-w-sm mx-auto my-5 txt">
                <div class="mb-5">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Title</label>
                    <input type="text" value={recipeData.title} onChange={handleInputChange} name='title' id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Recipe Title" required />
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
                            required
                        />
                        <button
                            onClick={handleIngredient}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/4  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ms-3"
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
                            </li>
                        ))}
                    </ul>
                </div>
                <div class="mb-5">
                    <label for="instruction" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Instruction</label>
                    <textarea id="instruction" value={recipeData.instruction} onChange={handleInputChange} name='instruction' rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Instruction" required></textarea>
                    {instructionError && (
                        <p className="text-red-500 text-sm mt-1">{instructionError}</p>
                    )}
                </div>


                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    );
};

export default Create;