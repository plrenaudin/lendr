<button on:click="fire('click')" disabled={disabled} class={className}>
	{#if icon}
	<Icon name={icon} /> {/if}
	<slot></slot>
</button>

<script>
  export default {
    components: {
      Icon: "../Icon"
    },
    computed: {
      className: ({ lite, big, icon }) => {
        const classNames = [];
        big && classNames.push("big");
        lite && classNames.push("lite");
        icon && classNames.push(icon);
        return classNames.join(" ");
      }
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px var(--shadowColor);
    transition: all 300ms ease-in;
  }
  button:focus,
  button:active {
    box-shadow: none;
    outline: none;
  }
  button:hover {
    cursor: pointer;
  }
  button.big {
    padding: 1rem;
    font-size: 2rem;
    flex-direction: column;
  }
  button.cancel {
    background-color: var(--redColor);
  }
  button.lite {
    background-color: transparent;
    box-shadow: none;
  }
</style>