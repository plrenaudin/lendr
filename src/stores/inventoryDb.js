import idb from "idb";

const dbPromise = idb.open("lendr-store", 1, upgradeDB => {
  upgradeDB.createObjectStore("inventory", { keyPath: "id" });
  upgradeDB.createObjectStore("loans", { keyPath: "lent" });
});

const db = {
  getAllItems() {
    return dbPromise.then(db =>
      db
        .transaction("inventory")
        .objectStore("inventory")
        .getAll()
    );
  },
  getItem(key) {
    return dbPromise.then(db => {
      if (Array.isArray(key)) {
        const transaction = db.transaction("inventory");
        return Promise.all(key.map(i => transaction.objectStore("inventory").get(i)));
      } else {
        return db
          .transaction("inventory")
          .objectStore("inventory")
          .get(key);
      }
    });
  },
  setItem({ id, description, quantity }) {
    return dbPromise.then(db => {
      const tx = db.transaction("inventory", "readwrite");
      tx.objectStore("inventory").put({ id, description, quantity });
      return tx.complete;
    });
  },
  getAllLoans() {
    return dbPromise.then(db =>
      db
        .transaction("loans")
        .objectStore("loans")
        .getAll()
    );
  },
  lendItem({ id, name }) {
    return dbPromise.then(db => {
      const tx = db.transaction("loans", "readwrite");
      tx.objectStore("loans").put({ lent: new Date(), name, id });
      return tx.complete;
    });
  },
  returnItem({ id, name, lent }) {
    return dbPromise.then(db => {
      const tx = db.transaction("loans", "readwrite");
      tx.objectStore("loans").put({ lent, name, id, returned: new Date() });
      return tx.complete;
    });
  },
  clearItems() {
    return dbPromise.then(db => {
      const tx = db.transaction("inventory", "readwrite");
      tx.objectStore("inventory").clear();
      return tx.complete;
    });
  },
  import(data) {
    return dbPromise.then(db => {
      const tx = db.transaction("inventory", "readwrite");
      data.forEach(item => tx.objectStore("inventory").put(item, item.date));
      return tx.complete;
    });
  },
  deleteItem({ id }) {
    return dbPromise.then(db => {
      const tx = db.transaction("inventory", "readwrite");
      tx.objectStore("inventory").delete(id);
      return tx.complete;
    });
  }
};

export default db;
