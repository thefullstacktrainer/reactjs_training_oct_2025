import React from 'react';
import StudentFormRedux from './components/StudentFormRedux';
import StudentListRedux from './features/students/StudentListRedux';

function AppRedux() {
  return (
    <div>
      <h2>Career Guidance Portal - Student Registration (Classic Redux)</h2>
      <StudentFormRedux />
      <StudentListRedux />
    </div>
  );
}

export default AppRedux;
