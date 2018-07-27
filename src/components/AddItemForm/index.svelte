<section>
  <label>
    Item S/N
    <input bind:value=id type="text" />
    <ScanButton on:scanResult="set({id: event.data})" />
    {#if id}
      <input type="text" bind:value=description />
      <Button on:click="addItem()" bind:disabled>{increment ? "Add one": "Add new"}</Button>
    {/if}
  </label>
</section>

<script>
  export default {
    components: {
      ScanButton: "../ScanButton",
      Button: "../Button"
    },
    data() {
      return {
        id: "",
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
      }
    },
    oncreate() {
      this.on("state", ({ changed, current }) => {
        if (changed.id) {
          const found = this.store.get().items.find(i => i.id === current.id);
          this.set({ description: found ? found.description : "", increment: found });
        }
      });
    }
  };
</script>
