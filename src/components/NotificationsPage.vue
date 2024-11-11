<template>
    <div class="notifications-container">
      <h1>Notifications</h1>
      <div v-for="notification in notifications" :key="notification.id" class="notification" :class="{ 'unread': !notification.read }">
        <img :src="notification.avatar || '/placeholder.svg?height=40&width=40'" alt="User avatar" class="notification-avatar" />
        <div class="notification-content">
          <p><strong>{{ notification.username }}</strong> {{ notification.action }}</p>
          <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const notifications = ref([
    { id: 1, username: 'Alice', action: 'liked your post.', avatar: null, timestamp: Date.now() - 300000, read: false },
    { id: 2, username: 'Bob', action: 'commented on your post: "Great idea!"', avatar: null, timestamp: Date.now() - 3600000, read: false },
    { id: 3, username: 'Charlie', action: 'started following you.', avatar: null, timestamp: Date.now() - 86400000, read: true },
    { id: 4, username: 'David', action: 'mentioned you in a comment.', avatar: null, timestamp: Date.now() - 172800000, read: true },
    { id: 5, username: 'Eve', action: 'shared your post.', avatar: null, timestamp: Date.now() - 259200000, read: true },
  ]);
  
  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };
  </script>
  
  <style scoped>
  .notifications-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .notification {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .notification.unread {
    background-color: #f0f8ff;
  }
  
  .notification-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .notification-content {
    flex-grow: 1;
  }
  
  .notification-content p {
    margin: 0;
  }
  
  .notification-time {
    font-size: 0.8em;
    color: #666;
  }
  </style>