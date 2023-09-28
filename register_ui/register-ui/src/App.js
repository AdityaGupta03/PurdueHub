import logo from './logo.svg';
import Register from './Register';
import Login from './Login';
import './App.css';

function App() {
  
  return (
    <main className="App">
      {/* Self Contained Component To Call From  <Register /> */}
       <Login />
    </main>
  );
}

export default App;
