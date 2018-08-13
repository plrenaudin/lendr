<section>
  <label>
      {#if !$exists}
        <input type="text" bind:value=description placeholder="Description" ref:input />
      {/if}
      <Button on:click="addItem()" icon="plus" bind:disabled>{t($exists ? "action.addOne": "action.addAction")}</Button>
  </label>
</section>

<script>
  import t from "../../utils/wording";
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
      disabled: ({ id, description, $exists }) => !$exists && (!id || !description)
    },
    methods: {
      addItem() {
        this.store.addItem({ id: this.get().id, description: this.get().description });
        this.set({ id: "", description: "" });
        this.fire("added");
      }
    },
    helpers: {
      t
    },
    oncreate() {
      this.refs.input && this.refs.input.focus();
      const found = this.store.get().items.find(i => i.id === this.get().id);
      this.set({ description: found ? found.description : "" });
    }
  };
</script>
