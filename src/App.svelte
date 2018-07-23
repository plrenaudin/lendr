<Card className="content">
  <nav>
    <ul>
      <li on:click="set({tab:'home'})">Home</li>
      <li on:click="set({tab:'inventory'})">Inventory</li>
    </ul>
  </nav>
  {#if tab==="home"}
    <Home />
  {:elseif tab === "inventory"}
    <Inventory />
  {/if}
</Card>

<script>
  export default {
    data() {
      return {
        tab: "home"
      };
    },
    components: {
      Card: "./components/Card",
      Home: "./Home",
      Inventory: "./Inventory"
    }
  };
</script>

<style>
  @import "./styles";
  nav ul {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
  }
  nav ul li {
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    text-align: center;
    color: var(--linkColor);
  }
</style>