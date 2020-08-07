<template>
  <div class="home">
    <VHeader />
    <DogsList :breeds="breeds" :slicedBreeds="slicedBreeds" :lazyload="true"/>
  </div>
</template>

<script>
import VHeader from '@/components/VHeader';
import DogsList from '@/components/DogsList/DogsList';
import { mapState } from 'vuex';


export default {
  name: 'Home',
  components: {
    VHeader,
    DogsList
  },
  computed: {
    ...mapState({
      breeds: state => state.breeds.breeds,
      slicedBreeds: state => state.breeds.slicedBreeds
    })
  }
}
</script>
