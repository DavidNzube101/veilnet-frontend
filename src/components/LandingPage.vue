<template>
  <div class="landing-page">
    <header>
      <nav>
        <div class="logo">
          <img src="../images/icons/veilnet-logo-removebg-preview.png" alt="VeilNet's Logo">
          <p>VeilNet</p>
        </div>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section class="hero">
        <h1>Welcome to VeilNet</h1>
        <p>The Future of Decentralized Social Networking for Students</p>
        <div class="cta-buttons">
          <button class="primary">
            <router-link to="/login" class="router-normal-link">Get Started</router-link>
          </button>
          <button class="secondary">Learn More</button>
        </div>
      </section>

      <section id="features" class="features">
        <h2>Powered by Internet Computer Protocol (ICP)</h2>
        <div class="feature-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <component :is="feature.icon" class="feature-icon" />
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <section id="about" class="about">
        <h2>About VeilNet</h2>
        <p>VeilNet is a revolutionary decentralized social platform designed exclusively for students. Leveraging the power of the Internet Computer Protocol, we provide a secure, anonymous, and engaging environment for academic collaboration and social interaction.</p>
      </section>

      <section id="contact" class="contact">
        <h2>Join the Revolution</h2>
        <p>Be part of the future of social networking</p>
        <form @submit.prevent="handleSubmit">
          <input type="email" v-model="email" placeholder="Enter your email" required>
          <button type="submit">Stay Updated</button>
        </form>
      </section>
    </main>

    <footer>
      <p>&copy; 2024 VeilNet. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Network, Shield, Lock, Users } from 'lucide-vue-next'

const email = ref('')

const features = [
  {
    icon: Network,
    title: 'Decentralized Infrastructure',
    description: 'Built on ICP for unparalleled security and scalability'
  },
  {
    icon: Shield,
    title: 'Anonymous Profiles',
    description: 'Protect your identity while connecting with peers'
  },
  {
    icon: Lock,
    title: 'Secure Messaging',
    description: 'End-to-end encrypted communication'
  },
  {
    icon: Users,
    title: 'Community Spaces',
    description: 'Join interest-based groups and discussions'
  }
]

const handleSubmit = () => {
  console.log('Submitted email:', email.value)
  email.value = ''
}
</script>

<style src="@/styles/LandingPage.css" scoped></style>