<Card className="content">
  <h1>Hello {name}!</h1>
  <Button on:click="onClickHandler()">test button</Button>
  <Scanner />
</Card>

<script>
  export default {
    components: {
      Button: "./components/Button",
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

  h1 {
    color: var(--titleColor);
  }
</style>