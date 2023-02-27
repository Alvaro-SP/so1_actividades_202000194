import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import About from './components/About/About';
import Help from './components/Help/Help';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  return (
    <AuthProvider>
      <Container fluid className="ps-0 pe-0">
        <Routes>
          <Route path="/" element={<Layout component={Dashboard} />} />
          <Route path="/about" element={<Layout component={About} />} />
          <Route path="/help" element={<Layout component={Help} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
