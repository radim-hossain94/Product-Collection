const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const { name, price, description } = req.body;

  if (!name) {
    return res.status(401).json({
      error: "Product name is missing",
    });
  }
  if (!price) {
    return res.status(401).json({
      error: "Price is missing",
    });
  }

  const find_product = await Product.findOne({name});
  if(find_product){
    return res.json({error: "Product already exists"});
  }

  const product = await new Product({
    name,
    price,
    description,
  }).save();

  res.json({
    product:{
        name: product.name,
        price: product.price,
        descripton: product.description
    }
  })
};

exports.getAllProduct = async (req, res) =>{
    try {
        let products = await Product.find({}, "name price -_id");

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve products" });
    }
}