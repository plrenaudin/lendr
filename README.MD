# lendr

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

![screenshot from 2018-08-19 11-34-01](https://user-images.githubusercontent.com/10697451/44310675-3c854400-a3a8-11e8-8e05-249b7c4b1f2f.png)

### Looking at the inventory

![screenshot from 2018-08-19 11-36-00](https://user-images.githubusercontent.com/10697451/44310676-3c854400-a3a8-11e8-8945-396eab1aa7d8.png)

## Technical details

This project uses:

- [svelte](https://svelte.technology) magical disapearing framework
- [cypress](https://cypress.io) for the tests
- [parcel](https://parceljs.org/) as bundler
- [zxing](https://zxing-js.github.io/library/) for the barcode reader
- [idb](https://github.com/jakearchibald/idb) as indexedDB wrapper

...amongst many other great libraries!
