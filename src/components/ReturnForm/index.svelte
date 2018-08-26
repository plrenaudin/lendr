<section class="return-form">
  <div class="loaner-list">
    <p>{t("loaners")} :</p>
    <ol>
      {#each loaners as loaner}
        <li class="loaners {name === loaner ? 'selected': ''}"><a on:click="set({name:loaner})" role="button">{loaner}</a></li>
      {/each}
    </ol>
  </div>
  <Button on:click="returnItem()" bind:disabled icon="download">{t("action.returnAction")}</Button>
</section>

<script>
  import t from "../../utils/wording";
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
      disabled: ({ id, name, $activeLoans }) => !id || !name || !$activeLoans.some(i => i.id === id && i.name === name),
      loaners: ({ id, $activeLoans }) => $activeLoans.filter(i => i.id === id).map(i => i.name)
    },
    methods: {
      returnItem() {
        this.store.returnItem({ id: this.get().id, name: this.get().name });
        this.set({ id: "", name: "" });
        this.fire("returned");
      }
    },
    helpers: {
      t
    },
    oncreate() {
      if (this.get().loaners.length === 1) {
        this.set({ name: this.get().loaners[0] });
      }
    }
  };
</script>
<style>
  section {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }
  ol {
    margin-right: 1rem;
  }
  li {
    padding: 0.3rem 1rem;
    text-decoration: underline;
  }
  li.selected {
    border: 1px solid var(--fontColor);
  }
</style>