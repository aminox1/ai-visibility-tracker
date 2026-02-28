import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  const [darkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-50`}>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
