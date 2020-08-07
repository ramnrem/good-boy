<template>
  <section class="dogs-list-section" @scroll="onScroll">
    <div class="container">
      <div class="dogs-list">
        <DogsListCard
          v-for="(breed, i) in partOfBreeds"
          :key="i"
          :breed="breed"
        />
      </div>
    </div>
  </section>
</template>

<script>
import DogsListCard from '@/components/DogsList/DogsListCard';

export default {
  name: 'DogsList',
  components: {
    DogsListCard
  },
  props: {
    breeds: {
      type: Array,
      required: true
    },
    slicedBreeds: {
      type: Array,
      default: () => []
    },
    lazyload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: 1,
      partOfBreeds: []
    }
  },
  mounted() {
    !this.lazyload ? this.partOfBreeds = this.breeds : window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    if (this.lazyload) window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      if (this.lazyload) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          this.loadMoreBreeds();
        }
      }
    },
    loadMoreBreeds() {
      this.page += 1;
      if (this.slicedBreeds[this.page]) {
        this.slicedBreeds[this.page].forEach(el => {
          this.partOfBreeds.push(el);
        })
      }
    },
    infiniteHandler($state) {
      if (this.slicedBreeds && this.slicedBreeds.length) {
        console.log(this.slicedBreeds[this.page])
        this.page += 1;
        this.slicedBreeds[this.page].forEach(el => {
          this.partOfBreeds.push(el);
        })
        $state.loaded();
      }
    }
  },
  watch: {
    slicedBreeds: {
      deep: true,
      handler() {
        if (this.lazyload) this.partOfBreeds = this.slicedBreeds[0];
      }
    },
    breeds: {
      deep: true,
      handler() {
        if (!this.lazyload) this.partOfBreeds = this.breeds;
      }
    }
  }
}
</script>

<style lang="scss">
  
</style>