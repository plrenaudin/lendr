<div class="content">
	<div class="scanning-actions">
		<div class="scanning">
      {#if action===''}
			<div class="scan-button-container" transition:fly="{y:-200, duration:500}">
				<ScanButton on:scanResult="onScanResult(event.data)" />
			</div>
      {/if}
			<div class="main-input">
        <AutoComplete on:change="$set({currentId: event})" placeholder={t("idInputPlaceholder")} bind:value="inputValue" disabled={action !== ''} />
      </div>
		</div>
    {#if $currentItem || $isbnResult}
      <Card className="description">
        {#if $currentItem} 
          {$currentItem.description}
          <span class="available">({$currentItem.quantity - $activeLoans.filter(i=>i.id===$currentItem.id).length}/{$currentItem.quantity})</span>
        {:elseif $isbnResult} 
          {$isbnResult} 
        {/if}
      </Card>
		{/if} 
    {#if $currentId}
      <Card className="button-group">
        <Button on:click="set({action:'add'})" icon="plus">
          {t("action.add")}
        </Button>
        {#if $isLendable}
        <Button on:click="set({action:'lend'})" icon="upload">
          {t("action.lend")}
        </Button>
        {/if} 
        {#if $isReturnable}
        <Button on:click="set({action:'return'})" icon="download">
          {t("action.return")}
        </Button>
        {/if} 
        <Button on:click="reset()" icon="cancel">
          {t("action.cancel")}
        </Button>
      </Card>
      {#if action === "add"}
        <AddItemForm bind:id="$currentId" on:added="reset()" /> 
      {:elseif action ==="lend"}
        <LendForm bind:id="$currentId" on:lent="reset()" /> 
      {:elseif action ==="return"}
        <ReturnForm bind:id="$currentId" on:returned="reset()" /> 
      {/if} 
    {/if}
	</div>

	<Button on:click="set({displayInventory: !displayInventory})" icon="drawer">
		{t("inventory.button")}
	</Button>
	{#if displayInventory}
	<div class="inventory-container" transition:fly="{y:200, duration:500}">
		<Inventory on:close="set({displayInventory: false})" />
	</div>
	{/if}
</div>

<script>
  import { fly } from "svelte-transitions";
  import t from "./utils/wording";
  import toast from "./utils/toast";
  import data from "./utils/dataGenerator";

  export default {
    components: {
      Card: "./components/Card",
      Button: "./components/Button",
      ScanButton: "./components/ScanButton",
      AddItemForm: "./components/AddItemForm",
      LendForm: "./components/LendForm",
      ReturnForm: "./components/ReturnForm",
      Inventory: "./components/Inventory",
      AutoComplete: "./components/AutoComplete"
    },
    data() {
      return {
        action: "",
        inputValue: "",
        displayInventory: false
      };
    },
    methods: {
      reset() {
        this.store.set({ currentId: "" });
        this.set({ action: "", inputValue: "" });
      },
      onScanResult(id) {
        this.store.set({ currentId: id });
        this.set({ inputValue: id });
      }
    },
    helpers: {
      t
    },
    transitions: { fly },
    oncreate() {
      window["isUpdateAvailable"].then(isAvailable => {
        if (isAvailable) {
          toast(t("update"), { duration: 3600000, destination: "/" });
        }
      });
    }
  };
</script>

<style>
  @import "./styles";
  .main-input {
    width: 90%;
    margin: 0.3rem auto;
  }
  .inventory-container {
    max-width: var(--maxWidth);
    position: fixed;
    z-index: 10;
    background: var(--bgColor);
    overflow: auto;
    top: 0;
    bottom: 0;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 100vh;
  }
  .scanning {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
  }
  .scan-button-container {
    margin: 1rem auto;
    z-index: 10;
  }
  .available {
    display: block;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
  .scanning-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .content :global(.card.description) {
    width: 90%;
    text-align: center;
    background-color: var(--descriptionColor);
    padding: 1rem;
    margin-top: 0;
    word-wrap: break-word;
  }
  .content :global(.card.button-group) {
    padding: 1rem;
    background-color: var(--fgColor);
    margin: 0 0 0.3rem 0;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: relative;
  }
  .content :global(.card.button-group button) {
    margin: 0.5rem;
    flex: 0 0 40%;
  }
  .content :global(.card.button-group:after) {
    content: "";
    position: absolute;
    z-index: 1;
    width: 0;
    height: 0;
    top: 1px;
    left: 50%;
    margin-left: 1rem;
    border: 0.5rem solid black;
    border-color: transparent transparent var(--fgColor) var(--fgColor);
    transform-origin: 0 0;
    transform: rotate(135deg);
    box-shadow: -2px 2px 1px 0 rgb(210, 210, 210);
  }
</style>