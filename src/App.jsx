import './App.css'
import { Route, Routes } from 'react-router-dom';
import AuctionDashboard from './pages/AuctionDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuctionDashboard />} />
      </Routes>

    </>
  )
}

export default App