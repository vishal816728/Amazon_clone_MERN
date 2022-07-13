const bcrypt=require('bcrypt')
const salt=10
const data = {
  users:[
         {
             name:"Vishal",
             email:"admin@example.com",
             password:bcrypt.hashSync('12345',salt),
             isAdmin:true

         },
         {
          name:"john",
          email:"user@example.com",
          password:bcrypt.hashSync('12345',salt),
          isAdmin:false
         }
  ],
    products: [
      {
        // _id:"1",
        name: 'Nike Slim shirt',
        slug: 'nike-slim-shirt',
        category: 'Shirts',
        image: '/images/p1.jpg', // 679px × 829px
        originalprice:999,
        price: 420,
        countInStock: 10,
        brand: 'Nike',
        rating: 5,
        numReviews: 1322,
        description: 'high quality shirt',
      },
      {
        // _id:"2",
        name: 'Adidas Fit Shirt',
        slug: 'adidas-fit-shirt',
        category: 'Shirts',
        image: '/images/p2.jpg',
        originalprice:1299,
        price: 250,
        countInStock: 20,
        brand: 'Adidas',
        rating: 4,
        numReviews: 2321,
        description: 'high quality product',
      },
      {
        // _id:"3",
        name: 'Nike Slim Pant',
        slug: 'nike-slim-pant',
        category: 'Pants',
        image: '/images/p3.jpg',
        originalprice:999,
        price: 425,
        countInStock: 15,
        brand: 'Nike',
        rating: 3,
        numReviews: 132,
        description: 'high quality product',
      },
      {
        // _id:"4",
        name: 'Adidas Fit Pant',
        slug: 'adidas-fit-pant',
        category: 'Pants',
        image: '/images/p4.jpg',
        originalprice:799,
        price: 555,
        countInStock: 0,
        brand: 'Puma',
        rating: 4,
        numReviews: 1876,
        description: 'high quality product',
      },
      
    ],
  };

 module.exports=data 