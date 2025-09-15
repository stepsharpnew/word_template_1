<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="header">
    <a href="http://e-systems.su/" target="_blank" class="logo-link">
      <img 
        src="https://storage.yandexcloud.net/step2002sharp/EnergoSystems.png" 
        class="logo" 
        alt="EnergoSystems logo" 
      />
    </a>
    <div class="title">Програмное обеспечение города Солнечногорск</div>
  </div>

  <HelloWorld />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #ffffff, #d1d1d1);
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.logo {
  height: 4.5em;
  margin-right: 1rem;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 1em rgba(167, 112, 112, 0.6));
}

.title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #787e849c;
  text-align: center;
}
</style>
