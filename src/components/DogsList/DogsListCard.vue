<template>
  <div  @click.stop="changeFavoriteStatus" class="dogs-list__card dog-cart">
    <button @click.stop="changeFavoriteStatus" :class="{ active: isFavorite } " class="dog-cart__btn" >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6924 3.91706C11.3055 4.28838 10.6945 4.28838 10.3076 3.91706L9.6152 3.2526C8.80477 2.47487 7.70994 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.88263 3.28979 10.8501 5.15176 12.4666C7.01532 14.0844 9.2434 15.1574 10.5746 15.7051C10.853 15.8196 11.147 15.8196 11.4254 15.7051C12.7566 15.1574 14.9847 14.0844 16.8482 12.4666C18.7102 10.85 20 8.88262 20 6.5C20 4.01472 17.9853 2 15.5 2C14.2901 2 13.1952 2.47487 12.3848 3.2526L11.6924 3.91706ZM11 1.80957C9.83211 0.688804 8.24649 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 12.8683 6.97034 16.385 9.81379 17.5547C10.5796 17.8697 11.4204 17.8697 12.1862 17.5547C15.0297 16.385 22 12.8682 22 6.5C22 2.91015 19.0899 0 15.5 0C13.7535 0 12.1679 0.688804 11 1.80957Z" fill="black"/>
      <path d="M9.6152 3.2526L10.3076 3.91706C10.6945 4.28838 11.3055 4.28838 11.6924 3.91706L12.3848 3.2526C13.1952 2.47487 14.2901 2 15.5 2C17.9853 2 20 4.01472 20 6.5C20 8.88262 18.7102 10.85 16.8482 12.4666C14.9847 14.0844 12.7566 15.1574 11.4254 15.7051C11.147 15.8196 10.853 15.8196 10.5746 15.7051C9.2434 15.1574 7.01532 14.0844 5.15176 12.4666C3.28979 10.8501 2 8.88263 2 6.5C2 4.01472 4.01472 2 6.5 2C7.70994 2 8.80477 2.47487 9.6152 3.2526Z" :fill="isFavorite ? '#000' : '#fff'"/>
      </svg>
    </button>
    <div class="dog-cart__content" v-if="imgUrl">
      <img :src="imgUrl" :alt="breed" class="dog-cart__img">
      <div class="dog-cart__title">{{ breed }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex'; 

import localStorage from '@/helpers/localStorage';

export default {
  name: 'DogsListCard',
  props: {
    breed: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imgUrl: null
    }
  },
  computed: {
    ...mapState({
      favorites: state => state.breeds.favorites
    }),
    isFavorite() {
      return this.favorites.findIndex(el => el === this.breed) !== -1;
    }
  },
  mounted() {
    this.getImage();
  },
  methods: {
    ...mapActions({
      loadFavorites: 'breeds/loadFavorites'
    }),
    async getImage() {
      const { data } = await axios.get(`https://dog.ceo/api/breed/${this.breed}/images`);
      this.imgUrl = data.message[0]; 
    },
    changeFavoriteStatus() {
      if (this.isFavorite) {
        localStorage.removeFavoriteBreeds(this.breed);
      } else {
        localStorage.addfavoriteBreed(this.breed);
      }
      this.loadFavorites();
      this.getImage();
    }
  }
}
</script>

<style lang="scss">
  
</style>