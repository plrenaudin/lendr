<div class="content">
  <div class="scanning">
    <div class="scan-button-container">
      <ScanButton on:scanResult="$set({currentId: event.data})" />
    </div>
    <input bind:value="$currentId" type="text" disabled={action !== ''} class="main-input" placeholder="Item S/N" />
  </div>
  {#if $currentItem}
    <h2>{$currentItem.description} ({$currentItem.quantity - $activeLoans.filter(i=>i.id===$currentItem.id).length}/{$currentItem.quantity})</h2>
  {/if}
  {#if $currentId}
    <div class="button-group">
      <Button on:click="set({action:'add'})" icon="plus">
        Add
      </Button>
      {#if $isLendable}
        <Button on:click="set({action:'lend'})" icon="upload">
          Lend
        </Button>
      {/if}
      {#if $isReturnable}
        <Button on:click="set({action:'return'})" icon="download">
          Return
        </Button>
      {/if}
      {#if action}
        <Button on:click="reset()" icon="cancel">
          Cancel
        </Button>
      {/if}
    </div>
    {#if action === "add"}
      <AddItemForm bind:id="$currentId" on:added="reset()"/>
    {:elseif action ==="lend"}
      <LendForm bind:id="$currentId" on:lent="reset()"/>
    {:elseif action ==="return"}
      <ReturnForm bind:id="$currentId" on:returned="reset()"/>
    {/if}
  {/if}
  <Button on:click="set({displayInventory: !displayInventory})" icon="drawer">
    {displayInventory? "Hide":"Show"} Inventory
  </Button>
  {#if displayInventory}
    <div class="inventory-container" transition:fly="{y:200, duration:500}">
      <Inventory on:close="set({displayInventory: false})" />
    </div>
  {/if}
</div>

<script>
  import { fly } from "svelte-transitions";

  export default {
    components: {
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
    transitions: { fly }
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
    height: 100vh;
  }
  .scanning {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
  }
  .scan-button-container {
    margin: 1rem auto;
  }
  .button-group {
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: space-evenly;
  }
  h2 {
    text-align: center;
  }
</style>