import './App.css';
import Panel from './components/panel/Panel.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Panel />
    </div>
  );
}

export default App;
