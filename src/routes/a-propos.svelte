<script context="module" lang="ts">
  export const prerender = true;

  declare var __PACKAGE_JSON__: {
    dependencies: { [key: string]: string };
    devDependencies: { [key: string]: string };
  };
</script>

<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Content from "$lib/components/Content.svelte";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Title from "$lib/components/Title.svelte";

  const pkg = __PACKAGE_JSON__;
  const dependencies = Object.entries({
    ...pkg.devDependencies,
    ...pkg.dependencies,
  })
    .map(([name, version]) => [name, version.replace(/(\^|~)/, "")])
    .map(([name, version]) => ({
      name: `${name}@${version}`,
      url: `https://www.npmjs.com/package/${name}/v/${version}`,
    }));
</script>

<Title>À propos</Title>
<Content>
  Ceci est un projet présenté à Expo-sciences par
  <a href="https://github.com/Doudou8">Vu Dang Khoa Chiem</a> et
  <a href="https://github.com/Samuel-Martineau">Samuel Martineau</a>.
</Content>
<Container>
  <Subtitle>Dépendances</Subtitle>
  <Content>
    <ul>
      {#each dependencies as { name, url }}
        <li><a href={url}>{name}</a></li>
      {/each}
    </ul>
  </Content>
</Container>
