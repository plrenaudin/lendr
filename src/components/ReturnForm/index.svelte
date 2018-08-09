<section>
  <ul>
    {#each loaners as loaner}
      <li class={name === loaner ? 'selected': ''}><a on:click="set({name:loaner})" role="button">{loaner}</a></li>
    {/each}
  </ul>
  <Button on:click="returnItem()" bind:disabled icon="download">Return</Button>
</section>

<script>
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
  ul {
    list-style-type: none;
    margin-right: 1rem;
  }
  li {
    padding: 0.3rem 1rem;
    text-align: center;
  }
  li.selected {
    border: 1px solid var(--fontColor);
  }
</style>