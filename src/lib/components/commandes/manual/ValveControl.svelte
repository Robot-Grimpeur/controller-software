<script lang="ts">
  import Row from '$lib/components/Row.svelte';
  import Button from 'svelma/src/components/Button.svelte';
  import LoadingSpinner from '../LoadingSpinner.svelte';

  import {
    ValveId,
    valvesName,
    valveTargetsName,
  } from '$lib/robot/components/types/valves';
  import { c } from '$lib/utils/client';
  import { InfinitePromise } from '$lib/utils/both';
  import axios from 'axios';
  import type {
    GetValveTargetDTO,
    UpdateValveTargetDTO,
  } from 'src/routes/api/robot/components/valve/[valveId]';
  import { invalidate } from './ValvesControl.svelte';

  export let valveId: ValveId;

  const url = `/api/robot/components/valve/${valveId}`;
  const getTarget = () =>
    axios.get<GetValveTargetDTO>(url).then((res) => res.data);
  const updateTarget = (newTarget: UpdateValveTargetDTO) => {
    promise = InfinitePromise;
    axios.post(url, newTarget).then(() => (promise = getTarget()));
  };
  let promise = getTarget();

  invalidate.subscribe(() => (promise = getTarget()));
</script>

<Row>
  <span><b>Valve « {valvesName[valveId]} »:</b></span>
  {#await promise}
    <LoadingSpinner />
  {:then { target }}
    <span>{c(valveTargetsName[target])}</span>
    <Button
      on:click={() =>
        updateTarget({
          target: target === 'pump' ? 'atmosphere' : 'pump',
        })}
    >
      Changer la cible
    </Button>
  {/await}
</Row>
