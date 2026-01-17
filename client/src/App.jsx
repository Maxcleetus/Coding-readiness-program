// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Today from './pages/Today';
import Antigravity from './components/Antigravity';
import Navbar from './components/Navbar';



function App() {
  return (
    <div>
      <div style={{
        background: "black",
        zIndex: '-1',
        width: '100%',
        height: '100vh',
        position: 'fixed'
      }}>
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={5}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={0.3}
          lerpSpeed={0.05}
          color={'#FF9FFC'}
          autoAnimate={true}
          particleVariance={1}
        />
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/today" element={<Today />} />
      </Routes>
    </div>
  );
}

export default App