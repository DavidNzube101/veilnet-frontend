<template>
  <div class="signup-container">
    <div class="signup-box">
      <h1 class="title">Join VeilNet</h1>
      
      <!-- Add message for Plug wallet installation -->
      <div v-if="!walletInstalled" class="plug-info">
        <p>Please install the <a href="https://plugwallet.ooo" target="_blank">Plug Wallet</a> to create an ICP account.</p>
      </div>

      <form v-if="walletInstalled" @submit.prevent="handleSignup">
        <div class="input-group">
          <input type="text" id="username" v-model="username" required>
          <label for="username">Username</label>
          <div class="line"></div>
        </div>
        <div class="input-group">
          <input type="email" id="email" v-model="email" required>
          <label for="email">Email</label>
          <div class="line"></div>
        </div>
        <div class="input-group">
          <input type="password" id="password" v-model="password" required>
          <label for="password">Password</label>
          <div class="line"></div>
        </div>
        <div class="input-group">
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
          <label for="confirmPassword">Confirm Password</label>
          <div class="line"></div>
        </div>
        <button type="submit" class="submit-btn">
          <span>Sign Up</span>
          <div class="circle"></div>
        </button>
      </form>

      <p v-if="error" class="error-message">{{ error }}</p>
      <p class="login-link">
        Already have an account? 
        <router-link to="/login">Login</router-link>
      </p>
    </div>
    <div class="cyber-circuit"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from "vue";

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const error = ref('');

    const handleICPLogin = async () => {
      try {
        // Check if Plug is available in the window
        if (!window.ic || !window.ic.plug) {
          error.value = 'Plug wallet not found. Please install Plug wallet.';
          return;
        }

        // Request connection to Plug wallet and get the user's identity
        const { principal, identity } = await window.ic.plug.requestConnect();

        // If the identity is available, proceed with the login
        if (identity) {
          console.log('Authenticated with ICP. Principal:', principal.toString());

          // Store the user's principal in the session or a state management system
          sessionStorage.setItem('userPrincipal', principal.toString());

          // Redirect user to the feed or home page after successful login
          router.push('/feed');
        } else {
          error.value = 'Authentication failed. Please try again.';
        }
      } catch (err) {
        console.error('ICP login error:', err);
        error.value = 'An error occurred during login.';
      }
    };

    return {
      error,
      handleICPLogin
    };
  }
};
</script>

<style src="@/styles/Signup.css" scoped></style>