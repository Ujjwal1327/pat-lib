import React from 'react'

export default function Loading() {
    return (
        Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="animate-pulse duration-900">
                <td className="px-4 py-3">
                    <div className="bg-gray-300 rounded h-6 w-32"></div>
                </td>
                <td className="px-4 py-3">
                    <div className="bg-gray-300 rounded h-6 w-32"></div>
                </td>
                <td className="px-4 py-3">
                    <div className="bg-gray-300 rounded h-6 w-32"></div>
                </td>
                <td className="px-4 py-3">
                    <div className="bg-gray-300 rounded h-6 w-32"></div>
                </td>
                <td className="px-4 py-3">
                    <div className="bg-gray-300 rounded h-6 w-32"></div>
                </td>
                <td className="px-4 py-3">
                    <div className="bg-gray-300 rounded h-6 w-32"></div>
                </td>
            </tr>
        ))
    )
}
