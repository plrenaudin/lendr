<section>
  <label>
    Item S/N
    <input bind:value=id type="text" />
    <ScanButton on:scanResult="set({id: event.data})" />
    <input type="text" bind:value=description />
    <Button on:click="addItem()" bind:disabled>Add</Button>
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
        description: ""
      };
    },
    computed: {
      disabled: ({ id, description }) => !id || !description
    },
    methods: {
      addItem() {
        this.store.set({
          items: this.store.get().items.concat({ id: this.get().id, description: this.get().description })
        });
        this.set({ id: "", description: "" });
      }
    }
  };
</script>
