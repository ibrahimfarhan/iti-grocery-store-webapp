const apiRoutes1 = {
  login: '/api/user/login',
  register: '/api/user/register',

  getAllProducts: '/api/products/all',
  getProducts: '/api/products',

  getCategories: '/api/categories',
  addCategory: '/api/categories/add',
  editCategory: '/api/categories/edit',
  deleteCategory: '/api/categories/delete',

  getCartProducts: '/api/cart-products',
  addCartProduct: '/api/cart-products/add',
  editCartProduct: '/api/cart-products/edit',
  deleteCartProduct: '/api/cart-products/delete',

  addProduct: '/api/products/add',
  deleteProduct: '/api/products/delete',
  editProduct: '/api/products/edit',

  getCurrentUser: '/api/user'
};

for (const key in apiRoutes1) {
  if (apiRoutes1.hasOwnProperty(key)) {
    apiRoutes1[key] = `http://localhost:5000${apiRoutes1[key]}`;
  }
}

export const apiRoutes = apiRoutes1;
