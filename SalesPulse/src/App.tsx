import { BrowserRouter as Router } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import './index.css';

function App() {
  return (
    <Router>
      <DashboardLayout />
    </Router>
  );
}

export default App;