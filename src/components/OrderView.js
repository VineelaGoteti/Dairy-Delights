import React from "react";
import { Typography, Grid, Card, CardContent, Button ,CardMedia} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Component to display cart items, manage navigation, and provide actions like placing an order or returning home.
const OrderView = ({ cartItems }) => {
  const navigate = useNavigate();   // Hook to navigate between routes.

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      <Grid container spacing={4}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.productName}
                  sx={{ height: 200, }}
                />
                  <Typography variant="h6">{item.productName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ₹{item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
           <div style={{justifyItems:'center'}}>
                <img
                src="../images/dairies/Image20241222223017.png" // Replace with the actual path to your image
                alt="No products"
                style={{ width: '250px', height: '240px', marginTop: '20px',alignItems:'center' }} // Adjust size and styling as needed
              />
          <Typography variant="h6" color="text.secondary" style={{justifyItems:'center'}}>
            Your cart is empty.
          </Typography>
          </div>
        )}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={()=>navigate("/ProductDetails", { state: {cartItems} })}
      > 
        Place Order
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/")}
        style={{ marginLeft: "10px", marginTop: "20px" }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default OrderView;
