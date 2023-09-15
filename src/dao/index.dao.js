import mongoCartsDao from "./mongo/carts.dao";
import mongoUsersDao from "./mongo/users.dao";
import { PERSISTENCE } from "../config/config";
import memoryCartsDao from "./memory/carts.dao";
import memoryUsersDao from "./memory/users.dao";
import mongoProductsDao from "./mongo/products.dao";
import memoryProductsDao from "./memory/products.dao";

export const CARTSDAO =
  PERSISTENCE === "MONGO" ? mongoCartsDao : memoryCartsDao;
export const USERSDAO =
  PERSISTENCE === "MONGO" ? mongoUsersDao : memoryUsersDao;
export const PRODUCTSDAO =
  PERSISTENCE === "MONGO" ? mongoProductsDao : memoryProductsDao;
