<script lang="ts">
  export let minLabel: string;
  export let maxLabel: string;
  export let min: number;
  export let max: number;
  export let step: number;
  export let value: number;
</script>

<style lang="scss">
  input {
    width: 20vw;
  }

  span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
</style>

<span>{minLabel}</span>

<input class="input" type="range" {min} {max} {step} bind:value />

<span>{maxLabel}</span>
