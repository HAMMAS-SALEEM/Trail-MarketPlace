import { SingleItem } from '../components/SingleItem';

export const handleProducts = (products, purchases) => {
  const purchasedProductIds = new Set(purchases.currency.purchases.map(str => parseInt(str, 10)));
  const mergedData = products.products.data.map(product => ({
      ...product,
      alreadypurchased: purchasedProductIds.has(product.id)
  }));

  let totalProducts = '';
  totalProducts = mergedData.map((item) => (
    <SingleItem
      key={item.id}
      id={item.id}
      name={item.attributes.name}
      price={item.attributes.cost}
      img={item.attributes.image}
      desc={item.attributes.description}
      alreadyPurchased={item.alreadypurchased}
    />
  ))
  return totalProducts;
}