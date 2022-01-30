<script>
  import { page } from "$app/stores";

  export let href;
</script>

<li><a {href} class:is-active={href === $page.path}><slot /></a></li>
