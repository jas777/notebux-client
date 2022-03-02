import React, {createContext, useContext, useState} from 'react';

import './App.css';

import {
    Route,
    Routes
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NewNote from "./pages/NewNote";
import Register from "./pages/Register";
import NotePage from "./pages/Note";
import EditNote from "./pages/EditNote";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/nav/Navbar";
import {ProvideAuth} from './providers/auth';

// export const API_URL = 'https://api.notebux.xyz'
export const API_URL = 'http://localhost:8080'

type Theme = 'light' | 'dark';

interface ThemeContext {
    current: Theme,
    setTheme: (value: Theme) => void
}

const themeContext = createContext<ThemeContext>({
    current: 'light',
    setTheme: () => {}
})

export const useTheme = () => useContext(themeContext);

function App() {

    const [theme, setTheme] = useState<Theme>('light');

    const themeContextValue = {
        current: theme,
        setTheme: (value: Theme) => setTheme(value)
    }

    return (
        <themeContext.Provider value={themeContextValue}>
            <ProvideAuth>
                <div className={`w-full flex flex-col bg-background text-text theme-${theme}`}>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/new" element={<NewNote/>}/>
                        <Route path="/note" element={<NotePage/>}/>
                        <Route path="/edit" element={<EditNote/>}/>
                        <Route path="/verify_email" element={<VerifyEmail/>}/>
                    </Routes>
                </div>
            </ProvideAuth>
        </themeContext.Provider>
    );
}

export default App;
