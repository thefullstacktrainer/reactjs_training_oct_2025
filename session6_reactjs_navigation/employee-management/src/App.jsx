import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import ViewEmployee from './pages/ViewEmployee'; 
import EditEmployee from './pages/EditEmployee'; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/add" element={<AddEmployee />} />
        <Route path="employees/:id" element={<ViewEmployee />} /> 
        <Route path="employees/:id/edit" element={<EditEmployee />} /> 
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
