import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userId = '08072c39-6f65-4f5a-b540-e045e87d9ca3';
const sheetsKey = 'e46e87e7-3f35-4330-83bd-0bca053b14d1';
const url = `https://script.google.com/macros/s/AKfycbxPOGGESaK5wFOKCt1N3bNexeYNtBl3QKjG91lKLGBxB4U2D03AIpHR2crXd2Sj61rm/exec?key=${sheetsKey}&graniteUserId=${userId}`;

export const fetchCurrency = createAsyncThunk('fetch/currency', async () => {
    const currency = await fetch(url);
    console.log(currency.json());
    return currency.json();
})

const CurrencySlice = createSlice({
  name: 'CurrencySlice',
  initialState: {
    currency: {},
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
      state.status = 'succceeded'
      state.currency = action.payload
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


// function doGet(req) {
//     var apiKey = PropertiesService.getScriptProperties().getProperty('API_KEY');
//     var recievedKey = req.parameter.key
//     if(apiKey != recievedKey) {
//       return 'Access Denied'
//     }
//     var graniteUserId = req.parameter.graniteUserId
//     var doc = SpreadsheetApp.getActiveSpreadsheet();
//     var sheet = doc.getSheetByName('Sheet1');
//     var values = sheet.getDataRange().getValues();
    
//     var output = [];
//     for(var i = 0; i<values.length; i++) {
//       var row = {}
//       row['graniteUserId'] = values[i][1];
//       row['timestamp'] = values[i][2];
//       output.push(row);
//     }
  
//     if(graniteUserId != null) {
//       var outputToReturn = output.find((obj) => obj.graniteUserId.toString() == graniteUserId.toString())
//       return ContentService.createTextOutput(JSON.stringify({data: outputToReturn})).setMimeType(ContentService.MimeType.JSON);
//     }
  
//     return ContentService.createTextOutput(JSON.stringify({data: output})).setMimeType(ContentService.MimeType.JSON);
//   }
