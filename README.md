# 📚 Book Store - Frontend

Frontend web application for the Book Store built with Vue.js framework.

## 🚀 Technologies Used

- **Vue.js 2** - Progressive JavaScript framework
- **Bootstrap 4** - CSS framework
- **Bootstrap-Vue** - Bootstrap components for Vue
- **Font Awesome** - Icon library

## 📋 Features

- Display list of available books with sorting
- Search functionality (search as you type)
- Add books to shopping cart
- Remove books from cart
- Checkout with form validation
- Real-time stock updates
- Responsive design

## 🔧 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run serve

# Build for production
npm run build

# Lint and fix files
npm run lint
```

## 🌐 Available Pages

### Books Page
- Browse available books
- Sort by title, genre, price, or stock
- Search across all fields
- Add books to cart

### Cart Page
- View items in cart
- Remove items
- See total price
- Proceed to checkout

### Checkout Page
- Enter name (letters only)
- Enter phone (numbers only)
- Form validation
- Submit order

## 🔍 Search Feature

The search functionality includes:
- Real-time search as you type
- Debouncing (300ms delay)
- Search across multiple fields (title, genre, price, stock)
- Case-insensitive matching
- Result count display

## 📦 Project Structure

```
frontend/
├── public/
│   └── index.html      # HTML template
├── src/
│   ├── App.vue         # Main application component
│   └── main.js         # Application entry point
├── package.json        # Dependencies
└── vue.config.js       # Vue configuration
```

## 🎨 UI Features

- Clean, modern interface
- Card-based layout
- Hover effects
- Responsive design
- Clear visual feedback
- Emoji icons for better UX

## 🔧 Configuration

### API URL Configuration

The app uses configurable API URL. To change:

1. Edit `src/App.vue` line 202
2. Or create `.env.production` file:
   ```
   VUE_APP_API_URL=https://your-backend-url.com
   ```

See `API_CONFIG.md` for more details.

## 🚀 Deployment

### GitHub Pages

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
# (follow GitHub Pages deployment instructions)
```

## 👤 Author

Student Coursework Project - Full Stack Web Development

## 📄 License

This is a coursework project for educational purposes.

