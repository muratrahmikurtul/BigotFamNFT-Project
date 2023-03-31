import './App.css';
import { useState } from "react";
import MainMint from './MainMint';
import NavBar from './NavBar';
import BackgroundVideo from "./BackgroundVideo";

function App() {
    const [accounts, setAccounts] = useState([]);

    return (
        <div className="App">
            <NavBar accounts={accounts} setAccounts={setAccounts}></NavBar>
            <MainMint accounts={accounts} setAccounts={setAccounts}></MainMint>
            <BackgroundVideo></BackgroundVideo>
        </div>
    );
}

export default App;
