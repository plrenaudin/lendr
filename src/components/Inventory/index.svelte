<main>
  <h3>Inventory</h3>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Qty</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
    {#each $items as item}
      <tr>
        <td class="id">{item.id}</td>
        <td>{item.description}</td>
        <td>{item.quantity}</td>
        <td>
          {#if isDeletable($items,$loans,item.id)}
            <Button on:click="$removeItem(item)" icon="bin" />
          {/if}
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
  <h3>Loans</h3>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Lent</th>
        <th>Returned</th>
      </tr>
    </thead>
    <tbody>
    {#each $loans as loan}
      <tr>
        <td class="id">{loan.id}</td>
        <td>{loan.name}</td>
        <td>{longFormatDate(loan.lent)}</td>
        <td>
          {longFormatDate(loan.returned) || ''}
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
  
</main>

<script>
  import { longFormatDate } from "../../utils/formatter";
  export default {
    components: {
      Button: "../Button"
    },
    helpers: {
      isDeletable: (items, loans, id) =>
        items.find(i => id === i.id).quantity > (loans.filter(i => id === i.id && !i.returned) || []).length,
      longFormatDate
    }
  };
</script>

<style>
  table {
    table-layout: fixed;
    width: 100%;
  }
  table td {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .id {
    width: 20%;
    font-size: 0.6rem;
  }
</style>