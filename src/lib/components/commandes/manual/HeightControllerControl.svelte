<script lang="ts">
  import Row from '$lib/components/Row.svelte';
  import Slider from '$lib/components/Slider.svelte';
  import Button from 'svelma/src/components/Button.svelte';
  import LoadingSpinner from '../LoadingSpinner.svelte';

  import axios from 'axios';
  import type { UpdateHeightControllerHeightDTO } from 'src/routes/api/robot/components/height-controller';
  import { heightControllerHeightRange } from '$lib/robot/components/types/height-controller';

  let height = heightControllerHeightRange[0];

  const url = '/api/robot/components/height-controller';
  const updateHeight = () =>
    (promise = axios.post(url, { height } as UpdateHeightControllerHeightDTO));
  let promise = Promise.resolve();
</script>

<Row>
  <span><b>Contrôleur de hauteur:</b></span>

  <Slider
    minLabel="0%"
    maxLabel="100%"
    min={heightControllerHeightRange[0]}
    max={heightControllerHeightRange[1]}
    step={0.1}
    bind:value={height}
  />

  {#await promise}
    <LoadingSpinner />
  {:then}
    <Button on:click={updateHeight}>Déplacer à {height * 100}%</Button>
  {/await}
</Row>
