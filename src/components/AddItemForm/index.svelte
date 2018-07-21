<section>
  <label>
    Item SN
    <input ref:scanInput type="text"  />
    <ScanButton on:scan="setValue(event.data)" />
  </label>
</section>

<script>
  export default {
    components: {
      ScanButton: "../ScanButton"
    },
    methods: {
      setValue(e) {
        this.refs.scanInput.value = e.data;
      }
    }
  };
</script>
