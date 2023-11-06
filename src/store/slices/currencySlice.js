import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const sheetsKey = 'e46e87e7-3f35-4330-83bd-0bca053b14d1';

export const fetchCurrency = createAsyncThunk('fetch/currency', async (userId) => {
  const url = `https://script.google.com/macros/s/AKfycbz35d0Iv8_ujeyod67xLRH6Xu1FXdhGpGwMlzXM1dOZMthD3LoLICoplwtWJExWWweG/exec?
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
  const totalCurrency = currency[0].trails
  const spentCurrency = currency[1].data[0].attributes.amount_spent;
  const calculatedTrails = totalCurrency - spentCurrency;
  const trails = calculatedTrails.toString();
  const purchases = currency[1].data[0].attributes.purchases;
  result = {trails, purchases}
  } else {
    result = {
      trails: '0',
      purchases: 'N/A'
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
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCurrency.pending, (state) => {
      state.status = 'Loading'
    })
    .addCase(fetchCurrency.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.currency = action.payload
      state.error = null
    })
    .addCase(fetchCurrency.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    })
  }
})

export default CurrencySlice.reducer

// function generateApiKey() {
//   var apiKey = Utilities.getUuid(); // Generates a random API key
//   PropertiesService.getScriptProperties().setProperty('API_KEY', apiKey);
//   return apiKey;
// }
