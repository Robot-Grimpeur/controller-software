<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = () => ({
    status: 302,
    redirect: '/commandes',
  });
</script>
