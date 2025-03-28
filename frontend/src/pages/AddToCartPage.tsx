import { useNavigate, useParams } from 'react-router-dom';
// import WelcomeFunc from '../components/WelcomeFunc';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/Cartitem';

function AddToCart() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Project Found',
      price: Number(numericPrice),
      quantity,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      {/* <WelcomeFunc /> */}
      <br />
      <h2>Buy {title}</h2>
      <div>
        <p>{price}</p>
        <input
          type="number"
          placeholder="Enter donation amount"
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
        />
        <br />
        <br />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
      {/* Could use '/projects' instead of -1 tooo */}
    </>
  );
}

export default AddToCart;
