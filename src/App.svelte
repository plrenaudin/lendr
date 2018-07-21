<Card className="content">
  {#if $displayScanner}
    <Scanner />
  {/if}
  <AddItemForm />
  
</Card>

<script>
  export default {
    components: {
      AddItemForm: "./components/AddItemForm",
      Scanner: "./components/Scanner",
      Card: "./components/Card"
    },
    methods: {
      onClickHandler() {
        alert("button clicked!");
      }
    }
  };
</script>

<style>
  @import "./styles";
</style>