<template>
  <div class="container">
    <div class="dogs-list">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="dogs-list__card dog-cart"
      >
        <div class="dog-cart__content">
          <img :src="img" :alt="$route.params.breed" class="dog-cart__img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>