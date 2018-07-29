<Card className="content">
  <input bind:value="$currentId" type="text" />
  <ScanButton on:scanResult="$set({currentId: event.data})" />
  {#if $currentId}
    {#if $action === "add"}
      <AddItemForm bind:id="$currentId" />
    {:elseif $action ==="lend"}
      <LendForm bind:id="$currentId" />
    {:elseif $action ==="return"}
      <ReturnForm bind:id="$currentId" />
    {:else}
      <ul>
        <li on:click="$set({action:'add'})">Add</li>
        {#if $isLendable}
          <li on:click="$set({action:'lend'})">Lend</li>
        {/if}
      </ul>
    {/if}
  {/if}
  <Button on:click="$set({displayInventory: !$displayInventory})">{$displayInventory? "Hide":"Show"} Inventory</Button>
  {#if $displayInventory}
    <Inventory />
  {/if}
</Card>

<script>
  export default {
    components: {
      Card: "./components/Card",
      Button: "./components/Button",
      ScanButton: "./components/ScanButton",
      AddItemForm: "./components/AddItemForm",
      LendForm: "./components/LendForm",
      ReturnForm: "./components/ReturnForm",
      Inventory: "./components/Inventory"
    }
  };
</script>

<style>
  @import "./styles";
</style>