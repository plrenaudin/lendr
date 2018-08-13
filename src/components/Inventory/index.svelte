<main>
  <div class="header">
    <input class="search" type="search" placeholder={t("inventory.find")} bind:value=search /><Button on:click="fire('close')" icon="cancel">{t('inventory.close')}</Button>
  </div>
  <nav>
    <ul>
      <li on:click="set({tab: 'inventory'})" class={tab === 'inventory' ? 'selected':''}><Icon name="drawer" />{t("inventory.tab.inventory")}</li>
      <li on:click="set({tab: 'loans'})" class={tab === 'loans' ? 'selected':''}><Icon name="upload" />{t("inventory.tab.loans")}</li>
    </ul>
  </nav>
  {#if tab ==="inventory"}
  <h3><Icon name="drawer" />{t("inventory.tab.inventory")}</h3>
  <table>
    <thead>
      <tr>
        <th class="id">{t("inventory.id")}</th>
        <th class="description">{t("inventory.description")}</th>
        <th class="qty">{t("inventory.quantity")}</th>
        <th class="action">&nbsp;</th>
      </tr>
    </thead>
    <tbody>
    {#each $sortedItems.filter(itemPredicate).slice(0,limit+1) as item, index}
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
      {#if index===limit}
        <tr class="more"><td colspan="4">{t("inventory.limit")}</td></tr>
      {/if}
    {:else}
      <tr class="no-results"><td colspan="4">{t("inventory.noResults")}</td></tr>
    {/each}
    </tbody>
  </table>
  {:else}
  <h3><Icon name="upload" />{t("inventory.tab.loans")}</h3>
  <label class="active-filter">
    <input type="checkbox" bind:checked="onlyActiveLoans" />{t("inventory.activeOnly")}
  </label>
  <table>
    <thead>
      <tr class={onlyActiveLoans ? "wide":""}>
        <th class="item">{t("inventory.item")}</th>
        <th class="name">{t("inventory.name")}</th>
        <th class="date">{t("inventory.lent")}</th>
        {#if !onlyActiveLoans}
        <th class="date">{t("inventory.returned")}</th>
        {/if}
      </tr>
    </thead>
    <tbody>
    {#each loans.filter(loanPredicate).slice(0,limit+1) as loan,index}
      <tr>
        <td>{loan.description || ''}</td>
        <td>{loan.name}</td>
        <td>{textFormatDate(loan.lent)}</td>
        {#if !onlyActiveLoans}

        <td>
          {loan.returned ? textFormatDate(loan.returned) : ''}
        </td>
        {/if}
      </tr>
      {#if index === limit}
        <tr class="more"><td colspan="4">{t("inventory.limit")}</td></tr>
      {/if}
    {:else}
      <tr class="no-results"><td colspan="4">{t("inventory.noResults")}</td></tr>
    {/each}
    </tbody>
  </table>
  {/if}
</main>

<script>
  import { textFormatDate } from "../../utils/formatter";
  import t from "../../utils/wording.js";
  const includes = (expression, ...strings) =>
    strings.some(i => i.toLowerCase && i.toLowerCase().includes(expression.toLowerCase()));

  export default {
    components: {
      Button: "../Button",
      Icon: "../Icon"
    },
    data() {
      return {
        search: "",
        onlyActiveLoans: true,
        tab: "inventory"
      };
    },
    helpers: {
      isDeletable: (items, loans, id) =>
        items.find(i => id === i.id).quantity > (loans.filter(i => id === i.id && !i.returned) || []).length,
      textFormatDate,
      t,
      limit: 100
    },
    computed: {
      loans: ({ $sortedLoans, $sortedActiveLoans, onlyActiveLoans }) =>
        onlyActiveLoans ? $sortedActiveLoans : $sortedLoans,
      itemPredicate: ({ search }) => item => (search ? includes(search, item.description, item.id) : true),
      loanPredicate: ({ search }) => loan =>
        search
          ? includes(
              search,
              loan.name,
              loan.id,
              loan.description,
              textFormatDate(loan.lent),
              textFormatDate(loan.returned)
            )
          : true
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
    margin: 0.3rem;
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
    padding-left: 0.3rem;
  }
  table td:hover {
    white-space: initial;
    word-break: break-all;
  }
  table tr {
    height: 2rem;
  }
  tr.no-results td,
  tr.more td {
    text-align: center;
  }
  .id {
    width: 20%;
    font-size: 0.8rem;
  }
  .description {
    width: 60%;
  }
  .qty,
  .action {
    width: 10%;
  }
  .wide .item {
    width: 40%;
  }
  .wide .name {
    width: 30%;
  }
  .wide .date {
    width: 30%;
  }
  .active-filter {
    text-align: right;
    font-size: 0.9rem;
    display: block;
    padding-right: 0.3rem;
  }
  thead tr th {
    border-bottom: 1px solid var(--fontColor);
  }
  nav ul {
    display: flex;
    list-style-type: none;
    justify-content: space-around;
  }
  nav ul li {
    width: 100%;
    color: var(--linkColor);
    text-align: center;
    padding: 0.5rem;
  }
  nav ul li.selected {
    border-bottom: 1px solid var(--linkColor);
  }
</style>