import React from 'react';
import { useLoaderData } from 'react-router-dom';
import chef from '../../assets/chef.png'
const RecipeDetails = () => {
    const details = useLoaderData();
    const formattedInstructions = details?.instruction.replace(/\. /g, '.\n');
    return (
        <div className='py-5'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={chef} className="max-w-sm " />
                    <div>
                        <h1 className="text-5xl font-bold">{details?.title}</h1>
                        <div className='py-5'>
                            <h1 className='text-xl font-bold '>INGREDIENTS</h1>
                            <ul>
                                {details?.ingredients.map((ingredient, index) => (
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

                        <div className='py-5'>
                            <h1 className='text-xl font-bold '>INSTRUCTIONS</h1>
                            <p style={{ whiteSpace: 'pre-line' }}>{formattedInstructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;