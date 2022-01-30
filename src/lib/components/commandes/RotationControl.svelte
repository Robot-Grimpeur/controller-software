<script lang="ts">
  import Row from '../Row.svelte';
  import Button from 'svelma/src/components/Button.svelte';
  import Slider from '../Slider.svelte';

  const maxAngle = 60;
  const minAngle = -maxAngle;

  let angle = 0;
</script>

<Row>
  <Slider
    minLabel="{minAngle}&deg;"
    maxLabel="{maxAngle}&deg;"
    min={minAngle}
    max={maxAngle}
    step={5}
    bind:value={angle}
  />

  <Button>Tourner de {angle}&deg;</Button>
</Row>
