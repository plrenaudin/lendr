<section>
  <label>
      <input type="text" bind:value=description />
      <Button on:click="addItem()" bind:disabled>{increment ? "Add one": "Add new"}</Button>
  </label>
</section>

<script>
  export default {
    components: {
      Button: "../Button"
    },
    data() {
      return {
        description: "",
        increment: false
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
      },
      onIdChange(newId) {
        const found = this.store.get().items.find(i => i.id === newId);
        this.set({ description: found ? found.description : "", increment: found });
      }
    },
    oncreate() {
      this.on("state", ({ changed, current }) => {
        if (changed.id) {
          this.onIdChange(current.id);
        }
      });
      this.onIdChange(this.get().id);
    }
  };
</script>
