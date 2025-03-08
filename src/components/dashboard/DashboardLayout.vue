<template>
  <div class="flex h-screen">
    <aside class="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul class="space-y-4">
          <li>
            <router-link to="/dashboard/crm" class="flex items-center hover:underline">
              X Ijar
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/crm" class="flex items-center hover:underline">
              <i class="fas fa-users mr-2"></i> CRM
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/management" class="flex items-center hover:underline">
              <i class="fas fa-cogs mr-2"></i> Management
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/statistics" class="flex items-center hover:underline">
              <i class="fas fa-chart-bar mr-2"></i> Statistics
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="flex-1 p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardLayout'
}
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */

aside{
    background: radial-gradient(circle, rgb(199 207 234) 0%, rgba(152, 152, 152, 0.13) 100%);
    margin: 22px;
    border-radius: 12px;
    color: #5e5e5e;
}

li{
    
    padding: 8px;
}
</style>