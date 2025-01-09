import React from "react";
import { Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import styled from "styled-components"; // Import styled-components
import { useNavigate } from "react-router-dom";
import OrderView from "./OrderView";

// Define a styled component for the CardMedia
const StyledCard = styled(Card)`
   transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  &:hover {
    transform: scale(1.05); /* Slightly zoom in */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
     
`;

const LandView = ({ products, onAddToCart,cartItems =[]  }) => {
 
  const navigate = useNavigate();
  return (
    <section className="hero">
    
      <div id="images-section" className="hero-container">
        <Grid container spacing={4} sx={{ padding: "16px" }}>
          {products.map((item) => (
            <Grid item xs={6} sm={6} md={4} key={item.id}>
              <StyledCard
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.productName}
                  sx={{ height: 200 }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ₹{item.price}
                  </Typography>
                  <button
                    style={{
                      backgroundColor: "yellowgreen",
                      border: "none",
                      borderRadius: "10px",
                      padding: "10px",
                      cursor: "pointer",
                      float: "left",
                      transition: "color 0.3s ease",
                      fontWeight:"bold"
                    }}
                    onClick={() => onAddToCart(item)} // Add to cart
                  >
                    Add to Cart
                  </button>
                  <button
                    style={{
                      backgroundColor: "yellowgreen",
                      border: "none",
                      borderRadius: "10px",
                      padding: "10px",
                      cursor: "pointer",
                      float: "right",
                      fontWeight:"bold"
                    }}
                    onClick={()=>navigate("/ProductDetails", { state: {product: item } })}
                  >
                    Buy Now
                  </button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </div>
      <hr />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {cartItems.length > 0 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Items in Cart: {cartItems.length}
            </Typography>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
             
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LandView;
