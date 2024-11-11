<template>
  <div class="feed-container">
    <h1>VeilNet Feed</h1>
    
    <div class="post-form">
      <textarea v-model="newPostContent" placeholder="What's on your mind?"></textarea>
      <button @click="createPost" :disabled="isCreatingPost">Post</button>
    </div>

    <div v-if="isLoading" class="loading">Loading posts...</div>
    
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="posts">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-header">
          <div class="post-meta">
            <div class="user-name">{{ post.authorName || 'Anonymous' }}</div>
            <div class="post-time">{{ formatDate(post.timestamp) }}</div>
          </div>
        </div>
        <p class="post-content">{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { createPost, getPosts } from '../utils/ic-agent.js';

export default {
  name: 'FeedView',
  setup() {
    const posts = ref([]);
    const newPostContent = ref('');
    const isCreatingPost = ref(false);
    const isLoading = ref(true);
    const error = ref('');

    const loadPosts = async () => {
      isLoading.value = true;
      try {
        posts.value = await getPosts();
      } catch (err) {
        error.value = 'Failed to load posts.';
      } finally {
        isLoading.value = false;
      }
    };

    const handlePostCreation = async () => {
      if (!newPostContent.value.trim()) return;
      isCreatingPost.value = true;
      try {
        await createPost(newPostContent.value);
        newPostContent.value = '';
        await loadPosts();
      } catch (err) {
        error.value = 'Failed to create post.';
      } finally {
        isCreatingPost.value = false;
      }
    };

    onMounted(loadPosts);

    return {
      posts,
      newPostContent,
      isCreatingPost,
      isLoading,
      error,
      handlePostCreation,
    };
  },
};
</script>

<style scoped src="@/styles/FeedView.css"></style>
