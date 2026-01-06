import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BingoPage } from './pages/BingoPage';
import { TruthsPage } from './pages/TruthsPage';

function App() {
  return (
    <BrowserRouter basename="/soc">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bingo" element={<BingoPage />} />
        <Route path="/truths" element={<TruthsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
