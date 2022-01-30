<script lang="ts">
  export let disabled = false;
</script>

<style lang="scss">
  .disabled {
    pointer-events: none;
    filter: opacity(50%);
  }
</style>

<div class="container" class:disabled><slot /></div>
