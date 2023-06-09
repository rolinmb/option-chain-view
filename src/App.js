import './App.css';
import { TimeSeries } from './TimeSeries';
import { FileList } from './FileList';
import { OptionChain } from './OptionChain';

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
