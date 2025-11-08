import React from 'react';
import { connect } from 'react-redux';
import { removeStudent } from './studentActions';

function StudentListRedux({ students, removeStudent }) {
  return (
    <div>
      <h2>Registered Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <span>{student.name}</span>
            <button onClick={() => removeStudent(student.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  students: state.students.list,
});

const mapDispatchToProps = {
  removeStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentListRedux);
