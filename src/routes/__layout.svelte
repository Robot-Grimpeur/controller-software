<script>
  import SideNavLink from '$lib/components/SideNavLink.svelte';
  import '../style.scss';
</script>

<nav class="navbar is-info">
  <div class="navbar-brand">
    <span class="title navbar-item">Robot grimpeur</span>
  </div>
</nav>

<aside class="menu">
  <p class="menu-label">Menu</p>
  <ul class="menu-list">
    <SideNavLink href="/commandes">Commandes</SideNavLink>
    <SideNavLink href="/informations">Informations</SideNavLink>
    <SideNavLink href="/a-propos">À propos</SideNavLink>
  </ul>
</aside>

<main>
  <slot />
</main>
