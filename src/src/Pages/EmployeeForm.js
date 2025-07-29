import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/employeeForm.css';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    aadharNo: '',
    mobile: '',
    joiningDate: '',
    gender: '',
    shift: '',
    address: '',
    image: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (isEdit) {
      // Fetch employee data by ID and set form data
      // This is sample data, replace with actual API call
      setFormData({
        name: 'Sunil Sharma',
        email: 'sunil021@gmail.com',
        aadharNo: '5412 6523 58964',
        mobile: '+91 898568569',
        joiningDate: '2024-03-13',
        gender: 'Male',
        shift: 'Shift 01',
        address: '143, Saket District Centre, New delhi',
        image: 'Image 01'
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFormData(prev => ({
        ...prev,
        image: file.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
    // Navigate back to employee list
    navigate('/employee');
  };

  return (
    <div className="employee-form-container">
      <h1>{isEdit ? 'Edit Employee' : 'Add Employee'}</h1>
      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              placeholder="Aadhar card No."
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile No."
              required
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              placeholder="Joining Date"
              required
            />
          </div>

          <div className="form-group">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <select
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              required
            >
              <option value="">Select Shift</option>
              <option value="Shift 01">Shift 01</option>
              <option value="Shift 02">Shift 02</option>
              <option value="Shift 03">Shift 03</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              value="6:00AM to 02:00PM"
              readOnly
              className="time-display"
            />
          </div>

          <div className="address-image-row">
            <div className="form-group">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
            </div>

            <div className="form-group">
              <div className="image-upload">
                <input
                  type="text"
                  value={formData.image}
                  placeholder="Image"
                  readOnly
                />
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload" className="upload-button">
                  CHOOSE
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {isEdit ? 'Save Changes' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm; 