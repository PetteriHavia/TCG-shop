# TCG-Shop Web-Based Storefront

This project replicates a real-world shopping experience, allowing users to easily browse, filter, add items to their cart, and view product details.


## Tech Stack Overview
This project utilizes the MERN Stack (MongoDB, Express, React, Node.js).
### Frontend
- React: For building dynamic user interfaces.
- React Router DOM: Enables seamless navigation between pages
- Redux Toolkit: Simplifies state management with an efficient and scalable approach
   - RTK Query: Integrated for handling data fetching and caching
- SASS: CSS preprocessor for organized and efficient styling

### Backend
- Express: Web framework for building RESTful APIs
- Mongoose: ODM for MongoDB, simplifying database interactions
- JSON Web Token (JWT): For secure user authentication and session management

## Functionality and Design

### Frontpage

The front page dynamically displays products that are either on sale or newly arrived, offering users a quick overview of the latest deals and additions
![Image Alt](https://github.com/PetteriHavia/TCG-shop/blob/ed36567c97099bae6b2e228df027128e5412eb0b/client/src/assets/readme_images/frontpage_full.jpg)

### Product Filtering
The Product Filter Page allows users to refine their search with several filters.
- Filter by type, on sale, new arrivals, and more.
- Toggle between grid view and list view layouts for displaying products.
- Use a quick filter dropdown to sort products alphabetically (A-Z), by price (low to high, high to low), and other parameters.
![Image Alt](https://github.com/PetteriHavia/TCG-shop/blob/ed36567c97099bae6b2e228df027128e5412eb0b/client/src/assets/readme_images/productfilter_full.jpg)
![Image Alt](https://github.com/PetteriHavia/TCG-shop/blob/ed36567c97099bae6b2e228df027128e5412eb0b/client/src/assets/readme_images/productfilter_list.jpg)

### Single Product Views
- For products with different category type (e.g single cards), the page dynamically displays all available conditions with their respective prices.
- For standard products, the page renders a static price that has been predefined for that item.
![Image Alt](https://github.com/PetteriHavia/TCG-shop/blob/ed36567c97099bae6b2e228df027128e5412eb0b/client/src/assets/readme_images/single_product_card.jpg)
![Image Alt](https://github.com/PetteriHavia/TCG-shop/blob/ed36567c97099bae6b2e228df027128e5412eb0b/client/src/assets/readme_images/single_product_page%20(2).jpg)

### Cart & Checkout
- Add products to the cart
- View and manage selected items before finalizing the order
![Image Alt](https://github.com/PetteriHavia/TCG-shop/blob/ed36567c97099bae6b2e228df027128e5412eb0b/client/src/assets/readme_images/checkout__preview_page.jpg)
