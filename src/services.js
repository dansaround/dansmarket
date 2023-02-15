export const fetchProducts = async () => {
  let products = null;

  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    products = data;
  } catch (err) {
    console.log("Error : ", err);
    return null;
  }

  return products;
};
