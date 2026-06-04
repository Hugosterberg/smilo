// Rabattkod för nya nyhetsbrevsprenumeranter (popup). Delas mellan klient
// (DiscountPopup) och server (välkomstmailet) så att koden alltid stämmer.
// OBS: själva rabatten måste även finnas som en promotion code i Stripe.
export const DISCOUNT_CODE = 'NY50';
export const DISCOUNT_AMOUNT_LABEL = '50 kr';
