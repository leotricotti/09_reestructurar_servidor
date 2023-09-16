import mongoCartsDao from "./mongo/carts.dao.js";
import mongoUsersDao from "./mongo/users.dao.js";
import memoryCartsDao from "./memory/carts.dao.js";
import memoryUsersDao from "./memory/users.dao.js";
import mongoProductsDao from "./mongo/products.dao.js";
import memoryProductsDao from "./memory/products.dao.js";

export const CARTSDAO = new mongoCartsDao();
export const USERSDAO = new mongoUsersDao();
export const PRODUCTSDAO = new mongoProductsDao();
