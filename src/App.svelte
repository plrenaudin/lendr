<div class="content">
  <ScanButton on:scanResult="$set({currentId: event.data})" />
  <input bind:value="$currentId" type="text" />
  {#if $currentId}
    {#if action === "add"}
      <AddItemForm bind:id="$currentId" on:added="reset()"/>
    {:elseif action ==="lend"}
      <LendForm bind:id="$currentId" on:lent="reset()"/>
    {:elseif action ==="return"}
      <ReturnForm bind:id="$currentId" on:returned="reset()"/>
    {:else}
      <ul>
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
      </ul>
    {/if}
  {/if}
  <Button on:click="set({displayInventory: !displayInventory})" icon="books">
    {displayInventory? "Hide":"Show"} Inventory
  </Button>
  {#if displayInventory}
    <Inventory />
  {/if}
</div>

<script>
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
    }
  };
</script>

<style>
  @import "./styles";
  .content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 100vh;
  }
</style>