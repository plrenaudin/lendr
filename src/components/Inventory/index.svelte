<main class="inventory">
	<div class="header">
		<div class="menu-container">
			<Button on:click="set({showMenu: !showMenu})" icon="dots" lite /> 
      {#if showMenu}
      <div class="overlay" on:click="set({showMenu: false})" />
			<ul class="menu">
				<li class="import-export">
					<span>{t("importExport")}</span>
					<ImportExport />
				</li>
			</ul>
			{/if}
		</div>
		<input class="search" ref:searchInput type="search" placeholder={t( "inventory.find")} bind:value=search />
		<div class="close-button"><Button on:click="fire('close')" icon="cancel" lite></Button></div>
	</div>
	<nav>
		<ul>
			<li on:click="set({tab: 'inventory'})" class={tab==='inventory' ? 'selected': ''}>
				<Icon name="drawer" />{t("inventory.tab.inventory")}
      </li>
			<li on:click="set({tab: 'loans'})" class={tab==='loans' ? 'selected': ''}>
				<Icon name="upload" />{t("inventory.tab.loans")}
      </li>
		</ul>
	</nav>
	{#if tab ==="inventory"}
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
			<tr on:click="select(item.id)">
				<td class="id">{item.id}</td>
				<td>{item.description}</td>
				<td>{item.quantity}</td>
				<td>
					{#if isDeletable($items,$loans,item.id)}
					<Button on:click="removeItem(item)" icon="bin" lite /> {/if}
				</td>
			</tr>
			{#if index===limit}
			<tr class="centered">
				<td colspan="4">{t("inventory.limit")}</td>
			</tr>
			{/if} {:else}
			<tr class="centered">
				<td colspan="4">{t("inventory.noResults")}</td>
			</tr>
			{/each}
		</tbody>
	</table>
	{:else}
  <div class="controls">
    {#if $loaners}
      <label class="loaner-filter">
        <Icon name="user" />
        <select bind:value="selectedLoaner">
          <option value="">{t("inventory.loaner")}</option>
          {#each $loaners as loaner}
            <option value={loaner}>{loaner}</option>
          {/each}
        </select>
      </label>
    {/if}
    <label class="date-filter">
      <Icon name="calendar" />
      <input type="date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" max={shortFormatDate(new Date())} bind:value="selectedDate" />
      <em class={selectedDate? 'set':''}>
        {#if selectedDate}
          {textFormatDate(selectedDate)}
        {:else}
          {t("inventory.noDate")}
        {/if}
      </em>
    </label>
    <label class="active-filter">
      <input type="checkbox" bind:checked="onlyActiveLoans" />{t("inventory.activeOnly")}
    </label>
  </div>
	<table>
		<thead>
			<tr class={onlyActiveLoans ? "wide": ""}>
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
			<tr class="centered">
				<td colspan="4">{t("inventory.limit")}</td>
			</tr>
			{/if} {:else}
			<tr class="centered">
				<td colspan="4">{t("inventory.noResults")}</td>
			</tr>
			{/each}
		</tbody>
	</table>
	{/if}

</main>

<script>
  import { textFormatDate, shortFormatDate } from "../../utils/formatter";
  import t from "../../utils/wording.js";
  import { includes } from "../../utils/search";

  export default {
    components: {
      ImportExport: "../ImportExport",
      Button: "../Button",
      Icon: "../Icon"
    },
    data() {
      return {
        search: "",
        onlyActiveLoans: true,
        tab: "inventory",
        selectedDate: "",
        showMenu: false
      };
    },
    helpers: {
      isDeletable: (items, loans, id) =>
        items.find(i => id === i.id).quantity > (loans.filter(i => id === i.id && !i.returned) || []).length,
      textFormatDate,
      shortFormatDate,
      t,
      limit: 100
    },
    computed: {
      loans: ({ $sortedLoans, $sortedActiveLoans, onlyActiveLoans }) =>
        onlyActiveLoans ? $sortedActiveLoans : $sortedLoans,
      itemPredicate: ({ search }) => item => (search ? includes(search, item.description, item.id) : true),
      loanPredicate: ({ search, selectedLoaner, selectedDate }) => loan => {
        const searchPredicate = search
          ? includes(
              search,
              loan.name,
              loan.id,
              loan.description,
              textFormatDate(loan.lent),
              textFormatDate(loan.returned)
            )
          : true;
        const loanerPredicate = selectedLoaner ? loan.name === selectedLoaner : true;
        const datePredicate = selectedDate ? loan.lent <= shortFormatDate(selectedDate) : true;
        return searchPredicate && loanerPredicate && datePredicate;
      }
    },
    methods: {
      select(id) {
        this.store.set({ currentId: id });
        this.fire("close");
      },
      removeItem(item) {
        event.stopPropagation();
        this.store.removeItem(item);
      }
    },
    oncreate() {
      this.refs.searchInput.focus();
    }
  };
</script>

<style>
  @import "../../styles/variables.css";

  .header {
    display: flex;
  }
  .search {
    flex: 0 0 60%;
    margin: 0.3rem auto;
  }
  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
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
  tr.centered td {
    text-align: center;
  }
  .menu-container {
    top: 0.6rem;
    left: 0.3rem;
    position: absolute;
  }
  .menu {
    position: fixed;
    top: 2.5rem;
    left: 0.3rem;
    box-shadow: 0 1px 3px var(--shadowColor);
    background-color: var(--fgColor);
  }
  .menu li {
    border-top: 1px solid var(--lightgrey);
    padding: 0.5rem;
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
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .controls select {
    width: 6rem;
    background: none;
    border: none;
  }
  .controls input[type="date"] {
    visibility: hidden;
    padding: 0;
    width: 0;
  }
  .controls label {
    display: flex;
    align-items: center;
  }
  .controls .active-filter {
    text-align: right;
    font-size: 0.9rem;
    display: block;
    padding-right: 0.3rem;
  }
  thead tr th {
    border-bottom: 1px solid var(--lightgrey);
  }
  nav ul {
    display: flex;
    list-style-type: none;
    justify-content: space-around;
    margin: 1.5rem 0 0;
  }
  nav ul li {
    width: 100%;
    color: var(--linkColor);
    text-align: center;
    font-weight: 600;
    padding: 0.5rem;
    border-bottom: 2px solid var(--linkColor);
    border-radius: 0.5rem 0.5rem 0 0;
  }
  nav ul li.selected {
    border: 2px solid var(--linkColor);
    border-bottom: none;
  }
  nav ul li:first-child {
    border-left: none;
  }
  nav ul li:last-child {
    border-right: none;
  }
  input[type="checkbox"] {
    margin-right: 0.3rem;
  }
  em {
    color: var(--lightgrey);
    font-size: 0.9rem;
  }
  em.set {
    color: inherit;
  }
  .overlay {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .import-export span {
    font-size: 0.9rem;
  }
</style>