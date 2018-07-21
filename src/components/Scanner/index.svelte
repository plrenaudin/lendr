<div class="scanner-container">
  <section id="scanner"></section>
</div>

<script>
  import Quagga from "quagga";

  const SAMPLE_AMOUNT = 20;

  const mostCommonOccurrence = input => {
    let result,
      best = -1,
      lookup = {};
    for (let i = 0; i < input.length; i++) {
      if (lookup[input[i]] == undefined) {
        lookup[input[i]] = 0;
      }
      lookup[input[i]]++;
      if (lookup[input[i]] > best) {
        best = lookup[input[i]];
        result = input[i];
      }
    }
    return result;
  };

  export default {
    data: () => ({
      samples: []
    }),

    methods: {
      initScanner() {
        const me = this;
        const scannerEl = document.getElementById("scanner");
        Quagga.init(
          {
            numOfWorkers: 1, // navigator.hardwareConcurrency || 4,
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
            locate: false,
            decoder: {
              readers: ["ean_reader"],
              debug: {
                drawBoundingBox: true,
                showFrequency: true,
                drawScanline: true,
                showPattern: true
              }
            }
          },
          function(err) {
            if (err) {
              console.error(err);
              return;
            }
            me.fire("scanner-intiated");
          }
        );
      },
      onScannerInitiated() {
        Quagga.onDetected(this.onScannerSuccess.bind(this));
        Quagga.onProcessed(this.onProcessing);
        Quagga.start();
      },
      onProcessing(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;

        if (result && result.codeResult && result.codeResult.code) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("height"))
          );
          Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, { color: "red", lineWidth: 3 });
        }
      },
      onScannerSuccess(data) {
        const { samples } = this.get();
        this.set({ samples: samples.concat(data.codeResult.code) });
        if (samples.length >= SAMPLE_AMOUNT) {
          Quagga.stop();
          this.store.set({ scanResult: mostCommonOccurrence(samples), displayScanner: false });
        }
      }
    },
    oncreate() {
      this.on("scanner-intiated", this.onScannerInitiated);
      this.store.set({ scanResult: "" });
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