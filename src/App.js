import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './component/auth/auth';
import HomePage from './component/pages/homePage';
import NavBar from './component/common/navbar';
import AboutUs from './component/pages/AboutUs';
import Footer from './component/common/Footer';
import ContactUs from './component/pages/ContactUs';
function App() {
  return (
    <div className=' flex flex-col w-full max-w-[1600px] mx-auto'>
    <NavBar/>
      <Routes>
        <Route exact path="*" element={<HomePage/>} />
        <Route path="/Login" element={<AuthPage/>} />
        <Route path="/Signup" element={<AuthPage/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
    </Routes>

    <div className="min-w-full bg-gradient-to-r from-purple-50 to-blue-50 border mx-auto overflow-hidden">
    <Footer/>
    </div>

    </div>
   
  );
}

export default App;
