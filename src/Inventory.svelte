<main>
  <h1>This is the Inventory</h1>
  <AddItemForm />
  <ul>
  {#each $items as item}
    <li>{item.id} {item.description}<Button on:click="$removeItem(item)">remove</Button></li>
  {/each}
  </ul>
</main>

<script>
  export default {
    data() {
      return {
        tab: "home"
      };
    },
    components: {
      AddItemForm: "./components/AddItemForm",
      Button: "./components/Button"
    }
  };
</script>