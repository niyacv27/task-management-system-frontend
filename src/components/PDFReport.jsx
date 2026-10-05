import React, { useState } from 'react'
import jsPDF from 'jspdf'
import { FaFilePdf } from 'react-icons/fa'
import Swal from 'sweetalert2'

function PDFReport({ task }) {

    const [loading, setLoading] = useState(false)


    const downloadPDF = () => {

        try {

            setLoading(true)


            const pdf = new jsPDF()


            // Title

            pdf.setFontSize(22)

            pdf.setFont("helvetica", "bold")

            pdf.text("TaskMate - Task Report", 20, 25)


            // Project name

            pdf.setFontSize(11)

            pdf.setFont("helvetica", "normal")

            pdf.text("Your Simple Task Management System", 20, 33)


            // Line

            pdf.line(20, 40, 190, 40)


            // Task title

            pdf.setFontSize(16)

            pdf.setFont("helvetica", "bold")

            pdf.text(task.title || "Untitled Task", 20, 55)


            // Description

            pdf.setFontSize(11)

            pdf.setFont("helvetica", "bold")

            pdf.text("Description:", 20, 70)

            pdf.setFont("helvetica", "normal")

            const descriptionLines = pdf.splitTextToSize(
                task.description || "No description available",
                160
            )

            pdf.text(descriptionLines, 20, 78)


            // Starting position for details

            let yPosition = 78 + descriptionLines.length * 6 + 15


            // Priority

            pdf.setFont("helvetica", "bold")

            pdf.text("Priority:", 20, yPosition)

            pdf.setFont("helvetica", "normal")

            pdf.text(task.priority || "N/A", 65, yPosition)

            yPosition += 12


            // Status

            pdf.setFont("helvetica", "bold")

            pdf.text("Status:", 20, yPosition)

            pdf.setFont("helvetica", "normal")

            pdf.text(task.status || "N/A", 65, yPosition)

            yPosition += 12


            // Deadline

            pdf.setFont("helvetica", "bold")

            pdf.text("Deadline:", 20, yPosition)

            pdf.setFont("helvetica", "normal")

            pdf.text(task.deadline || "N/A", 65, yPosition)

            yPosition += 12


            // Category

            pdf.setFont("helvetica", "bold")

            pdf.text("Category:", 20, yPosition)

            pdf.setFont("helvetica", "normal")

            pdf.text(task.category || "N/A", 65, yPosition)

            yPosition += 12


            // Assigned Person

            pdf.setFont("helvetica", "bold")

            pdf.text("Assigned Person:", 20, yPosition)

            pdf.setFont("helvetica", "normal")

            pdf.text(task.assignedPerson || "N/A", 65, yPosition)


            // Footer

            pdf.setFontSize(9)

            pdf.setTextColor(100)

            pdf.text("Generated from TaskMate — Task Management and Deadline Tracking System", 20, 280)


            // Download

            pdf.save(`${task.title || "Task"}-Task-Report.pdf`)


            // Success message

            Swal.fire({
                title: "PDF Downloaded",
                text: "Task report has been downloaded successfully.",
                icon: "success",
                timer: 1200,
                showConfirmButton: false
            })


        } catch (error) {

            console.log(error)

            Swal.fire(
                "Error",
                "Unable to generate PDF",
                "error"
            )

        } finally {

            setLoading(false)

        }

    }


    return (

        <button onClick={downloadPDF} disabled={loading} title="Download PDF" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50">

            <FaFilePdf />

            {loading ? "Generating..." : "Download PDF"}

        </button>

    )

}

export default PDFReport