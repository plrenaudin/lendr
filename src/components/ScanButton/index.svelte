<Button on:click="openScanner()">Scan</Button>
<script>
  export default {
    components: {
      Button: "../Button"
    },
    methods: {
      openScanner() {
        this.store.set({ displayScanner: true });
      },
      onScan(data) {
        console.log("init", data);
        this.fire("scan", { data });
      }
    },
    oncreate() {
      this.store.on("scanned", this.onScan.bind(this));
    }
  };
</script>