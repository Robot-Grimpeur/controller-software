<script>
  import TranslationControl from '$lib/components/commandes/TranslationControl.svelte';
  import RotationControl from '$lib/components/commandes/RotationControl.svelte';
  import ManualControls from '$lib/components/commandes/ManualControls.svelte';
  import PowerControl from '$lib/components/commandes/PowerControls.svelte';
  import Container from '$lib/components/Container.svelte';
  import Subtitle from '$lib/components/Subtitle.svelte';
  import Title from '$lib/components/Title.svelte';
</script>

<Title>Contrôle</Title>

<Container>
  <Subtitle>Translation</Subtitle>
  <TranslationControl />
</Container>

<hr />

<Container disabled>
  <Subtitle>Rotation</Subtitle>
  <RotationControl />
</Container>

<hr />

<Container>
  <Subtitle>Alimentation</Subtitle>
  <PowerControl />
</Container>

<hr />

<Container>
  <Subtitle>Manuel</Subtitle>
  <ManualControls />
</Container>
