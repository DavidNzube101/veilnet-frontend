<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Profile Header -->
      <div class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <button class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
              <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
              <SettingsIcon class="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        <!-- Profile Info -->
        <div class="flex flex-col items-center">
          <img 
            :src="profile.avatar || '/placeholder.svg?height=80&width=80'" 
            class="w-20 h-20 rounded-full"
            alt="Profile avatar"
          />
          <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {{ profile.name }}
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ profile.title }} • {{ profile.location }}
          </p>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm">
            {{ profile.bio }}
          </p>
        </div>
  
        <!-- Action Buttons -->
        <div class="flex justify-center space-x-3">
          <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            Edit
          </button>
          <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            Share
          </button>
        </div>
  
        <!-- Navigation Tabs -->
        <div class="flex justify-center space-x-6 border-b border-gray-200 dark:border-gray-700">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2"
            :class="activeTab === tab ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' : 'border-transparent'"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
  
        <!-- Groups Section -->
        <div v-if="activeTab === 'Groups'" class="space-y-4">
          <div v-for="group in groups" :key="group.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div class="flex items-center space-x-3">
              <img :src="group.icon" class="w-12 h-12 rounded-xl" :alt="group.name" />
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 dark:text-white">{{ group.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ group.description }}</p>
              </div>
              <button class="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                {{ group.joined ? 'Joined' : 'Join' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ArrowLeftIcon, SettingsIcon } from 'lucide-vue-next'
  
  const activeTab = ref('Groups')
  const tabs = ['Posts', 'Groups', 'Connections', 'Likes']
  
  const profile = {
    name: 'Heather',
    title: 'UI/UX Designer',
    location: 'Jakarta, Indonesia',
    bio: 'Let me know if you need some help in designing.',
    avatar: '/placeholder.svg?height=80&width=80'
  }
  
  const groups = [
    {
      id: 1,
      name: 'Figma Indonesia',
      description: 'The largest Figma community in Indonesia',
      icon: '/placeholder.svg?height=48&width=48',
      joined: true
    },
    {
      id: 2,
      name: 'Product Designer Club',
      description: 'The best design news & resources',
      icon: '/placeholder.svg?height=48&width=48',
      joined: false
    }
  ]
  </script>
  
  <style scoped>
  .dark {
    color-scheme: dark;
  }
  </style>