import { useState, useEffect } from "react";
import { fetchProducts } from "./services";
import { Cart } from "./Cart";

import "./App.css";

export const MarketView = () => {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartProducts, setCartProduct] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);

  const getCategories = (productsList) => {
    let categoriesObject = {};
    productsList.forEach((product) => {
      categoriesObject[product.category.id] = product.category;
    });

    /*

    let categoriesObject = {};  => {name (id): value (category)}

    categoriesObject {
      1: { image: string, name: string }
    }
    categoriesObject {
      1: { image: string, name: string }
      2: { image: string, name: string }
    }
    categoriesObject {
      1: { image: string, name: string }
      2: { image: string, name: string }
      3: { image: string, name: string }
    }
    categoriesObject {
      1: { image: string, name: string }
      2: { image: string, name: string }
      3: { image: string, name: string }
    }
    categoriesObject {
      1: { image: string, name: string }
      2: { image: string, name: string }
      3: { image: string, name: string }
      4: { image: string, name: string }
    }
    */

    setCategories(Object.values(categoriesObject));
  };

  useEffect(() => {
    (async () => {
      const fetchedProducts = await fetchProducts();

      getCategories(fetchedProducts);
      setProducts(fetchedProducts);
    })();
  }, []);

  const handleAddToCart = (product) => {
    setCartProduct((prev) => [...prev, product]);

    // Pasar todos menos el que acaba de llegar en product
    const filteredProducts = products.filter(
      (_product) => _product.id !== product.id
    );

    setProducts(filteredProducts);
  };

  const handleRemoveFromCart = (product) => {
    // Pasar todos menos el que acaba de llegar en product
    const filteredProducts = cartProducts.filter(
      (_product) => _product.id !== product.id
    );
    setCartProduct(filteredProducts);

    let productsCopy = products;
    productsCopy.unshift(product);
    setProducts(productsCopy);
  };

  return (
    <div className="main-container">
      <button className="cart-button" onClick={() => setShowCart(true)}>
        Carrito
      </button>
      <button onClick={() => console.log(categories)}>CHECK JEJEJEJ</button>
      {showCart && (
        <Cart
          products={cartProducts}
          onCloseModal={() => setShowCart(false)}
          onRemoveFromCart={(product) => handleRemoveFromCart(product)}
        />
      )}

      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "1rem",
          color: "whitesmoke",
        }}
      >
        {categories.map((category) => (
          <li>
            <img style={{ width: 100 }} src={category.image} alt="" />
            <b>{category.name}</b>
          </li>
        ))}
      </ul>

      <h1>Dans Market</h1>

      <ul className="list-container">
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.images[0]} alt={product.title} />
            <p>{product.title}</p>
            <b>$ {product.price}</b>

            <section className="buttons-section">
              <button onClick={() => handleAddToCart(product)}>
                Agregar al carrito
              </button>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
};
