<script>
  import Level from "./Level.svelte";
  import LevelItem from "./LevelItem.svelte";
</script>

<Level>
  <LevelItem>
    <slot />
  </LevelItem>
</Level>
