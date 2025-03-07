<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => window.history.length > 1 ? router.go(-1) : router.push('/')
</script>

<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <button @click="goBack" class="btn-primary">
      Go Back
    </button>
    <router-link :to="{ name: 'Home' }" class="btn-secondary">
      Return Home
    </router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1rem;
}

.btn-primary {
  margin: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  margin: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #666;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>