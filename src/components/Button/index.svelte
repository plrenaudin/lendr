<button on:click="fire('click')">
  <slot></slot>
</button>

<style >
  @import "../../styles/variables.css";

  button {
    background-color: var(--buttonColor);
    padding: 0.5rem;
  }
</style>