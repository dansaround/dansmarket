import "./Cart.css";

export const Cart = ({ products, onRemoveFromCart, onCloseModal }) => {
  if (products.length === 0) {
    return (
      <div className="cart-container">
        <div className="close-button" onClick={onCloseModal}>
          ❌
        </div>
        <div className="empty-container">
          <span>Añade productos al carrito</span>
        </div>
      </div>
    );
  }

  const handleRemnoveFromCart = (product) => {
    onRemoveFromCart(product);
  };

  //function getTotal for the total prices of items in cart

  const getTotal = () => {
    let sum = 0;
    products.forEach((item) => (sum = sum + item.price));

    return sum;
  };

  return (
    <div className="cart-container">
      <div className="close-button" onClick={onCloseModal}>
        ❌
      </div>
      <h2>Carrito</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>
              <img src={product.images[0]} alt={product.title} />
            </span>
            {product.title}

            <div className="buttons-section">
              <button onClick={() => handleRemnoveFromCart(product)}>
                Eliminar 🗑
              </button>
            </div>
          </li>
        ))}
      </ul>

      <section>
        <b>Total: $ {getTotal()}</b>
      </section>
    </div>
  );
};
