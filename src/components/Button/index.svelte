<button on:click="fire('click')" disabled={disabled} class={big?"big":""}>
  {#if icon}
    <Icon name={icon} />
  {/if}
  <slot></slot>
</button>

<script>
  export default {
    components: {
      Icon: "../Icon"
    }
  };
</script>

<style >
  @import "../../styles/variables.css";

  button {
    background-color: var(--buttonColor);
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
  }
  button.big {
    padding: 1rem;
    font-size: 2rem;
  }
</style>