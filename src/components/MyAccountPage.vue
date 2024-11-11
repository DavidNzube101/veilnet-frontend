<template>
    <div class="account-container">
      <div class="account-header">
        <img :src="user.avatar || '/placeholder.svg?height=100&width=100'" alt="User avatar" class="account-avatar" />
        <h1>{{ user.name }}</h1>
        <p>@{{ user.username }}</p>
      </div>
      <div class="account-stats">
        <div class="stat">
          <strong>{{ user.posts }}</strong> Posts
        </div>
        <div class="stat">
          <strong>{{ user.followers }}</strong> Followers
        </div>
        <div class="stat">
          <strong>{{ user.following }}</strong> Following
        </div>
      </div>
      <div class="account-bio">
        <p>{{ user.bio }}</p>
      </div>
      <div class="account-actions">
        <button class="edit-profile-btn">Edit Profile</button>
      </div>
      <div class="account-posts">
        <h2>Your Posts</h2>
        <div v-for="post in userPosts" :key="post.id" class="post">
          <p>{{ post.content }}</p>
          <div class="post-meta">
            <span>{{ formatDate(post.timestamp) }}</span>
            <span>{{ post.likes }} likes</span>
            <span>{{ post.comments }} comments</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const user = ref({
    name: 'John Doe',
    username: 'johndoe',
    avatar: null,
    posts: 42,
    followers: 1337,
    following: 420,
    bio: 'Passionate developer | Coffee enthusiast | Always learning'
  });
  
  const userPosts = ref([
    { id: 1, content: 'Just deployed my first dApp on ICP!', timestamp: Date.now() - 86400000, likes: 15, comments: 3 },
    { id: 2, content: 'Exploring the potential of Web3. The future is decentralized!', timestamp: Date.now() - 172800000, likes: 23, comments: 7 },
    { id: 3, content: 'Who else is excited about the upcoming ICP hackathon?', timestamp: Date.now() - 259200000, likes: 42, comments: 12 },
  ]);
  
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  </script>
  
  <style scoped src="@/styles/MyAccountPage.css"></style>