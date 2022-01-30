<script lang="ts">
  import Button from 'svelma/src/components/Button.svelte';
  import Field from 'svelma/src/components/Field.svelte';
  import Row from '../Row.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';

  import type { RobotDirection } from '$lib/robot/components/types/robot';
  import type { WalkDTO } from 'src/routes/api/robot/walk';
  import axios from 'axios';

  let numberOfSteps = 1;

  const url = '/api/robot/walk';
  const walk = (direction: RobotDirection) =>
    (promise = axios.post(url, { direction, numberOfSteps } as WalkDTO));
  let promise = Promise.resolve();
</script>

<style lang="scss">
  input {
    width: 150px;
  }
</style>

<Row>
  <Field label="Nombre de pas">
    <input type="number" bind:value={numberOfSteps} min="1" />
  </Field>
  {#await promise}
    <LoadingSpinner />
  {:then}
    <Button on:click={() => walk('forward')}>Avancer</Button>
    <Button on:click={() => walk('backward')}>Reculer</Button>
  {/await}
</Row>
