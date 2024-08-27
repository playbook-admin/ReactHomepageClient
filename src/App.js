import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frame from './components/navbar/Frame';
import Home from './components/home/Home';
import Albums from './components/albums/Albums';
import Photos from './components/photos/Photos';
import LoginOutForm from './components/user/LoginOutForm';
import Details from './components/details/Details';
import NotFound from './components/NotFound';
import { SessionUserProvider } from './components/user/SessionUserContext';
import { GlobalStateProvider } from './components/GlobalStateContext';

const App = () => {
  return (
    <GlobalStateProvider>
      <SessionUserProvider>
        <BrowserRouter>
          <Frame>
            <Routes>
              {/* Exact path for Home */}
              <Route path="/" element={<Home />} />
              
              {/* Non-exact paths */}
              <Route path="/albums" element={<Albums />} />
              <Route path="/photos/:albumId/:albumCaption" element={<Photos />} />
              <Route path="/details/:photoId/:albumId/:albumCaption" element={<Details />} />
              <Route path="/user" element={<LoginOutForm />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Frame>
        </BrowserRouter>
      </SessionUserProvider>
    </GlobalStateProvider>
  );
};

export default App;
