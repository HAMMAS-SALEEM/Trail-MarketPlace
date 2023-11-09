export const currencyManager = (currency) => {
  const totalCurrency = currency[0].trail
  const spentCurrency = currency[1].data[0].attributes.amount_spent;
  return totalCurrency - spentCurrency
}