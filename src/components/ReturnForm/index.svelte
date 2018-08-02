<section>
  <label>
      <input type="text" bind:value=name placeholder="Name" />
      <Button on:click="returnItem()" bind:disabled icon="download">Return</Button>
  </label>
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
      disabled: ({ id, name, $activeLoans }) => !id || !name || !$activeLoans.some(i => i.id === id && i.name === name)
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
