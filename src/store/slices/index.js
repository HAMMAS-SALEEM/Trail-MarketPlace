import CurrencySlice from "./currencySlice"
import ProductsSlice from "./productsSlice"
import userSlice from "./userSlice"

export const rootReducer = {
  currency: CurrencySlice,
  Products: ProductsSlice,
  User: userSlice,
}
