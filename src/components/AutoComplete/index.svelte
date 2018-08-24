<div class="autocomplete">
  <input type="search" bind:value {placeholder} on:input="set({display:true})" />
  {#if display}
  <div class="overlay" on:click="set({display:false})"></div>
  <ul class="suggestions">
    {#each results as result}
      <li on:click="select(result.id)">
        <div class="result-id">
          {result.id}
        </div>
        <div class="result-description">
          {result.description}
        </div>
      </li>
    {/each}
    {#if results.length >= limit}
      <li class="result-id">...</li>
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
      resultPredicate: ({ value }) => item => value && value.length > 2 && includes(value, item.id, item.description),
      results: ({ $items, resultPredicate }) => $items.filter(resultPredicate).slice(0, limit)
    }
  };
</script>

<style>
  @import "../../styles/variables.css";

  .autocomplete {
    position: relative;
  }
  .overlay {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
  }
  input {
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
  }
  .suggestions {
    position: absolute;
    width: 100%;
    background-color: var(--fgColor);
    box-shadow: 0 1px 3px var(--shadowColor);
  }
  .result-id {
    font-size: 0.8rem;
    color: var(--shadowColor);
  }
  ul {
    list-style-type: none;
  }
  ul li {
    padding: 0.5rem 0.3rem;
    border-top: 1px solid var(--lightgrey);
  }
</style>