<script context="module" lang="ts">
  import type { ErrorLoad } from "@sveltejs/kit";

  export const load: ErrorLoad = ({ error, status }) => {
    return {
      props: {
        status,
        error,
      },
    };
  };
</script>

<script lang="ts">
  export let error: Error;
  export let status: number;
</script>

<h1 class="title">{status}</h1>

<pre>
  <code>{error.stack}</code>
</pre>
