<template>
  <button @click="toggleLike" class="like-button" :class="{ 'liked': isLiked }">
    <HeartIcon :class="{ 'animate-like': animateLike }" />
    <span>{{ likes }}</span>
  </button>
</template>

<script setup>
import { ref, watch } from 'vue';
import { HeartIcon } from 'lucide-vue-next';

const props = defineProps({
  initialLikes: {
    type: Number,
    default: 0
  },
  initialIsLiked: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:likes']);

const likes = ref(props.initialLikes);
const isLiked = ref(props.initialIsLiked);
const animateLike = ref(false);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  likes.value += isLiked.value ? 1 : -1;
  animateLike.value = true;
  emit('update:likes', likes.value);
};

watch(animateLike, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      animateLike.value = false;
    }, 300);
  }
});
</script>

<style scoped>
.like-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
}

.like-button.liked {
  color: #e0245e;
}

.like-button svg {
  margin-right: 5px;
}

@keyframes likeAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.animate-like {
  animation: likeAnimation 0.3s ease;
}
</style>