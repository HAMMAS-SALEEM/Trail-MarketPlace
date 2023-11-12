import CurrencySlice from "./currencySlice"
import ProductsSlice from "./productsSlice"
import sessionSlice from "./sessionSlice"
import userSlice from "./userSlice"

export const rootReducer = {
  currency: CurrencySlice,
  Products: ProductsSlice,
  User: userSlice,
  Session: sessionSlice,
}
