<template>
    <div class="comment-dropdown">
      <button @click="toggleComments" class="comment-toggle">
        Comments ({{ comments.length }})
        <ChevronDownIcon v-if="!showComments" />
        <ChevronUpIcon v-else />
      </button>
      <transition name="slide-fade">
        <div v-if="showComments" class="comments-container">
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <img :src="comment.authorAvatar || '/placeholder.svg?height=32&width=32'" alt="User avatar" class="comment-avatar" />
            <div class="comment-content">
              <strong>{{ comment.authorName }}</strong>
              <p>{{ comment.content }}</p>
              <span class="comment-time">{{ formatDate(comment.timestamp) }}</span>
            </div>
          </div>
          <div class="comment-form">
            <input v-model="newComment" placeholder="Add a comment..." @keyup.enter="addComment" />
            <button @click="addComment" :disabled="!newComment.trim()">Post</button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next';
  
  const props = defineProps({
    comments: {
      type: Array,
      default: () => []
    }
  });
  
  const emit = defineEmits(['add-comment']);
  
  const showComments = ref(false);
  const newComment = ref('');
  
  const toggleComments = () => {
    showComments.value = !showComments.value;
  };
  
  const addComment = () => {
    if (newComment.value.trim()) {
      emit('add-comment', newComment.value);
      newComment.value = '';
    }
  };
  
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };
  </script>
  
  <style scoped src="@/styles/PostCommentDropdown.css"></style>