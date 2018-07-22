<section>
  <label>
    Item SN
    <input ref:scanInput type="text"  />
    <ScanButton on:scanResult="setValue(event.data)" />
  </label>
</section>

<script>
  export default {
    components: {
      ScanButton: "../ScanButton"
    },
    methods: {
      setValue(value) {
        this.refs.scanInput.value = value;
      }
    }
  };
</script>
