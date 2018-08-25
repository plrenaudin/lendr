# Lendr

Lendr help you keeping track of your loaned books, games, discs etc.

This is a PWA built for mobile and works without internet connection (except for the isbn lookup feature)

## How it works

- Use the barcode scanner to scan your items or enter their code manually.
- Add them to your inventory
- Next time someone wants to borrow one of your precious, scan it and click on "Lend"
- Lendr lets you see your inventory and the loans history
- Don't forget to "Return" the item once it is back home!

## Screenshots

### Lending an item

<img src="https://user-images.githubusercontent.com/10697451/44620066-6af99800-a85c-11e8-977d-069e1c53bfe1.png" alt="Item description" width="300px" />

### Looking at the inventory

<img src="https://user-images.githubusercontent.com/10697451/44620096-db081e00-a85c-11e8-880a-526d69ba939c.png" alt="Inventory" width="300px" />

## Customizing

If you want to use this project for yourself and add some customization, just fork it!

- All the wordings are located at `src/locales/translations.json`.
- The css can be overriden at `src/styles/overrides.css`.

## Technical details

This project uses:

- [svelte](https://svelte.technology) magical disapearing framework
- [cypress](https://cypress.io) for the tests
- [parcel](https://parceljs.org/) as bundler
- [zxing](https://zxing-js.github.io/library/) for the barcode reader
- [idb](https://github.com/jakearchibald/idb) as indexedDB wrapper

...amongst many other great packages!
