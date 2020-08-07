<template>
  <div class="breed">
    <VHeader />
    <section>
      <BreedPreview :images="images"/>
    </section>
  </div>
</template>

<script>
import BreedPreview from '@/components/BreedPreview';
import VHeader from '@/components/VHeader';
import axios from 'axios';


export default {
  name: 'Breed',
  components: {
    BreedPreview,
    VHeader
  },
  data() {
    return {
      images: []
    }
  },
  mounted() {
    this.loadImages();
  },
  methods: {
    async loadImages() {
      const { data } = await axios.get(`https://dog.ceo/api/breed/${this.$route.params.breed}/images`);
      this.images = data.message; 
    }
  },
  watch: {
    $route() {
      this.loadImages();
    }
  }
}
</script>

<style>

</style>