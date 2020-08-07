<template>
  <div class="home">
    <VHeader />
    <DogsList v-if="favorites.length" :breeds="favorites"/>
    <div class="container" style="text-align: center;" v-else>
      <router-link to="/">Choose</router-link> your favorite breeds
    </div>
  </div>
</template>

<script>
import VHeader from '@/components/VHeader.vue';
import DogsList from '@/components/DogsList/DogsList';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    VHeader,
    DogsList
  },
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapState({
      favorites: state => state.breeds.favorites
    })
  }
}
</script>
