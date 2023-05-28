import './app.css'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainWebsite from './mainComponents/mainwebsite';
import Forum from './mainComponents/forum'
import SignIn from './mainComponents/signin';
import SignUp from './mainComponents/signup';

const App = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainWebsite />} />
                <Route path="Forum" element={<Forum />} />
                <Route path="SignIn" element={<SignIn />} />
                <Route path="SignUp" element={<SignUp />} />
            </Routes>
        </BrowserRouter>


    )
}

export default App;