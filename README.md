# Responsive React Ecommerce App 
 This project demonstrates a
 - Responsive Ecommerce app using React.js with
  - Redux for state mangement
  -  TailwindCss for styling
  -  Axios for api calls.
 
## Features

- Responsive Design: The interface adapts to various screen sizes and devices.
-  Displays a loading skeleton while fetching data.
-  Handles API errors and displays an error message (with react-hot-toast).
-  Infinite scroll pagination.
  
1. Product Listing Page (Home)
   Fetches and displays a list of products using the /products API endpoint.
   For each product, it shows: Image ,Name ,Price ,Category, RatingStars
   Sorting Options:
     - By price (ascending/descending).
     - By category.
   Pagination: Displays 10 products per page. (with an infinite scroll behaviour)
   Displays a message for empty product lists, "No products found".
   productCard contains + button to (add to cart) :
     - when the product is in cart its quantityInCart displayed inside button instead of +
     - on hover a updateQuantity buttons is displayed instead of quantityInCart
   "View Details" button that navigates to the Product Details Page.

2. Product Details Page
   Displays detailed information about the selected product:
     Image ,Title ,Description, Price,  RatingStars 
   Includes a "Back to Products" button to navigate back to the Product Listing Page.
   Includes a "Add To Cart" button :
     if product in cart show cart drawer
     if not add product to cart

3. Create Product Page
   Provides a form to create a new product with the following fields:
   Title (text input) ,Description (textarea) ,Price (number input) ,Category (dropdown fetched from /products/categories) ,Image URL (text input)
   Form Validation: (with Yup and Formik)
     All fields are required.
     Price must be a positive number.
   Submits the form via a POST request to the /products API endpoint.
   Displays a success message upon successful creation.
   Handles loading and error states during form submission.
   Disables the submit button during submission.

4. Cart
   Users can add products to the cart from: Product Listing Page, Product Details Page.
   Cart Page features:
     Displays selected products with image, name, quantity, and price.
     Calculates total price.
     Users can:
       Update product quantities.
       Remove products from the cart.
5. Authentication
     Implements login functionality using the /auth/login API endpoint.
       . Added a link to the form user can (continue as guest) to the home page
       . you can login with  username: "mor_2314", password: "83r5^_" or any other user from /users api
     Restricts access to the following pages for logged-in users:
        Create Product Page , Cart Page.
     Displays the logged-in user’s name (in the cart drawer above) and a (logout button) in the navigationBar.
     Persists the authentication state across page reloads using local storage.
   
## Deployment
 The app is hosted on Netlify. You can access the live version here: [https://reactt-e-commerce-app.netlify.app/]

## Usage

1. Navigate to the application in your browser.
2. Login with username ==> mor_2314, password ==> 83r5^_ (or any other user from /users api)

