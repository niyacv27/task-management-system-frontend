import React from 'react'

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {value}
          </h2>
        </div>

        <div className="text-3xl text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  )
}

export default StatCard