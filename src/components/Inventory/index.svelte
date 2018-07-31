<main>
  <ul>
  {#each $items as item}
    <li>{item.id} {item.description} {item.quantity}<Button on:click="$removeItem(item)">remove</Button></li>
  {/each}
  </ul>
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
    }
  };
</script>