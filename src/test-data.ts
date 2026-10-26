export const customer = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
};

// The API rejects an order whose city/state don't match its postcode lookup
// (GET /postcode-lookup?country=US&postcode=90012), so these must match it
export const billingAddress = {
  country: 'US',
  postalCode: '90012',
  houseNumber: '123',
  street: 'Lelia Light',
  city: 'Mireyahaven',
  state: 'Kansas'
};

export const creditCard = {
  number: '4111-1111-1111-1111',
  expiry: '12/2030',
  cvv: '123',
  holderName: 'John Doe'
};

// A fresh user per call, so registration never collides with an existing email.
// The password must have upper and lower case letters, a number and a symbol.
export function newUser() {
  const unique = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
  return {
    first_name: 'Test',
    last_name: 'User',
    email: `test.user.${unique}@example.com`,
    password: 'Str0ng!Pass#2026',
    dob: '1990-01-01',
    phone: '0612345678',
    // Same postcode-lookup values as billingAddress, so this user can also check out
    address: {
      street: billingAddress.street,
      city: billingAddress.city,
      state: billingAddress.state,
      country: billingAddress.country,
      postal_code: billingAddress.postalCode
    }
  };
}

export const products = {
  pilers: 'Combination Pliers',
  boltCutters: 'Bolt Cutters'
};