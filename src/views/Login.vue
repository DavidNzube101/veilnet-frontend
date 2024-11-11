<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="title">Authenticate with<br>Plug Wallet to continue VeilNet</h1>
      <button @click="handleICPLogin" class="submit-btn">
        <span>Login with ICP</span>
        <div class="circle"></div>
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
      <!--<p class="signup-link">
        Don't have an account? 
        <router-link to="/signup">Sign up</router-link>
      </p>-->
    </div>
    <div class="particles">
      <div v-for="n in 50" :key="n" class="particle"></div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import {ref} from 'vue'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const error = ref('');

    const handleICPLogin = async () => {
      try {
        // Check if Plug is available in the window
        if (!window.ic || !window.ic.plug) {
          error.value = 'Please install Plug wallet to authenticate.';
          return;
        }

        // Request connection to Plug wallet and get the user's identity
        const { principal, identity } = await window.ic.plug.requestConnect();

        // Wait for the identity to be available
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            if (identity) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });

        // If the identity is available, proceed with the login
        console.log('Authenticated with ICP. Principal:', principal.toString());

        // Store the user's principal in the session or a state management system
        sessionStorage.setItem('userPrincipal', principal.toString());

        // Redirect user to the feed or home page after successful login
        router.push('/feed');
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

<style src="@/styles/Login.css" scoped></style>