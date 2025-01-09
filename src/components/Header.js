import React, { useState, useEffect } from 'react';
import { Home, ShoppingCart, Phone, AccountCircle } from '@mui/icons-material';
import { IconButton, Badge, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';

const Header = ({ cartItems =[], onCategoryClick }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check authentication status
  //   const authStatus = localStorage.getItem('isAuthenticated');
  //   if (authStatus === 'true') {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      // Logout
      // localStorage.setItem('isAuthenticated', 'false');
     
      navigate('/order-requests');
    } else {
      // Login
      navigate('/login');
      setIsAuthenticated(true);
    }
  };

  return (
    <header className="header">
      <div>
      <figure id="logotext" style={{ display: 'flex', alignItems: 'center' }}>
        {/* Logo Image */}
        <img
          src="../images/dairies/tyb6_oteh_211109-removebg-preview.png" // Replace with the path or URL of your image
          alt="Diary Delights Logo"
          style={{ width: '50px', height: '50px', marginRight: '40px', transform: 'scale(1.5)', // Scale the image larger
            transformOrigin: 'center', // Keep the image centered
             }} // Adjust size and spacing as needed
        />
      <div>

          <h1>Diary delights</h1>
          <h3 id="logot">Celebrate Your Moment</h3>
          </div>
        </figure>
        <div className="IconContainer" style={{ marginLeft: '1000px', paddingTop: '18px', color: 'gray' }}>
          <IconButton color="inherit" aria-label="home" onClick={() => navigate('/')}>
            <Home />
          </IconButton>
          <IconButton color="inherit" aria-label="cart items count"
          // sx={{
          //   color: 'white', // Icon color (you can change it to your desired color)
          // }}
          >
            <Badge badgeContent={cartItems.length} color="error"
            // sx={{
            //   '.MuiBadge-dot': { backgroundColor: 'white' }, // Badge dot color (optional)
            // }}
             onClick={() => navigate('/OrderView')}>
              <ShoppingCart sx={{ color: 'white' }}/>
            </Badge>
          </IconButton>
          <IconButton color="inherit" aria-label="phone">
            <Phone />
          </IconButton>
          <IconButton color="inherit" aria-label="profile" onClick={handleLoginLogout}>
          <FaBoxOpen />
          </IconButton>
        </div>
      </div>
      <nav className="navbar" data-testid="links">
        <ul className="nav-links">
          <li>
            <a href="#" onClick={() => { onCategoryClick(""); handleScrollToSection("images-section");  }}>All</a>
          </li>
          <li>
            <a href="#milk" onClick={() => { onCategoryClick("milk"); handleScrollToSection("images-section"); }}>Milk</a>
          </li>
          <li>
            <a href="#butter" onClick={() => { onCategoryClick("butter"); handleScrollToSection("images-section"); }}>Butter</a>
          </li>
          <li>
            <a href="#cheese" onClick={() => { onCategoryClick("cheese"); handleScrollToSection("images-section"); }}>Cheese</a>
          </li>
          <li>
            <a href="#curd" onClick={() => { onCategoryClick("curd"); handleScrollToSection("images-section"); }}>Curd</a>
          </li>
          <li>
            <a href="#cream" onClick={() => { onCategoryClick("cream"); handleScrollToSection("images-section"); }}>Cream</a>
          </li>
          <li>
            <a href="#yogurt" onClick={() => { onCategoryClick("yogurt"); handleScrollToSection("images-section"); }}>Yogurt</a>
          </li>
          <li>
            <a href="#paneer" onClick={() => { onCategoryClick("paneer"); handleScrollToSection("images-section"); }}>Paneer</a>
          </li>
          <li>
            <a href="#ghee" onClick={() => { onCategoryClick("ghee"); handleScrollToSection("images-section"); }}>Ghee</a>
          </li>
        </ul>
      </nav>
        {/* Location City Section */}
        <div
  className="location-section"
  style={{
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    marginTop: '10px',
    border: '1px solid gray', // Optional: Add a border
    backgroundColor: '#282c34',
    position: 'relative',
    height: '100px'
  }}
>
  {/* Delivery Guy Image */}
 
  {/* Delivery Locations */}
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      overflowX: 'auto', // Enables horizontal scrolling
      whiteSpace: 'nowrap', // Prevents wrapping
      flexGrow: 1, // Takes up remaining space
    }}
  >
    <span style={{ marginRight: '50px', fontWeight: 'bold', color: '#fff',marginLeft:'45px'}}>We Deliver in:</span>
    <a href ="Hyderabad" style={{ marginRight: '50px', color: '#fff' }}>Hyderabad</a>
    <a href ="Bengaluru" style={{ marginRight: '50px', color: '#fff' }}>Bengaluru</a>
    <a href ="Mumbai" style={{ marginRight: '50px', color: '#fff' }}>Mumbai</a>
    <a href="Chennai" style={{ marginRight: '50px', color: '#fff' }}>Chennai</a>
    <a href= "Delhi NCR" style={{ marginRight: '50px', color: '#fff' }}>Delhi NCR</a>
    <a href= "Delhi NCR" style={{ marginRight: '50px', color: '#fff' }}>Kolkata</a>
    <h1 style={{fontFamily: 'cursive', fontStyle:'italic', color:'white', marginLeft: '90px'}} >to your home....</h1>
    <img
    src="../images/dairies/delivery-boy.png" // Replace with the correct path to your image
    alt="Diary Delights Logo"
    style={{
      width: '150px', // Adjust size
      height: '150px', 
      overflow:'hidden',// Adjust size
      marginRight: '20px', // Space between image and text
      objectFit: 'contain', // Ensure proper scaling
    }}
  />

    </div>
    </div>

    </header>
  );
};

export default Header;
