<template>
    <div class="create-post-container">
      <h1>Create a New Post</h1>
      <div class="post-form">
        <textarea 
          v-model="postContent" 
          placeholder="What's on your mind?"
          rows="4"
        ></textarea>
        <div class="image-upload">
          <label for="image-input" class="image-upload-label">
            <ImageIcon />
            Add Image
          </label>
          <input 
            type="file" 
            id="image-input" 
            accept="image/*" 
            @change="handleImageUpload"
            class="image-input"
          >
        </div>
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Preview" />
          <button @click="removeImage" class="remove-image">
            <XIcon />
          </button>
        </div>
        <button @click="submitPost" :disabled="isSubmitting || !postContent.trim()" class="submit-button">
          {{ isSubmitting ? 'Posting...' : 'Post' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ImageIcon, XIcon } from 'lucide-vue-next';
  
  const postContent = ref('');
  const imagePreview = ref(null);
  const isSubmitting = ref(false);
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    imagePreview.value = null;
  };
  
  const submitPost = async () => {
    if (!postContent.value.trim()) return;
    
    isSubmitting.value = true;
    try {
      // Here you would typically call your backend API to create the post
      // For example: await actor.createPost({ content: postContent.value, image: imagePreview.value });
      console.log('Post submitted:', postContent.value, imagePreview.value);
      
      // Reset form after successful submission
      postContent.value = '';
      imagePreview.value = null;
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  
  <style scoped src="@/styles/CreatePostPage.css"></style>