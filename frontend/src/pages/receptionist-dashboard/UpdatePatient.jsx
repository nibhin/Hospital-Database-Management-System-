import React, { useState } from 'react';
import '../../app.css'; // Import CSS file if needed

const UpdatePatient = () => {
  const [patientID, setPatientID] = useState('');
  const [updateField, setUpdateField] = useState('');
  const [newValue, setNewValue] = useState('');
  const [alertMessage, setAlertMessage] = useState('');  // State for alert message
  const [alertVisible, setAlertVisible] = useState(false);  // State for alert visibility

  const fields = [
    'P_name',
    'Ph_No',
    'Height_cm',
    'Weight_kg',
    'Gender',
    'Age',
    'Disease',
    'Med_prescribed',
    'Username',
    'Dr_id',
    'Park_id',
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/update_patient', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientID,
          updateField,
          newValue,
        }),
      });

      if (response.status === 404) {
        const result = await response.json();
        setAlertMessage(result.error);  // Set error message for not found
        setAlertVisible(true);  // Show alert
        return; // Early return to prevent further execution
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAlertMessage(result.message);  // Set success message
      setAlertVisible(true);  // Show alert

    } catch (error) {
      setAlertMessage('Error updating patient. Please try again.');  // Set error message for general errors
      setAlertVisible(true);  // Show alert
    }

    // Clear the fields after update
    setPatientID('');
    setUpdateField('');
    setNewValue('');
};


  // Handle alert close
  const handleCloseAlert = () => {
    setAlertVisible(false);  // Hide alert
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Update Patient Information</p>
        </div>
      </header>

      {/* Alert Section */}
      {alertVisible && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-6 my-4" role="alert">
          <strong className="font-bold">Alert!</strong>
          <span className="block sm:inline"> {alertMessage}</span>
          <span onClick={handleCloseAlert} className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M10 9.586L4.293 3.879 3.879 4.293 9.586 10l-5.707 5.707 0.414 0.414L10 10.414l5.707 5.707 0.414-0.414L10.414 10l5.707-5.707-0.414-0.414z"/>
            </svg>
          </span>
        </div>
      )}

      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300">
          <form className="space-y-4" onSubmit={handleUpdate}>
            <div>
              <label htmlFor="patientID" className="block font-medium">Patient ID:</label>
              <input
                type="text"
                id="patientID"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="updateField" className="block font-medium">Select Field to Update:</label>
              <select
                id="updateField"
                value={updateField}
                onChange={(e) => setUpdateField(e.target.value)}
                className="input-field"
                required
              >
                <option value="" disabled>Select an option</option>
                {fields.map((field, index) => (
                  <option key={index} value={field}>{field}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="newValue" className="block font-medium">New Value:</label>
              <input
                type="text"
                id="newValue"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
              Update Patient
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-blue-500 text-white text-center py-4">
        <p>&copy; 2024 CityCare Hospital | Your health, our priority.</p>
      </footer>
    </div>
  );
};

export default UpdatePatient;
