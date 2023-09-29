import './App.css';
import { GeneralStore } from './components/GeneralStore';
import { GraniteAccess } from './components/GraniteAccess';
import { Navbar } from './components/Navbar';
import { TrailMainHeading } from './components/TrailMainHeading'
import { UserAccount } from './components/UserAccount';

const App = () => {
  return (
    <nav>
      <Navbar />
      <TrailMainHeading />
      <GraniteAccess />
      <GeneralStore />
      <UserAccount />
    </nav>
  );
}

export default App;
