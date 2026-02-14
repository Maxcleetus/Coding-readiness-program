import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Today from './pages/Today';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/today" element={<Today />} />
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
