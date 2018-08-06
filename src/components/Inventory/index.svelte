<main>
  <div class="header">
    <input class="search" type="search" placeholder="Find Anywhere" bind:value=search /><Button on:click="fire('close')" icon="cancel">Close</Button>
  </div>
  <h3><Icon name="drawer" />Inventory</h3>
  <table>
    <thead>
      <tr>
        <th class="id">S/N</th>
        <th class="name">Name</th>
        <th class="qty">Qty</th>
        <th class="action">&nbsp;</th>
      </tr>
    </thead>
    <tbody>
    {#each $items.filter(itemPredicate) as item}
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
    {:else}
      <tr class="no-results"><td colspan="4">No Results</td></tr>
    {/each}
    </tbody>
  </table>
  <h3><Icon name="upload" />Loans</h3>
  <table>
    <thead>
      <tr>
        <th class="id">S/N</th>
        <th>Name</th>
        <th>Lent</th>
        <th>Returned</th>
      </tr>
    </thead>
    <tbody>
    {#each $loans.filter(loanPredicate) as loan}
      <tr>
        <td class="id">{loan.id}</td>
        <td>{loan.name}</td>
        <td>{shortFormatDate(loan.lent)}</td>
        <td>
          {loan.returned ? shortFormatDate(loan.returned) : ''}
        </td>
      </tr>
    {:else}
      <tr class="no-results"><td colspan="4">No Results</td></tr>
    {/each}
    </tbody>
  </table>
  
</main>

<script>
  import { shortFormatDate } from "../../utils/formatter";

  const includes = (string, expression) => string.toLowerCase().includes(expression.toLowerCase());

  export default {
    components: {
      Button: "../Button",
      Icon: "../Icon"
    },
    data() {
      return {
        search: ""
      };
    },
    helpers: {
      isDeletable: (items, loans, id) =>
        items.find(i => id === i.id).quantity > (loans.filter(i => id === i.id && !i.returned) || []).length,
      shortFormatDate
    },
    computed: {
      itemPredicate: ({ search }) => item =>
        search ? includes(item.description, search) || includes(item.id, search) : true,
      loanPredicate: ({ search }) => loan => (search ? includes(loan.name, search) || includes(loan.id, search) : true)
    }
  };
</script>

<style>
  @import "../../styles/variables.css";
  h3 {
    margin: 1rem 0.3rem 0.3rem;
  }
  .header {
    display: flex;
    align-items: center;
  }
  .search {
    flex: 1 0 auto;
  }
  table {
    table-layout: fixed;
    font-size: 1rem;
    border-collapse: collapse;
    width: 100%;
  }
  table td {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
  }
  tr.no-results td {
    text-align: center;
  }
  .id {
    width: 20%;
    font-size: 0.8rem;
  }
  .name {
    width: 60%;
  }
  .qty {
    width: 10%;
  }
  .action {
    width: 10%;
  }
  thead tr th {
    border-bottom: 1px solid var(--fontColor);
  }
</style>