<Button on:click="set({displayScanner: !displayScanner})" icon="barcode" big>{t("scanButton")}</Button>
{#if displayScanner}
  <Scanner on:scanned="onScan(event)" on:dismiss="set({displayScanner:false})" />
{/if}
<script>
  import t from "../../utils/wording";
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
    },
    helpers: {
      t
    }
  };
</script>