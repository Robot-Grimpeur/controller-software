<script lang="ts">
  import Row from '$lib/components/Row.svelte';
  import Slider from '$lib/components/Slider.svelte';
  import Button from 'svelma/src/components/Button.svelte';
  import LoadingSpinner from '../LoadingSpinner.svelte';

  import axios from 'axios';
  import type { UpdateRotationControllerAngleDTO } from 'src/routes/api/robot/components/rotation-controller';
  import { rotationControllerAngleRange } from '$lib/robot/components/types/rotation-controller';

  let angle =
    (rotationControllerAngleRange[0] + rotationControllerAngleRange[1]) / 2;

  const url = '/api/robot/components/rotation-controller';
  const updateAngle = () =>
    (promise = axios.post(url, {
      angle,
    } as UpdateRotationControllerAngleDTO));
  let promise = Promise.resolve();
</script>

<Row>
  <span><b>Contrôleur de rotation:</b></span>

  <Slider
    minLabel="{rotationControllerAngleRange[0]}&deg;"
    maxLabel="{rotationControllerAngleRange[1]}&deg"
    min={rotationControllerAngleRange[0]}
    max={rotationControllerAngleRange[1]}
    step={5}
    bind:value={angle}
  />

  {#await promise}
    <LoadingSpinner />
  {:then}
    <Button on:click={updateAngle}>Déplacer à {angle}&deg;</Button>
  {/await}
</Row>
