import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/app.config";
import axios from "axios";

const sheetsKey = 'e46e87e7-3f35-4330-83bd-0bca053b14d1';

export const fetchCurrency = createAsyncThunk('fetch/currency', async (userId) => {
const url = `https://script.google.com/macros/s/AKfycbwATm_Pxwmy8YXuCu9DZZHSKb9f3FiqHsLb3sXKBRsxpImQK_0zKOZzo-5D5P4qxwuR/exec?
key=${sheetsKey}&
graniteUserId=${userId}`;

const spentCurrencyURL = `https://trailmarket.up.railway.app/api/trail-users?filters[granite_id][$eq]=${userId}`;
  const res = await Promise.all([
    fetch(url),
    fetch(spentCurrencyURL),
  ])

  const data = await Promise.all(res.map(r => r.json()));
  
  const currency = data.flat();
  const spentCurrencyData = data[1] && data[1].data && data[1].data[0];
  let result = null;
  
  if(spentCurrencyData) {
  const trailUser = currency[1].data[0].id;
  const amountSpent = currency[1].data[0].attributes.amount_spent;
  const totalCurrency = currency[0].trails
  const spentCurrency = currency[1].data[0].attributes.amount_spent;
  const calculatedTrails = totalCurrency - spentCurrency;
  let trails = 0
  if(calculatedTrails > 0) {
    trails = calculatedTrails.toString();
  }
  const purchases = currency[1].data[0].attributes.purchases;
  result = {trails, purchases, trailUser, amountSpent}
  } else {
    result = {
      trails: '0',
      purchases: 'N/A',
      trailUser: 'N/A',
      amountSpent: 'N/A',
    }
  }
  return result;
});

const CurrencySlice = createSlice({
  name: 'CurrencySlice',
  initialState: {
    currency: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    purchaseProduct(state, action) {
      const { currency, status, error } = state;

      return ({
        currency: { 
          ...currency,
          trails: +state.currency.trails-(action.payload[1].data.amount_spent-action.payload[2]),
          amountSpent: (action.payload[1].data.amount_spent-(+state.currency.amountSpent*0)),
          purchases: [...action.payload[1].data.purchases]
        },
        status,
        error,
      });
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCurrency.pending, (state) => {
      state.status = 'Loading'
    })
    .addCase(fetchCurrency.fulfilled, (state, action) => {
      if(action.payload.trailUser !== 'N/A'){
      state.status = 'succeeded'
      state.currency = action.payload
      state.error = null
      }
    })
    .addCase(fetchCurrency.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    })
  }
})

export const {purchaseProduct} = CurrencySlice.actions;
export default CurrencySlice.reducer

// function generateApiKey() {
//   var apiKey = Utilities.getUuid(); // Generates a random API key
//   PropertiesService.getScriptProperties().setProperty('API_KEY', apiKey);
//   return apiKey;
// }
