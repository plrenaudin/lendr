<Card className="content">
  <input bind:value=id type="text" />
  <ScanButton on:scanResult="set({id: event.data})" />
  {#if id}
    {#if action === "add"}
      <AddItemForm bind:id on:added="reset()" />
    {:elseif action ==="lend"}
      <LendForm bind:id on:lended="reset()" />
    {:elseif action ==="return"}
      <ReturnForm bind:id on:lended="reset()" />
    {:else}
      <ul>
        <li on:click="set({action:'add'})">Add</li>
        {#if isLendable}
          <li on:click="set({action:'lend'})">Lend</li>
        {/if}
      </ul>
    {/if}
  {/if}
  <Button on:click="set({displayInventory: !displayInventory})">{displayInventory? "Hide":"Show"} Inventory</Button>
  {#if displayInventory}
    <Inventory />
  {/if}
</Card>

<script>
  export default {
    data() {
      return {
        id: "",
        action: "",
        displayInventory: false
      };
    },
    components: {
      Card: "./components/Card",
      Button: "./components/Button",
      ScanButton: "./components/ScanButton",
      AddItemForm: "./components/AddItemForm",
      LendForm: "./components/LendForm",
      ReturnForm: "./components/ReturnForm",
      Inventory: "./components/Inventory"
    },
    methods: {
      reset() {
        this.set({ id: "", action: "" });
      }
    },
    computed: {
      isLendable: ({ id, $items }) => $items.some(i => i.id === id)
    }
  };
</script>

<style>
  @import "./styles";
</style>