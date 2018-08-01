<Button on:click="set({displayScanner: !displayScanner})" icon="barcode" big>Scan</Button>
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
        this.set({ displayScanner: false });
        this.fire("scanResult", { data });
      }
    }
  };
</script>