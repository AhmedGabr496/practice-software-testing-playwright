# Practice Software Testing – Playwright

Automated tests for the [Practice Software Testing](https://practicesoftwaretesting.com) toolshop, written with Playwright and TypeScript. The suite has a UI test, an API test and a test that uses both.

## Tests covered

| Task | Test | What it does |
| --- | --- | --- |
| End-to-end UI | [`tests/checkout.spec.ts`](tests/checkout.spec.ts) | Logs in, searches for a product, adds it to the cart, then goes through checkout (sign in, billing address, credit card payment) and checks that the order is confirmed with an invoice number. |
| API | [`tests/products.api.spec.ts`](tests/products.api.spec.ts) | Logs in for a token, uses it to fetch the current user, and checks the paginated products endpoint. |
| Bonus: API + UI | [`tests/favorite.hybrid.spec.ts`](tests/favorite.hybrid.spec.ts) | Registers a new user and adds a favorite through the API, then logs in through the UI and checks that the favorite shows on the favorites page. |

## Project structure

```
├── .github/workflows/playwright.yml   # CI: runs the tests on every push and pull request to main
├── playwright.config.ts               # Base URL, data-test attribute, reporters, traces, videos
├── src/
│   ├── api/ToolShopAPI.ts             # API client: login, products, register, favorites
│   ├── pages/                         # Page objects: one class per page
│   │   ├── LoginPage.ts
│   │   ├── HomePage.ts
│   │   ├── ProductPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── FavoritesPage.ts
│   ├── fixtures.ts                    # Gives tests the API client and page objects as fixtures
│   └── test-data.ts                   # Test account, address, card and product names; newUser() for unique users
└── tests/                             # The specs
```

How the code is organized:

- **Page objects** keep locators and page steps in one place, so a selector change only needs fixing once. Locators use the site's `data-test` attributes through `getByTestId`.
- **Fixtures** pass the page objects and the API client straight into each test (`async ({ api, loginPage }) => …`), so tests don't create them by hand.
- **No hard waits.** The tests wait on web-first assertions and on page state, never on a fixed timeout.

## How to run

You need Node.js 20 or later (the version in [`.nvmrc`](.nvmrc) is the one used for development).

```bash
npm ci                        # install dependencies
npx playwright install        # install the browsers (first time only)

npm test                      # run all tests
npm run test:headed           # run with the browser visible
npx playwright test checkout  # run one spec, matched by file name
npm run report                # open the HTML report from the last run
```

Each run records a video. Traces and screenshots are kept for failed tests, and you can open them from the HTML report.

Other scripts: `npm run lint`, `npm run typecheck`, `npm run format`.

### CI

[GitHub Actions](.github/workflows/playwright.yml) runs the suite on every push and pull request to `main` and uploads the HTML report as an artifact.

## Things to know about the demo site

These are behaviors of the site that the tests had to account for:

- **Billing address is validated against the postcode.** When an order is placed, the API looks up the postcode and rejects the order if the city or state doesn't match. The lookup returns made-up but consistent data, so `billingAddress` in `test-data.ts` uses the values it returns for `US 90012`. If the lookup is down, the API accepts the order anyway, so a wrong address only fails some of the time.
- **Stock runs out.** Every checkout run places a real order on a shared site. The checkout test checks stock through the API first, so if the product runs out it fails straight away with a clear message. In that case, change the product in `test-data.ts`.
- **Checkout payment takes two clicks.** The first click on `finish` checks the payment details, and the second one places the order.
- **The billing form pre-fills the saved address after it opens.** `fillBillingAddress()` waits for that before typing, otherwise the pre-filled address can overwrite the test's input.
