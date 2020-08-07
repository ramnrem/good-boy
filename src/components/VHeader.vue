<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__right-nav">
        <router-link to="/" class="header__link">Home</router-link>

        <select id="dogs-breeds" @change="selectChanged">
          <option v-for="(breed, i) in breeds" :key="i" :value="breed">{{ breed }}</option>
        </select>
      </div>

      <router-link to="/favorites" class="header__link">Favorites</router-link>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'; 
export default {
  name: 'VHeader',
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapState({
      breeds: state => state.breeds.breeds,
    })
  },
  mounted() {
    this.loadBreeds();
    this.loadFavorites();
  },
  methods: {
    ...mapActions({
      loadBreeds: 'breeds/loadBreeds',
      loadFavorites: 'breeds/loadFavorites'
    }),
    selectChanged(e) {
      this.$router.push(`/breed/${e.target.value}`);
    }
  }
}
</script>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid rgba(0,0,0,.4);
    margin-bottom: 50px;
    select {
      padding: 5px 10px;
      height: 30px;
      font-size: 13px;
    }
    &__right-nav {
      .header__link {
        margin-right: 30px;
      }
    }
    &__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__link {
      font-size: 14px;
      color: #000;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      &:hover {
        border-color: #000;
      }
    }
  }
</style>