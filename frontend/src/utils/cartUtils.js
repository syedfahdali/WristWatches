export const addDecimals = (num) => {
  return Math.round((num * 100) / 100).toFixed(2);
};

export const cartCalculations = (state) => {
  //adding itemPrice

  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //adding shippingPrice

  state.shippingPrice = addDecimals(state.itemsPrice > 1000 ? 50 : 0);

  //adding taxPrice

  state.taxPrice = addDecimals(Number(state.itemsPrice * 0.15).toFixed());

  //adding totalPrice

  state.totalprice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
