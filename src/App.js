import './App.css';
import { TimeSeries } from './components/TimeSeries';
import { FileList } from './components/FileList';
import { OptionChain } from './components/OptionChain';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Option Chain Surface Visualizations</h1>
      </header>
      <TimeSeries />
      <FileList />
      <OptionChain />
    </div>
  );
}

export default App;
