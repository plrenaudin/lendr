<svelte:window on:click="set({display:false})" />

<div class="autocomplete">
  <input type="search" on:input="set({display:true})" bind:value {placeholder} {disabled} />
  {#if display}
  <ul class="suggestions">
    {#each results as result}
      <li on:click="select(result.id)">
        <div class="result-id">
          {@html highlight(result.id)}
        </div>
        <div class="result-description">
          {@html highlight(result.description)}
        </div>
      </li>
    {/each}
    {#if results.length >= limit}
      <li class="result-id more">...</li>
    {/if}
    {#if value}
      <li on:click="select(value)" class="add">
        <Icon name="plus" />{t("action.addAction")}
      </li>
    {/if}
  </ul>
  {/if}
</div>

<script>
  import { includes } from "../../utils/search";
  import t from "../../utils/wording";
  const limit = 3;
  export default {
    components: {
      Icon: "../Icon"
    },
    data() {
      return {
        value: "",
        display: false
      };
    },
    helpers: {
      t,
      limit
    },
    methods: {
      select(id) {
        this.set({ display: false, value: id });
        this.fire("change", id);
      }
    },
    computed: {
      resultPredicate: ({ value }) => item => value && includes(value, item.id, item.description),
      results: ({ $items, resultPredicate }) => $items.filter(resultPredicate).slice(0, limit),
      highlight: ({ value }) => string => string.replace(new RegExp(`(${value})`, "i"), "<b>$1</b>")
    }
  };
</script>

<style>
  @import "../../styles/variables.css";

  .autocomplete {
    position: relative;
    z-index: 9;
  }
  input {
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
  }
  .suggestions {
    position: absolute;
    z-index: 9;
    width: 100%;
    background-color: var(--fgColor);
    box-shadow: 0 1px 3px var(--shadowColor);
  }
  .result-id {
    font-size: 0.8rem;
    color: var(--shadowColor);
  }
  ul li.more {
    border-top: none;
    text-align: center;
  }
  .add :global(.icon) {
    font-size: 0.9rem;
  }
  ul {
    list-style-type: none;
  }
  ul li {
    padding: 0.5rem 0.3rem;
    border-top: 1px solid var(--lightgrey);
    word-wrap: break-word;
  }
  ul li :global(b) {
    color: var(--linkColor);
  }
</style>