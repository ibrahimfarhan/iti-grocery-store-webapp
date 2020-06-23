export const CONFIG = {
    home: { name: 'home', route: '/home' },
    admin: {
        name: 'admin', route: '/admin',
        children: {
            productsList: { name: 'products', route: '/admin/products' },
            newProduct: { name: 'products/add', route: '/admin/products/add' },
            editProduct: { name: 'products/:id/edit', route: '/admin/products/:id/edit' },
            categoriesList: { name: 'categories', route: '/admin/categories' },
            newCategory: { name: 'categories/add', route: '/admin/categories/add' },
            editCategory: { name: 'categories/:id/edit', route: '/admin/categories/:id/edit' },
            ordersList: { name: 'orders', route: '/orders' },
            orderDetails: { name: 'orders/:id', route: '/orders/:id'}
        }
    },
    products: {
        name: 'products', route: '/products',
        children: {
            productsList: { name: 'products', route: '/products' },
            productsByCategory: { name: ':category-name', route: '/products/:category-name'},
            productDetails: { name: 'product/:id', route: '/products/product/:id'}
        }
    }
};
