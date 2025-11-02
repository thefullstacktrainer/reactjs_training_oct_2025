import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import ViewEmployee from './pages/ViewEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeLayout from './pages/employees/EmployeeLayout';
import EmployeeStats from './pages/employees/EmployeeStats';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="/employees" element={<EmployeeLayout />}>
          <Route index element={<EmployeeList />} />
          <Route path="stats" element={<EmployeeStats />} />
          <Route path="add" element={<AddEmployee />} />
          <Route path=":id" element={<ViewEmployee />} />
          <Route path=":id/edit" element={<EditEmployee />} />
        </Route>



      </Route>
    </Routes>
  );
}
