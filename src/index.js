import App from "./App.svelte";
import store from "./stores/main";

new App({
  target: document.getElementById("root"),
  store
});

window.store = store;
