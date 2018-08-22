<div class="export-import">
  <div class="import">
    <label>
      <Icon name="download" />
      <input type="file" on:change="importData(event)" accept=".json" />
    </label>
  </div>
  <div class="export" on:click="exportData()">
    <Icon name="upload" />
  </div>
</div>

<script>
  import db from "../../stores/inventoryDb";
  import { shortFormatDate } from "../../utils/formatter";

  export default {
    components: {
      Icon: "../Icon"
    },
    methods: {
      exportData() {
        Promise.all([db.getAllItems(), db.getAllLoans()]).then(([items, loans]) => {
          const exportData = { items, loans };
          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData));
          const downloadAnchorNode = document.createElement("a");
          downloadAnchorNode.setAttribute("href", dataStr);
          downloadAnchorNode.setAttribute("download", `lendrExport-${shortFormatDate(new Date())}.json`);
          document.body.appendChild(downloadAnchorNode); // required for firefox
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        });
      },
      importData(event) {
        const reader = new FileReader();
        reader.onload = () => db.import(JSON.parse(reader.result)).then(() => window.location.reload());
        reader.readAsText(event.target.files[0]);
      }
    }
  };
</script>

<style>
  input[type="file"] {
    display: none;
  }
  .export-import {
    display: flex;
    justify-content: center;
  }
</style>