<script lang="ts">
  import MotorControl from '../commandes/manual/MotorControl.svelte';
  import HeightControllerControl from './manual/HeightControllerControl.svelte';
  import LedControl from './manual/LedControl.svelte';
  import RotationControllerControl from './manual/RotationControllerControl.svelte';
  import ValveControl from './manual/ValveControl.svelte';
  import ValvesControl from './manual/ValvesControl.svelte';
</script>

<LedControl />
<br />
<ValveControl valveId="center" />
<br />
<ValveControl valveId="sides" />
<br />
<ValvesControl />
<br />
<MotorControl motorId="left" />
<br />
<MotorControl motorId="right" />
<br />
<MotorControl motorId="both" />
<br />
<HeightControllerControl />
<br />
<RotationControllerControl />
