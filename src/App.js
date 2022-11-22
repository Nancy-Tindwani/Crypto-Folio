import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import "./App.css";
import CoinPage from "./Pages/CoinPage";
import Alert from './components/Alert';
function App() {
  //const classes = useStyles();

  return (
    <div style={{ backgroundColor: '#14161a', color: 'white', minHeight: '100vh' }}>
      {/* <HomePage/> */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        <Alert/>
      </Router>

    </div>

  );
}

export default App;