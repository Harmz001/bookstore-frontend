<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">📚 Book Store</a>
        <button 
          class="btn btn-outline-light ml-auto" 
          @click="currentPage = 'cart'"
          :disabled="!cartItems.length">
          🛒 Cart ({{ cartItems.length }})
        </button>
      </div>
    </nav>

    <!-- Lesson List Page -->
    <div v-if="currentPage === 'lessons'" class="container mt-4">
      <div class="row mb-4">
        <div class="col-12">
          <h2>📋 Available Books</h2>
          
          <!-- Search Bar -->
          <div class="search-box mb-3">
            <label>🔍 Search Books:</label>
            <input 
              type="text" 
              class="form-control" 
              v-model="searchQuery"
              placeholder="Search by title or genre...">
          </div>

          <!-- Sort Controls -->
          <div class="sort-controls">
            <label>📊 Sort by:</label>
            <select class="form-control d-inline-block w-auto mx-2" v-model="sortBy">
              <option value="subject">Title</option>
              <option value="location">Genre</option>
              <option value="price">Price</option>
              <option value="spaces">Stock</option>
            </select>
            <select class="form-control d-inline-block w-auto" v-model="sortOrder">
              <option value="asc">⬆️ Ascending</option>
              <option value="desc">⬇️ Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 mb-4" v-for="lesson in filteredAndSortedLessons" :key="lesson.id">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ lesson.emoji }} {{ lesson.subject }}</h5>
              <p class="card-text">
                📚 Genre: {{ lesson.location }}<br>
                💰 Price: ${{ lesson.price }}<br>
                📦 In Stock: {{ lesson.spaces }}
              </p>
              <button 
                class="btn btn-primary w-100"
                @click="addToCart(lesson)"
                :disabled="lesson.spaces === 0">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- No Results Message -->
      <div v-if="filteredAndSortedLessons.length === 0" class="text-center mt-5">
        <h3>No books found 📚</h3>
        <p>Try adjusting your search query</p>
      </div>
    </div>

    <!-- Cart Page -->
    <div v-if="currentPage === 'cart'" class="container mt-4">
      <div class="row">
        <div class="col-12">
          <h2>🛒 Shopping Cart</h2>
          <button class="btn btn-outline-primary mb-4" @click="currentPage = 'lessons'">
            ⬅️ Back to Books
          </button>
        </div>
      </div>

      <div v-if="cartItems.length" class="row">
        <div class="col-md-8">
          <div class="card mb-3" v-for="item in cartItems" :key="item.id">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">{{ item.emoji }} {{ item.subject }}</h5>
                  <p class="card-text mb-0">
                    📚 {{ item.location }} | 💰 ${{ item.price }}
                  </p>
                </div>
                <button class="btn btn-danger" @click="removeFromCart(item)">
                  ❌ Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">💰 Order Summary</h5>
              <p class="card-text">
                Total Items: {{ cartItems.length }}<br>
                Total Price: ${{ cartTotal }}
              </p>
              <button 
                class="btn btn-success w-100"
                @click="currentPage = 'checkout'">
                💳 Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center mt-5">
        <h3>Your cart is empty 🛒</h3>
        <button class="btn btn-primary mt-3" @click="currentPage = 'lessons'">
          Continue Shopping
        </button>
      </div>
    </div>

    <!-- Checkout Form -->
    <div v-if="currentPage === 'checkout'" class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center">💳 Checkout</h2>
              <form @submit.prevent="submitOrder">
                <div class="form-group">
                  <label>🧍‍♂️ Name (letters only)</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="checkoutForm.name"
                    @input="filterLettersOnly"
                    pattern="[A-Za-z ]+"
                    required>
                </div>
                <div class="form-group">
                  <label>📞 Phone (numbers only)</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    v-model="checkoutForm.phone"
                    @input="filterNumbersOnly"
                    pattern="[0-9]+"
                    required>
                </div>
                <div class="text-center mt-4">
                  <button 
                    type="button" 
                    class="btn btn-outline-secondary mr-2"
                    @click="currentPage = 'cart'">
                    ⬅️ Back to Cart
                  </button>
                  <button 
                    type="submit" 
                    class="btn btn-success"
                    :disabled="!isCheckoutValid">
                    ✅ Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentPage: 'lessons',
      lessons: [],
      cartItems: [],
      sortBy: 'subject',
      sortOrder: 'asc',
      searchQuery: '',
      checkoutForm: {
        name: '',
        phone: ''
      }
    }
  },
  computed: {
    filteredLessons() {
      if (!this.searchQuery) {
        return this.lessons
      }
      const query = this.searchQuery.toLowerCase()
      return this.lessons.filter(lesson => {
        return lesson.subject.toLowerCase().includes(query) ||
               lesson.location.toLowerCase().includes(query)
      })
    },
    filteredAndSortedLessons() {
      return [...this.filteredLessons].sort((a, b) => {
        let modifier = this.sortOrder === 'asc' ? 1 : -1
        if (this.sortBy === 'price' || this.sortBy === 'spaces') {
          return (a[this.sortBy] - b[this.sortBy]) * modifier
        }
        return a[this.sortBy].localeCompare(b[this.sortBy]) * modifier
      })
    },
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price, 0)
    },
    isCheckoutValid() {
      const nameRegex = /^[A-Za-z ]+$/
      const phoneRegex = /^[0-9]+$/
      return nameRegex.test(this.checkoutForm.name) && 
             phoneRegex.test(this.checkoutForm.phone)
    }
  },
  created() {
    this.fetchBooks();
  },
  methods: {
    filterLettersOnly(event) {
      // Allow only letters and spaces
      this.checkoutForm.name = event.target.value.replace(/[^A-Za-z ]/g, '');
    },
    filterNumbersOnly(event) {
      // Allow only numbers
      this.checkoutForm.phone = event.target.value.replace(/[^0-9]/g, '');
    },
    async fetchBooks() {
      try {
        const response = await fetch('https://bookstore-backend-xd2r.onrender.com/api/books');
        const data = await response.json();
        this.lessons = data.map(book => ({
          ...book,
          id: book._id // Map MongoDB _id to id for frontend compatibility
        }));
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to load books. Please try again later.');
      }
    },
    async addToCart(lesson) {
      if (lesson.spaces > 0) {
        try {
          const response = await fetch(`https://bookstore-backend-xd2r.onrender.com/api/books/${lesson.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ spaces: lesson.spaces - 1 })
          });

          if (response.ok) {
            // Update local lessons array first
            const lessonIndex = this.lessons.findIndex(l => l.id === lesson.id);
            this.lessons[lessonIndex].spaces--;
            
            // Add updated item to cart with correct spaces value
            this.cartItems.push({...this.lessons[lessonIndex]});
          } else {
            throw new Error('Failed to update book stock');
          }
        } catch (error) {
          console.error('Error updating book stock:', error);
          alert('Failed to add book to cart. Please try again.');
        }
      }
    },
    async removeFromCart(item) {
      try {
        const response = await fetch(`https://bookstore-backend-xd2r.onrender.com/api/books/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ spaces: item.spaces + 1 })
        });

        if (response.ok) {
          const index = this.cartItems.findIndex(i => i.id === item.id);
          if (index > -1) {
            this.cartItems.splice(index, 1);
            const lessonIndex = this.lessons.findIndex(l => l.id === item.id);
            this.lessons[lessonIndex].spaces++;
          }
        } else {
          throw new Error('Failed to update book stock');
        }
      } catch (error) {
        console.error('Error updating book stock:', error);
        alert('Failed to remove book from cart. Please try again.');
      }
    },
    async submitOrder() {
      if (this.isCheckoutValid) {
        try {
          const orderData = {
            name: this.checkoutForm.name,
            phone: this.checkoutForm.phone,
            books: this.cartItems.map(item => ({
              id: item.id,
              subject: item.subject,
              price: item.price
            }))
          };

          const response = await fetch('https://bookstore-backend-xd2r.onrender.com/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
          });

          if (response.ok) {
            alert('✅ Order submitted successfully!');
            this.cartItems = [];
            this.checkoutForm.name = '';
            this.checkoutForm.phone = '';
            this.currentPage = 'lessons';
            await this.fetchBooks(); // Refresh books to get updated stock
          } else {
            throw new Error('Failed to submit order');
          }
        } catch (error) {
          console.error('Error submitting order:', error);
          alert('Failed to submit order. Please try again.');
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.card {
  transition: transform 0.2s;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.search-box {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.search-box input {
  margin-top: 5px;
}

.sort-controls {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.navbar {
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
  border-color: #80bdff;
}

.btn {
  border-radius: 5px;
  padding: 8px 16px;
}
</style>