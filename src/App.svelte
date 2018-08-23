<div class="content">
	<div class="scanning-actions">
		{#if action === ''}
		<div class="scanning" transition:fly="{y:-200, duration:500}">
			<div class="scan-button-container">
				<ScanButton on:scanResult="$set({currentId: event.data})" />
			</div>
			<input bind:value="$currentId" type="text" disabled={action !== '' } class="main-input" placeholder={t("idInputPlaceholder")} />
		</div>
		{/if} 
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
        {#if action}
        <Button on:click="reset()" icon="cancel">
          {t("action.cancel")}
        </Button>
        {/if}
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

  export default {
    components: {
      Card: "./components/Card",
      Button: "./components/Button",
      ScanButton: "./components/ScanButton",
      AddItemForm: "./components/AddItemForm",
      LendForm: "./components/LendForm",
      ReturnForm: "./components/ReturnForm",
      Inventory: "./components/Inventory"
    },
    data() {
      return {
        action: "",
        displayInventory: false
      };
    },
    methods: {
      reset() {
        this.set({ action: "" });
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
    text-align: center;
    font-size: 1.4rem;
  }
  .inventory-container {
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
    z-index: 2;
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

  h2 {
    text-align: center;
  }
</style>