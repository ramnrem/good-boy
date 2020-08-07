import Vue from "vue";
import axios from "axios";
import localStorage from "@/helpers/localStorage";

const state = () => ({
  breedsPerPage: 20,
  breeds: [],
  slicedBreeds: [],
  favorites: [],
});

const mutations = {
  fillBreeds(state, data) {
    Vue.set(state, "breeds", data);
    state.slicedBreeds = [];
    for (let i = 0; i < data.length; i += state.breedsPerPage) {
      state.slicedBreeds.push(data.slice(i, i + state.breedsPerPage));
    }
  },
  fillFavorites(state, data) {
    Vue.set(state, "favorites", data);
  },
};

const actions = {
  loadBreeds(context) {
    axios.get(`https://dog.ceo/api/breeds/list/all`).then((response) => {
      context.commit("fillBreeds", Object.keys(response.data.message));
    });
  },
  loadFavorites(context) {
    context.commit("fillFavorites", localStorage.getfavoriteBreeds());
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
