# OneMart - Full Stack E-Commerce Platform

OneMart is a modern, full-stack e-commerce platform built with React, Node.js, and MongoDB. It provides a complete shopping experience with user authentication, product management, shopping cart, order processing, and payment integration.

## 🚀 Features

### User Features
- **User Authentication**: Register, login, and Google OAuth authentication
- **Product Browsing**: Browse products by categories and collections
- **Product Details**: View detailed product information with images
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Management**: Place orders and track order history
- **Payment Integration**: Secure payment processing with Razorpay
- **User Profile**: Manage user profile and preferences

### Admin Features
- **Admin Dashboard**: Comprehensive admin panel for managing the platform
- **Product Management**: Add, edit, delete, and manage products
- **Order Management**: View and manage customer orders
- **User Management**: Monitor and manage user accounts
- **Image Upload**: Upload product images using Cloudinary

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage and management
- **Razorpay** - Payment gateway
- **Multer** - File upload handling

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Firebase** - Google OAuth authentication
- **React Toastify** - Notification system
- **React Icons** - Icon library

### Admin Panel
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 📁 Project Structure

```
oneMart/
├── backend/          # Backend API server
│   ├── config/       # Database and cloudinary configuration
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Authentication and file upload middleware
│   ├── model/        # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Server entry point
├── frontend/         # User-facing React application
│   ├── src/
│   │   ├── component/  # Reusable components
│   │   ├── context/    # React context providers
│   │   ├── pages/      # Page components
│   │   └── utils/      # Utility functions
│   └── public/       # Static assets
└── admin/           # Admin panel React application
    ├── src/
    │   ├── component/  # Reusable components
    │   ├── context/    # React context providers
    │   └── pages/      # Admin pages
    └── public/       # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)
- Razorpay account (for payments)
- Firebase project (for Google OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oneMart
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install admin dependencies**
   ```bash
   cd ../admin
   npm install
   ```

### Environment Variables

1. **Backend Environment Variables** (`backend/.env`)
   ```env
   PORT=8000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_NAME=your_cloudinary_cloud_name
   CLOUDINARY_APIKEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

2. **Frontend Environment Variables** (`frontend/.env`)
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   ```

3. **Admin Environment Variables** (`admin/.env`)
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend server will run on `http://localhost:8000`

2. **Start the frontend application** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Start the admin panel** (in a new terminal)
   ```bash
   cd admin
   npm run dev
   ```
   The admin panel will run on `http://localhost:5174`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/googleLogin` - Google OAuth login
- `POST /api/auth/adminlogin` - Admin login
- `GET /api/auth/logout` - User logout

### Products
- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/product` - Create product (Admin only)
- `PUT /api/product/:id` - Update product (Admin only)
- `DELETE /api/product/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/order` - Get user orders
- `POST /api/order` - Create order
- `GET /api/order/:id` - Get order by ID

### Users
- `GET /api/user` - Get user profile
- `PUT /api/user` - Update user profile

## 🎨 Features in Detail

### Authentication System
- JWT-based authentication
- Password hashing with bcryptjs
- Google OAuth integration via Firebase
- Protected routes with middleware
- Admin authentication separate from user authentication

### Product Management
- CRUD operations for products
- Image upload to Cloudinary
- Product categories and filtering
- Product search functionality

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (stored in database)
- Cart total calculation

### Order Management
- Order creation
- Order history
- Order status tracking
- Integration with Razorpay for payments

### Image Management
- Cloudinary integration for image storage
- Image upload via Multer middleware
- Automatic image optimization

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- CORS configuration
- Input validation
- Secure file upload handling

## 🧪 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

### Admin Development
```bash
cd admin
npm run dev  # Vite dev server with hot reload
```

## 📦 Building for Production

### Build Frontend
```bash
cd frontend
npm run build
```

### Build Admin
```bash
cd admin
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

PAWNESH

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Cloudinary for image storage
- Razorpay for payment integration
- Firebase for authentication services
- Tailwind CSS for the utility-first CSS framework

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Note**: Make sure to set up all environment variables before running the application. The application requires MongoDB, Cloudinary, Razorpay, and Firebase credentials to function properly.

