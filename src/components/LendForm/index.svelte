<section>
  <label>
      <input type="text" bind:value=name placeholder="Name" ref:input />
      <Button on:click="lendItem()" bind:disabled icon="upload">{t("action.lendAction")}</Button>
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
    },
    helpers: {
      t
    },
    oncreate() {
      this.refs.input.focus();
    }
  };
</script>
