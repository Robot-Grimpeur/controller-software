<script lang="ts">
  import Button from 'svelma/src/components/Button.svelte';
  import LoadingSpinner from '../LoadingSpinner.svelte';
  import Row from '$lib/components/Row.svelte';

  import { MotorId, motorsName } from '$lib/robot/components/types/motors';
  import axios from 'axios';
  import type { UpdateMotorMovementDTO } from 'src/routes/api/robot/components/motor/[motorId]';
  import type { UpdateMotorDirectionUntilSwitchDTO } from 'src/routes/api/robot/components/motor/[motorId]/until-switch';

  export let motorId: MotorId | 'both';

  const url = `/api/robot/components/${
    motorId === 'both' ? 'motors' : `motor/${motorId}`
  }`;
  const updateMovement = (newMovement: UpdateMotorMovementDTO) =>
    (promise = axios.post(url, newMovement));
  const updateDirectionUntilSwitch = (
    direction: UpdateMotorDirectionUntilSwitchDTO
  ) => (promise = axios.post(`${url}/until-switch`, direction));
  let promise = Promise.resolve();
</script>

<Row>
  <span>
    <b>
      {#if motorId === 'both'}
        Moteurs
      {:else}
        Moteur « {motorsName[motorId]} »:
      {/if}
    </b>
  </span>

  {#await promise}
    <LoadingSpinner />
  {:then}
    <Button on:click={() => updateMovement({ movement: 'forward' })}>
      Avancer
    </Button>
    <Button on:click={() => updateMovement({ movement: 'backward' })}>
      Reculer
    </Button>
    <Button on:click={() => updateMovement({ movement: 'none' })}>
      Arrêter
    </Button>
    <Button
      on:click={() => updateDirectionUntilSwitch({ direction: 'forward' })}
    >
      Avancer jusqu'à l'interrupteur
    </Button>
    <Button
      on:click={() => updateDirectionUntilSwitch({ direction: 'backward' })}
    >
      Reculer jusqu'à l'interrupteur
    </Button>
  {/await}
</Row>
