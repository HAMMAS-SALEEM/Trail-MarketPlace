import ProductsSlice from "./productsSlice"
import userSlice from "./userSlice"

export const rootReducer = {
  Products: ProductsSlice,
  User: userSlice
}
