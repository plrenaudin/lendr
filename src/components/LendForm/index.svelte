<section>
  <label>
      <input type="text" bind:value=name placeholder="Name" />
      <Button on:click="lendItem()" bind:disabled icon="upload">Lend</Button>
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
      disabled: ({ id, name }) => !id || !name
    },
    methods: {
      lendItem() {
        this.store.lendItem({ id: this.get().id, name: this.get().name });
        this.set({ id: "", name: "" });
        this.fire("lent");
      }
    }
  };
</script>
