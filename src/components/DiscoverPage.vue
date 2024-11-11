<template>
  <div class="discover-container">
    <h1>Discover</h1>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search topics or users" />
      <SearchIcon />
    </div>
    <div class="trending-topics">
      <h2>Trending Topics</h2>
      <div v-for="topic in trendingTopics" :key="topic.id" class="topic">
        <h3>#{{ topic.name }}</h3>
        <p>{{ topic.postCount }} posts</p>
      </div>
    </div>
    <div class="suggested-users">
      <h2>Who to Follow</h2>
      <div v-for="user in suggestedUsers" :key="user.id" class="user">
        <img :src="user.avatar || '/placeholder.svg?height=50&width=50'" alt="User avatar" class="user-avatar" />
        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p>@{{ user.username }}</p>
        </div>
        <button class="follow-button">Follow</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SearchIcon } from 'lucide-vue-next';

const searchQuery = ref('');

const trendingTopics = ref([
  { id: 1, name: 'ICPDevelopment', postCount: 1234 },
  { id: 2, name: 'Web3', postCount: 5678 },
  { id: 3, name: 'Blockchain', postCount: 9012 },
  { id: 4, name: 'Crypto', postCount: 3456 },
  { id: 5, name: 'DeFi', postCount: 7890 },
]);

const suggestedUsers = ref([
  { id: 1, name: 'Alice Johnson', username: 'alice_j', avatar: null },
  { id: 2, name: 'Bob Smith', username: 'bob_smith', avatar: null },
  { id: 3, name: 'Charlie Brown', username: 'charlie_b', avatar: null },
]);
</script>

<style scoped>
.discover-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2 {
  margin-bottom: 20px;
}

.search-bar {
  position: relative;
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
}

.search-bar svg {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.trending-topics, .suggested-users {
  margin-bottom: 30px;
}

.topic, .user {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
}

.topic h3, .user h3 {
  margin: 0;
  font-size: 18px;
}

.topic p, .user p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.user {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info {
  flex-grow: 1;
}

.follow-button {
  padding: 8px 16px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}
</style>