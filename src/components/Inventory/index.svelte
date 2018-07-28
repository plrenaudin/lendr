<main>
  <h1>This is the Inventory</h1>
  <ul>
  {#each $items as item}
    <li>{item.id} {item.description} {item.quantity}<Button on:click="$removeItem(item)">remove</Button></li>
  {/each}
  </ul>
</main>

<script>
  export default {
    components: {
      Button: "../Button"
    }
  };
</script>