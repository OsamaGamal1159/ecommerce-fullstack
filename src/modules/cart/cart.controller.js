import Cart from "./cart.model.js";
import Product from "../product/product.model.js";
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

const addToCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product Not Found" });
    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color,
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );

        await cart.save();
        return res.status(200).json(cart);
      }
    } else {
      const newCart = await Cart.create({
        userId: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
      });
    }
  } catch (error) {}
};
