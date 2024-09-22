const User = require("../../models/userSchema");
const Product = require("../../models/productSchema");



const loadWishlist = async (req, res) => {
  try {
    const userId = req.session.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.redirect("/pageNotFound");
    }
    const products = await Product.find({ _id: { $in: user.wishlist } });

    res.render("wishlist", {
      user,
      wishlist: products,
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/pageNotFound");
  }
};


const addToWishlist = async (req, res) => {
  try {
    const productId = req.body.productId;
    const userId = req.session.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
  
    if (user.wishlist.includes(productId)) {
      return res.status(200).json({ status: false, message: 'Product already in wishlist' });
    }
    user.wishlist.push(productId);
    await user.save();

    return res.status(200).json({ status: true, message: 'Product added to wishlist', wishlistLength: user.wishlist.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};


const removeProduct = async (req, res) => {
  try {
    const productId = req.query.productId;
    const userId = req.session.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ status: false, message: 'Product not found in wishlist' });
    }
    user.wishlist.splice(index, 1);
    await user.save();
    console.log("Product removed from wishlist");
    return res.redirect('/wishlist'); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

module.exports = {
    loadWishlist,
    addToWishlist,
    removeProduct
}
