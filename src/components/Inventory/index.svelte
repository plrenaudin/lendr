<main>
  <h3>Inventory</h3>
  <ul>
  {#each $items as item}
    <li>
      {item.id} {item.description} {item.quantity}
      {#if isDeletable($items,$loans,item.id)}
      <Button on:click="$removeItem(item)">remove</Button>
      {/if}
    </li>
  {/each}
  </ul>
  <h3>Loans</h3>
  <ul>
  {#each $loans as loan}
    <li>{loan.id} {loan.name} {loan.lent} {loan.returned}</li>
  {/each}
  </ul>
</main>

<script>
  export default {
    components: {
      Button: "../Button"
    },
    helpers: {
      isDeletable: (items, loans, id) =>
        items.find(i => id === i.id).quantity > (loans.find(i => id === i.id) || []).length
    }
  };
</script>