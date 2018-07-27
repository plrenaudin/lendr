import idb from "idb";

const dbPromise = idb.open("lendr-store", 1, upgradeDB => {
  upgradeDB.createObjectStore("inventory", { keyPath: "id" });
});

const db = {
  getAll() {
    return dbPromise.then(db =>
      db
        .transaction("inventory")
        .objectStore("inventory")
        .getAll()
    );
  },
  get(key) {
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
  set({ id, description, quantity }) {
    return dbPromise.then(db => {
      const tx = db.transaction("inventory", "readwrite");
      tx.objectStore("inventory").put({ id, data: { description, quantity } });
      return tx.complete;
    });
  },
  clear() {
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
  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction("inventory", "readwrite");
      tx.objectStore("inventory").delete(key);
      return tx.complete;
    });
  }
};

export default db;
