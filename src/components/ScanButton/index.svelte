<Button on:click="set({displayScanner: true})">Scan</Button>
{#if displayScanner}
  <Scanner on:scanned="onScan(event)" />
{/if}
<script>
  export default {
    data() {
      return {
        displayScanner: false
      };
    },
    components: {
      Button: "../Button",
      Scanner: "../Scanner"
    },
    methods: {
      onScan({ data }) {
        this.fire("scanResult", { data });
        this.set({ displayScanner: false });
      }
    },
    oncreate() {
      this.store.on("scanned", this.onScan.bind(this));
    }
  };
</script>