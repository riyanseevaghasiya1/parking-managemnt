import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteModal from '../components/DeleteModal';
import '../styles/employee.css';

const Employee = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sample employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Sunil Sharma',
      email: 'sunil021@gmail.com',
      aadharNo: '5412 6523 58964',
      mobile: '+91 898568569',
      shift: 'Shift 01',
      status: 'On Duty',
      image: '/path/to/image1.jpg'
    },
    {
      id: 2,
      name: 'Sunil Sharma',
      email: 'sunil021@gmail.com',
      aadharNo: '5412 6523 58964',
      mobile: '+91 898568569',
      shift: 'Shift 02',
      status: 'Off Duty',
      image: '/path/to/image2.jpg'
    },
    // Add more sample employees here
  ]);

  const handleSort = (type) => {
    let sortedEmployees = [...employees];
    
    switch(type) {
      case 'A to Z':
        sortedEmployees.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Status':
        sortedEmployees.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'Shift':
        sortedEmployees.sort((a, b) => a.shift.localeCompare(b.shift));
        break;
      default:
        break;
    }

    setEmployees(sortedEmployees);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedEmployee) {
      const updatedEmployees = employees.filter(emp => emp.id !== selectedEmployee.id);
      setEmployees(updatedEmployees);
      setShowDeleteModal(false);
      setSelectedEmployee(null);
    }
  };

  return (
    <>
      <div className="employee-header">
        <h2>Employee</h2>
        <div className="header-actions">
          <div className="sort-dropdown">
            <select onChange={(e) => handleSort(e.target.value)}>
              <option value="">Sort By</option>
              <option value="A to Z">A to Z</option>
              <option value="Status">Status</option>
              <option value="Shift">Shift</option>
            </select>
          </div>
          <button className="add-new-btn" onClick={() => navigate('/employee/add')}>
            + Add New
          </button>
        </div>
      </div>

      <div className="employee-container">
        <div className="employee-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Aadhar card No.</th>
                <th>Mobile No.</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <img src={employee.image} alt={employee.name} className="employee-image" />
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.aadharNo}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.shift}</td>
                  <td>
                    <ul className="status-list">
                      <li className={`status-badge ${employee.status === 'On Duty' ? 'on-duty' : 'off-duty'}`}>
                        • {employee.status}
                      </li>
                    </ul>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => navigate(`/employee/edit/${employee.id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(employee)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Employee; 