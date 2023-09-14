import cartsModel from "./models/carts.model.js";

export default class CartsDao {
  // Método asyncrono para obtener todos los carritos
  getAll = async () => {
    try {
      const result = await cartsModel.find().lean();
      return result;
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los carritos",
        data: error,
      });
    }
  };

  // Método asyncrono para obtener un carrito
  getOne = async (id) => {
    try {
      const cart = await cartsModel.findById(id).lean();
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({
          message: "Carrito no encontrado",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error al obtener el carrito",
        data: err,
      });
  };

  // Método asyncrono para crear un carrito
  saveCart = async (cart) => {
    try {
      const result = await cartsModel.create(cart);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para eliminar un producto del carrito
  updateCart = async (id, cart) => {
    try {
      const result = await cartsModel.updateOne({ _id: id }, cart);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para vaciar el carrito
  emptyCart = async (id, cart) => {
    try {
      const result = await cartsModel.updateOne({ _id: id }, cart);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para popular el carrito
  populatedCart = async (id) => {
    try {
      const result = await cartsModel.findById(id).populate("products.product");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}
