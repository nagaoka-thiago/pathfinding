import './App.css';
import Grid from './components/Grid.js'
import Header from './components/Header.js'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-grid">
        <Grid rows={10} cols={20} />
      </div>
    </div>
  );
}

export default App;
