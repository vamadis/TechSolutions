<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/permissions" class="navbar-brand">TechSolutions</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/permissions" class="nav-link">Listado de permisos</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'add-permission', params: { id: 0 } }" class="nav-link">Agregar permiso</router-link>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
