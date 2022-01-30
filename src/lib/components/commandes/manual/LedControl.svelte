<script lang="ts">
  import Button from 'svelma/src/components/Button.svelte';
  import Row from '../../Row.svelte';
  import LoadingSpinner from '../LoadingSpinner.svelte';
  import axios from 'axios';
  import type {
    GetLedStateDTO,
    UpdateLedStateDTO,
  } from 'src/routes/api/robot/components/led';
  import { ledStatesName } from '$lib/robot/components/types/led';
  import { c } from '$lib/utils/client';
  import { InfinitePromise } from '$lib/utils/both';

  const url = '/api/robot/components/led';
  const getState = () => axios.get<GetLedStateDTO>(url).then((res) => res.data);
  const updateState = (newState: UpdateLedStateDTO) => {
    promise = InfinitePromise;
    axios.post(url, newState).then(() => (promise = getState()));
  };
  let promise = getState();
</script>

<Row>
  <span><b>DEL:</b></span>
  {#await promise}
    <LoadingSpinner />
  {:then { state }}
    <span>{c(ledStatesName[state])}</span>
    <Button
      on:click={() => updateState({ state: state === 'on' ? 'off' : 'on' })}
    >
      Changer l'état
    </Button>
  {/await}
</Row>
