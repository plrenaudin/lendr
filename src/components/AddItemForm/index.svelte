<section>
  <label>
      {#if !$exists}
        <input type="text" bind:value=description placeholder="Description" ref:input />
      {/if}
      <Button on:click="addItem()" icon="plus" bind:disabled>{$exists ? "Add one": "Add new"}</Button>
  </label>
</section>

<script>
  export default {
    components: {
      Button: "../Button"
    },
    data() {
      return {
        description: ""
      };
    },
    computed: {
      disabled: ({ id, description }) => !id || !description
    },
    methods: {
      addItem() {
        this.store.addItem({ id: this.get().id, description: this.get().description });
        this.set({ id: "", description: "" });
        this.fire("added");
      }
    },
    oncreate() {
      this.refs.input.focus();
      const found = this.store.get().items.find(i => i.id === this.get().id);
      this.set({ description: found ? found.description : "" });
    }
  };
</script>
