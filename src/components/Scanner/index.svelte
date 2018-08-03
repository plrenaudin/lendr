<div class="scanner-container">
  <div class="overlay" on:click="fire('dismiss')"></div>
  <section id="scanner">
    <video id="video" style="border: 1px solid gray"></video>
  </section>
</div>

<script>
  import { BrowserBarcodeReader, VideoInputDevice } from "@zxing/library";

  export default {
    data() {
      return {
        samples: []
      };
    },
    oncreate() {
      this.codeReader = new BrowserBarcodeReader();
      this.codeReader
        .decodeFromInputVideoDevice(undefined, "video")
        .then(result => {
          this.fire("scanned", { data: result.getText() });
        })
        .catch(err => console.error(err));
    },
    ondestroy() {
      this.codeReader.reset();
    }
  };
</script>

<style>
  @import "../../styles";
  .scanner-container {
    position: fixed;
    left: 0;
  }
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: black;
    top: 0;
    left: 0;
    opacity: 0.8;
  }
  video {
    width: 100%;
    height: 400px;
    border: none !important;
  }
  #scanner {
    position: fixed;
    top: 0;
  }
</style>