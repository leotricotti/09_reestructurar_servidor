import { PRODUCTSDAO } from "../dao/index.dao";
import { USERSDAO } from "../dao/index.dao";

// Método asyncrono para obtener todos los productos
async function getAll(req, res) {
  const { limit, page, sort, category } = req.query;
  try {
    const role = req.session.user[0]?.role ?? req.session.user.role;
    const sessionUser = req.session.user[0]?.email ?? req.session.user.email;
    const user = await USERSDAO.getOne(sessionUser);
    const response = await PRODUCTSDAO.getAll();
    if (limit) {
      const tempArray = response.slice(0, limit);
      res.render("products", {
        products: tempArray,
        styles: "products.styles.css",
        user: user[0].first_name,
        admin: role,
      });
    } else if (category) {
      let filteredProducts = await PRODUCTSDAO.filteredProducts(category);
      res.render("products", {
        products: filteredProducts.docs,
        styles: "products.styles.css",
        user: user[0].first_name,
        admin: role,
      });
    } else if (sort) {
      let orderedProducts = await PRODUCTSDAO.orderedProducts(sort);
      res.render("products", {
        products: orderedProducts,
        styles: "products.styles.css",
        user: user[0].first_name,
        admin: role,
      });
    } else {
      let paginatedProducts = await PRODUCTSDAO.paginatedProducts(page);
      res.render("products", {
        products: paginatedProducts.docs,
        styles: "products.styles.css",
        user: user[0].first_name,
        admin: role,
      });
    }
  } catch (err) {
    res.json({
      message: "Error al obtener los productos.",
      data: err,
    });
  }
}

// Método asyncrono para obtener un producto
async function getOne(req, res) {
  const { pid } = req.params;
  try {
    const product = await PRODUCTSDAO.getOne(pid);
    if (product) {
      res.render("products", {
        products: tempArray,
        styles: "products.styles.css",
      });
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el producto",
      data: err,
    });
  }
}

//Ruta que realiza el logout
async function logout(req, res) {
  try {
    const logout = req.session.destroy();
    if (logout) {
      res.redirect("/");
    } else {
      res.status(401).json({
        respuesta: "Algo salió mal. No hemos podido cerrar la sesión",
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export { getAll, getOne, logout };
