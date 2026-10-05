import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

function ThemeButton({ theme, toggleTheme }) {

    return (

        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition" title="Change theme">

            {theme === 'light' ? (

                <FaMoon className="text-gray-700" />

            ) : (

                <FaSun className="text-yellow-400" />

            )}

        </button>

    )

}

export default ThemeButton