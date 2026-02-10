
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Success from './pages/Success';

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
