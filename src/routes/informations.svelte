<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    return {
      props: {
        healthData: await (await fetch("/api/health")).json(),
      },
    };
  };
</script>

<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Content from "$lib/components/Content.svelte";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Title from "$lib/components/Title.svelte";
  import type { HealthData } from "./api/health";

  export let healthData: HealthData;
</script>

<Title>Informations</Title>

<Container>
  <Title>Général</Title>

  <Content>
    <b>Mode:</b>
    {healthData.mode}
  </Content>
</Container>

<hr />

<Container>
  <Subtitle>Raspberry Pi</Subtitle>

  <Content>
    <b>Statut thermique:</b>

    {#if healthData.throttled.length}
      <ul>
        {#each healthData.throttled as message}
          <li>{message}</li>
        {/each}
      </ul>
    {:else}
      &empty;
    {/if}
  </Content>
</Container>
