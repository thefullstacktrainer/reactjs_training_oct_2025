import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addStudent } from '../features/students/studentActions';

function StudentFormRedux({ addStudent }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;

    const newStudent = { id: Date.now(), name };
    addStudent(newStudent);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Student</button>
    </form>
  );
}

const mapDispatchToProps = {
  addStudent,
};

export default connect(null, mapDispatchToProps)(StudentFormRedux);
