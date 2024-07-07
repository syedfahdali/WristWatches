import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App">
      <div className="fixed-header">
        <Header />
      </div>
      <div className="content-wrap">
        <main className="py-4" style={{ marginTop: '150px' }}>
          <Outlet />
          <ScrollToTop></ScrollToTop>

        </main>
      </div>
      <footer className="fixed-footer" style={{ marginTop: 'calc(100vh - 300px)' }}>
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;
