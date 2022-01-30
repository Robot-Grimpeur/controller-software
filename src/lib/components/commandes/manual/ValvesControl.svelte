<script context="module" lang="ts">
  import { Emitter } from '$lib/utils/both';

  export const invalidate = new Emitter();
</script>

<script lang="ts">
  import Row from '$lib/components/Row.svelte';
  import Button from 'svelma/src/components/Button.svelte';
  import LoadingSpinner from '../LoadingSpinner.svelte';

  import axios from 'axios';
  import type { UpdateValvesTargetDTO } from 'src/routes/api/robot/components/valves';

  const url = '/api/robot/components/valves';
  const updateTarget = (newTarget: UpdateValvesTargetDTO) =>
    (promise = axios.post(url, newTarget).then(() => invalidate.emit()));
  let promise = Promise.resolve();
</script>

<Row>
  <span><b>Valves:</b></span>
  {#await promise}
    <LoadingSpinner />
  {:then}
    <Button
      on:click={() =>
        updateTarget({
          target: 'pump',
        })}
    >
      Cibler la pompe
    </Button>
    <Button
      on:click={() =>
        updateTarget({
          target: 'atmosphere',
        })}
    >
      Cibler l'atmosphère
    </Button>
  {/await}
</Row>
