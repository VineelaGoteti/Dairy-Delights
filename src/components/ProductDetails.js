import React, { useState,useEffect } from "react";
import { Typography, Card, CardContent, TextField, Button, Grid, Snackbar, Alert, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

const ProductDetails = ({ handlePlaceOrder,handleUpdateCartItems}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const cartItems = location.state?.cartItems || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [items, setItems] = useState(
    product ? [{ ...product, quantity: 1 }] : cartItems.map(item => ({ ...item, quantity: 1 }))
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const totalPrice = items.reduce((sum, item) => sum + item.quantity * parseFloat(item.price || 0), 0);
  // Updates the form data when the user types in the input fields.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 // Updates the quantity of a product in the cart based on user actions (increase or decrease).
  const handleQuantityChange = (index, operation) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(0, item.quantity + (operation === "increase" ? 1 : -1)) }
          : item
      )
    );
   
    const updatedCartItems = items.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(0, item.quantity + (operation === "increase" ? 1 : -1)) }
        : item
    ).filter(item => item.quantity > 0); // Remove items with 0 quantity
  
    handleUpdateCartItems(updatedCartItems);
    
  };
   //Removes a product from the cart based on its index.
  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  
    const updatedCartItems = updatedItems.map(item => ({ ...item }));
    handleUpdateCartItems(updatedCartItems);
  };
  //Submits the order details to the server and handles success or error responses.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customer: { ...formData },
      items,
      totalPrice,
      date: new Date().toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:3001/orders", orderData);

      setSnackbarMessage("Order placed successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
      handlePlaceOrder();
    } catch (error) {
      console.error("Error placing order:", error);

      setSnackbarMessage("Error placing order. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  
  // useEffect to update the cart icon whenever items change
  useEffect(() => {
    handleUpdateCartItems(items); // Update the cart icon whenever `items` changes
  }, [items, handleUpdateCartItems]); // Only call this effect when items changes

  if (!items.length) {
    return <div style={{ textAlign: 'center' }}>
      <img
      src="../images/dairies/Image20241222223017.png" // Replace with the actual path to your image
      alt="No products"
      style={{ width: '250px', height: '240px', marginTop: '20px' }} // Adjust size and styling as needed
    />
    <Typography variant="h4">No products found.</Typography>
  </div>
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{item.productName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="h6">Price: ₹{item.price}</Typography>
                <div style={{ display: "flex", justifyContent:"center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleQuantityChange(index, "decrease")}
                    style={{ marginRight: "10px",borderRadius:"20px" }}
                  >
                    -
                  </Button>
                  <Typography variant="body1">{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleQuantityChange(index, "increase")}
                    style={{ marginLeft: "10px",borderRadius:"20px" }}
                  >
                    +
                  </Button>
                  <IconButton
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveItem(index)}
                    style={{marginLeft:"30px" }}
                  >
                    <DeleteIcon/>
                 </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Total Price: ₹{totalPrice}
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          required
          multiline
          rows={3}
          style={{ marginBottom: "10px" }}
        />
      
        <Button 
        type="submit" 
        variant="contained"
         color="primary" 
         style={{ marginRight: "10px" }} 
         // A callback function triggered when an order is successfully placed.

         onClick={handlePlaceOrder}>
          Place Order
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetails;
