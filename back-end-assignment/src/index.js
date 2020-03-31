const express = require('express');
const cors = require('cors');
const {ApolloServer,gql} = require("apollo-server-express");

const app = express();
app.use(cors());

const categoryList = [
  {
    id: '1',
    name: 'Laptops',
  },
  {
    id: '2',
    name: 'Mobile',
  },
  {
    id: '3',
    name: 'Speaker',
  },
];

const productsList = [
  {
    id: '1',
    name: 'Asus 13 inch laptop',
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    category:["1"]
  },
  {
    id: '2',
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: 'Lenovo Laptop',
    category:["1"]
  },
  {
    id: '3',
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: 'MI A1',
    category:["2"]
  },
  {
    id: '4',
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: 'MI A2',
    category:["2"]
  },
  {
    id: '5',
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: 'Sony Speaker',
    category:["3"]
  },
  {
    id: '6',
    name: 'Boats Speaker',
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    category:["3"]
  },
];
 

const schema = gql`
  type Query {
    getCategory(id:String!): Category
    getCategories:[Category]
    getProduct(id:String!):Product
    getProducts:[Product]
    getProductBycategory(categoryId:String):[Product]
  }

  type Category{
    id:String
    name:String
  }

  type Product{
    id:String
    name:String
    description:String
    category:[String]
  }
`;

const resolvers = {
  Query: {
    getCategory: (parent,args) => {
      console.log("getCategory called",args);
      const {id} = args;
      console.log("list of category",categoryList);
      let category = categoryList.find(item=>item.id == id);
      console.log("onfilter",category);
      return category;
    },
    getCategories:(parent,args)=>{
      return categoryList;
    },
    getProduct:(parent,args)=>{
      const {id} = args;
      let product = productsList.find(item=>item.id == id);
      return product;
    },
    getProducts:(parent,args)=>{
       return productsList;
    },
    getProductBycategory:(parent,args)=>{
       const { categoryId } = args;
       let products = productsList.filter(item=> item.category.includes(categoryId));
       return products;
    }
  },
};

const server  = new ApolloServer({
  typeDefs:schema,
  resolvers
});

server.applyMiddleware({app,path:'/graphql'});

app.listen({port:8000},()=>{
  console.log('Apollo server running on http://localhost:8000/graphql');
});