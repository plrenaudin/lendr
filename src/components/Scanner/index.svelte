<div class="scanner-container">
  <section id="scanner"></section>
  {data}
</div>

<script>
  import Quagga from "quagga";

  export default {
    data: () => ({
      initiated: false,
      data: ""
    }),

    methods: {
      initScanner() {
        const me = this;
        const scannerEl = document.getElementById("scanner");
        Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: scannerEl,
              constraints: {
                width: scannerEl.offsetWidth,
                height: scannerEl.offsetHeight,
                facingMode: "environment"
              }
            },
            locate: true,
            locator: {
              patchSize: "x-large"
            },
            decoder: {
              readers: ["ean_reader"],
              debug: {
                drawBoundingBox: true,
                showFrequency: true,
                drawScanline: true,
                showPattern: true
              }
            },
            debug: true
          },
          function(err) {
            if (err) {
              console.log(err);
              return;
            }
            me.fire("scanner-intiated");
          }
        );
      },
      onScannerInitiated() {
        this.set({ initiated: true });
        Quagga.onDetected(this.onScannerSuccess.bind(this));
        Quagga.onProcessed(this.onProcessing);
        Quagga.start();
        console.log("Initialization finished. Ready to start");
      },
      onProcessing(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0,
              0,
              parseInt(drawingCanvas.getAttribute("width")),
              parseInt(drawingCanvas.getAttribute("height"))
            );
            result.boxes
              .filter(function(box) {
                return box !== result.box;
              })
              .forEach(function(box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
              });
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, { color: "red", lineWidth: 3 });
          }
        }
      },
      onScannerSuccess(data) {
        this.set({ data: data.codeResult.code });
        console.log(data);
        Quagga.stop();
      }
    },
    oncreate() {
      this.on("scanner-intiated", this.onScannerInitiated);
      this.initScanner();
    }
  };
</script>

<style>
  #scanner {
    min-height: 300px;
    width: 100%;
    position: relative;
  }
</style>