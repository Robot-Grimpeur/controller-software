<script lang="ts">
  import Button from 'svelma/src/components/Button.svelte';
  import Row from '../Row.svelte';

  import axios from 'axios';

  const shutdown = () => axios.post('/api/shutdown');
  const reboot = () => axios.post('/api/reboot');
</script>

<Row>
  <Button on:click={shutdown}>Éteindre</Button>
  <Button on:click={reboot}>Redémarrer</Button>
</Row>
