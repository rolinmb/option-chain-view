import './App.css';
import { TimeSeries } from './components/TimeSeries';
import { FileList } from './components/FileList';
import { ChainPanel } from './components/ChainPanel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Option Chain View</h1>
      </header>
      <TimeSeries />
      <FileList />
      <ChainPanel />
    </div>
  );
}

export default App;
