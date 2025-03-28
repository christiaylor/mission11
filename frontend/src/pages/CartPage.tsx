import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/Cartitem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Calculate the total price of all items in the cart
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div>
      <h2>Your cart</h2>
      <br />
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => {
              // Calculate subtotal for each item
              const subTot = item.quantity * item.price;

              return (
                <li key={item.bookID}>
                  {item.title} Price: ${item.price.toFixed(2)}
                  <br />
                  Quantity: {item.quantity}
                  <br />
                  Subtotal: ${subTot.toFixed(2)}{' '}
                  {/* Display the calculated subtotal */}
                  <br />
                  <button onClick={() => removeFromCart(item.bookID)}>
                    Remove
                  </button>
                  <br />
                  <br />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Display the total price of all items in the cart */}
      <h3>Total: ${total.toFixed(2)}</h3>
      <br />
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Shopping</button>
    </div>
  );
}

export default CartPage;
