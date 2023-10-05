import './App.css';
import { GeneralStore } from './components/GeneralStore';
import { GraniteAccess } from './components/GraniteAccess';
import { Items } from './components/Items';
import { Navbar } from './components/Navbar';
import { TrailMainHeading } from './components/TrailMainHeading'
import { UserAccount } from './components/UserAccount';

const App = () => {
  return (
    <>
      <Navbar />
      <TrailMainHeading />
      <GraniteAccess />
      <GeneralStore />
      <UserAccount />
      <Items />
    </>
  );
}

export default App;
