export default function CartProduct({
  image,
  title,
  id,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
}) {
  return (
    <div>
      <img src={image} alt={image}></img>
      <div>
        <span>{title}</span>
        {quantity == 1 ? (
          <button disabled>-</button>
        ) : (
          <button onClick={() => decreaseQuantity(id)}>-</button>
        )}
        <span>{quantity}</span>
        <button onClick={() => increaseQuantity(id)}>+</button>
      </div>
      <button onClick={() => deleteProduct(id)}>Delete</button>
    </div>
  );
}
