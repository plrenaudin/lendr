<section class="lend-form">
  <label>
      <input type="text" bind:value=name placeholder="Name" ref:input />
      {#if suggestions.length}
        <div class="overlay" on:click="set({name:''})"></div>
        <ul class="suggestions" style="transform: translateY({suggestionsTranslate}rem)">
          {#each suggestions as suggestion}
            <li on:click="select(suggestion)">{@html highlight(suggestion)}</li>
            {/each}
        </ul>
      {/if}
      <Button on:click="lendItem()" bind:disabled icon="upload">{t("action.lendAction")}</Button>
  </label>
</section>

<script>
  import t from "../../utils/wording";
  import { includes } from "../../utils/search";

  export default {
    components: {
      Button: "../Button"
    },
    data() {
      return {
        name: ""
      };
    },
    computed: {
      disabled: ({ id, name }) => !id || !name,
      suggestions: ({ $loaners, name }) =>
        name.length && $loaners.filter(i => includes(name, i) && i !== name).slice(0, 8),
      suggestionsTranslate: ({ suggestions }) => -2.1 * Math.min(5, suggestions.length) - 3.1,
      highlight: ({ name }) => string => string.replace(new RegExp(`(${name})`, "i"), "<b>$1</b>")
    },
    methods: {
      lendItem() {
        this.store.lendItem({ id: this.get().id, name: this.get().name });
        this.set({ id: "", name: "" });
        this.fire("lent");
      },
      select(name) {
        this.set({ name });
      }
    },
    helpers: {
      t
    },
    oncreate() {
      this.refs.input.focus();
    }
  };
</script>

<style>
  @import "../../styles/variables.css";

  label {
    position: relative;
  }
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  ul.suggestions {
    width: 100%;
    list-style-type: none;
    position: absolute;
    background-color: var(--fgColor);
    box-shadow: 0 1px 3px var(--shadowColor);
    max-height: 10.5rem;
    overflow: auto;
    z-index: 3;
  }
  ul.suggestions li {
    padding: 0.3rem 0.5rem;
  }
  ul.suggestions li :global(b) {
    color: var(--linkColor);
  }
</style>