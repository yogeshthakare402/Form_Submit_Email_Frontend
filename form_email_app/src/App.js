import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Form from './Components/Form';
import ShowForms from './Components/ShowForms';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Form/>}/>
          <Route path='/showdata' element={<ShowForms/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
