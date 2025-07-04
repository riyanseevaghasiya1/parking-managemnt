import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FaCalendarAlt, FaDownload } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import 'react-calendar/dist/Calendar.css';
import '../styles/report.css';

const Report = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample data - replace with your actual data
  const reportData = [
    {
      no: "01",
      date: "09 March 2024",
      vehicleNo: "TN 12 AB 5768",
      vehicleType: "Car",
      slotNo: "Level 1 - A6",
      inTime: "06:30 PM",
      outTime: "07:15 PM",
      totalTime: "45 Mins"
    },
    // Add more sample data here
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    // Here you would typically fetch data for the selected date
  };

  const handleDownload = () => {
    try {
      // Create PDF document
      const doc = new jsPDF();

      // Get page width for centering
      const pageWidth = doc.internal.pageSize.width;

      // Add centered title
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      const titleText = "Parking Report";
      const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const titleX = (pageWidth - titleWidth) / 2;
      doc.text(titleText, titleX, 20);

      // Add right-aligned date
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      const dateStr = selectedDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      const dateText = `Date: ${dateStr}`;
      const dateWidth = doc.getStringUnitWidth(dateText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const dateX = pageWidth - dateWidth - 14; // 14 is right margin
      doc.text(dateText, dateX, 30);

      // Prepare table data
      const tableData = Array(13).fill(reportData[0]).map((item, index) => [
        String(index + 1).padStart(2, '0'),
        item.date,
        item.vehicleNo,
        item.vehicleType,
        item.slotNo,
        item.inTime,
        item.outTime,
        index === 0 ? "45 Mins" : "01 hr"
      ]);

      // Generate table
      autoTable(doc, {
        startY: 40, // Increased startY to accommodate centered title and date
        head: [[
          'No.',
          'Date',
          'Vehicle No.',
          'Vehicle Type',
          'Slot No.',
          'In Time',
          'Out Time',
          'Total Time'
        ]],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: {
          fontSize: 9
        },
        styles: {
          cellPadding: 3,
          fontSize: 9,
          valign: 'middle',
          overflow: 'linebreak',
          cellWidth: 'auto'
        },
        columnStyles: {
          0: { cellWidth: 15 },  // No.
          1: { cellWidth: 25 },  // Date
          2: { cellWidth: 25 },  // Vehicle No.
          3: { cellWidth: 20 },  // Vehicle Type
          4: { cellWidth: 25 },  // Slot No.
          5: { cellWidth: 20 },  // In Time
          6: { cellWidth: 20 },  // Out Time
          7: { cellWidth: 20 }   // Total Time
        }
      });

      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }

      // Save the PDF
      const filename = `Parking-Report-${dateStr.replace(/ /g, '-')}.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report. Please try again.');
    }
  };

  return (
    <>
      <div className="report-header">
        <h1>Report</h1>
        <div className="report-actions">
          <div className="date-selector">
            <button
              className="today-button"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              Today <FaCalendarAlt />
            </button>
            {showCalendar && (
              <div className="calendar-popup">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="custom-calendar"
                />
              </div>
            )}
          </div>
          <button className="download-button" onClick={handleDownload}>
            Download <FaDownload />
          </button>
        </div>
      </div>
      <div className="report-container">
        <div className="report-table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Vehicle No.</th>
                <th>Vehicle Type</th>
                <th>Slot No.</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody>
              {Array(13).fill(reportData[0]).map((item, index) => (
                <tr key={index}>
                  <td>{String(index + 1).padStart(2, '0')}</td>
                  <td>{item.date}</td>
                  <td>{item.vehicleNo}</td>
                  <td>{item.vehicleType}</td>
                  <td>{item.slotNo}</td>
                  <td>{item.inTime}</td>
                  <td>{item.outTime}</td>
                  <td>{index === 0 ? "45 Mins" : "01 hr"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button className="prev-button">Prev</button>
          <div className="page-numbers">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>10</button>
          </div>
          <button className="next-button">Next</button>
        </div>
      </div>
    </>

  );
};
export default Report; 