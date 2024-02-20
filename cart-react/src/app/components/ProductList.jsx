import React, { useState } from "react";
import { data } from "./data";

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [showSummary, setShowSummary] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }
    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  const onAddSummary = (product, event) => {
    setSelectedProduct(product);
    const rect = event.target.getBoundingClientRect();
    setShowSummary(true);
  };

  const onCloseSummary = () => {
    setShowSummary(false);
  };

  return (
    <div className="container-items">
      {data.map((product) => (
        <div className="item" key={product.id}>
          <figure onClick={(event) => onAddSummary(product, event)}>
            <img src={product.urlImage} alt={product.title} />
          </figure>
          <div className="info-product">
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
             {/* Contenedor del resumen dentro del bucle de mapeo */}
           {showSummary && selectedProduct.id === product.id && (
            <div
              className="summary-overlay"
              onClick={onCloseSummary}
            >
              <div className="summary-content">
                <p>{selectedProduct.resumen}</p>
                <button onClick={onCloseSummary}>Cerrar</button>
              </div>
            </div>
          )}
            <button onClick={() => onAddProduct(product)}>
              Añadir al carrito
            </button>
          </div>
              </div>
      ))}
    </div>
  );
};
