class LocalStorage {
  key = "favoriteBreeds";

  addfavoriteBreed(breed) {
    let favoriteBreeds = this.getfavoriteBreeds();
    if (favoriteBreeds.findIndex((el) => el === breed) === -1) {
      favoriteBreeds.push(breed);
      this.__setJSON(this.key, favoriteBreeds);
    }
  }

  getfavoriteBreeds() {
    let favoriteBreeds = this.__getFromJSON(this.key);
    if (!favoriteBreeds) favoriteBreeds = [];

    return favoriteBreeds;
  }

  removeFavoriteBreeds(breed) {
    let favoriteBreeds = this.getfavoriteBreeds();

    const index = favoriteBreeds.indexOf(breed);
    favoriteBreeds.splice(index, 1);

    this.__setJSON(this.key, favoriteBreeds);
  }

  __setJSON(key, value) {
    this.__set(key, JSON.stringify(value));
  }

  __getFromJSON(key) {
    const jsonString = this.__get(key);
    return !!jsonString && typeof jsonString == "string"
      ? JSON.parse(jsonString)
      : null;
  }

  __set(key, value) {
    localStorage.setItem(key, value);
  }

  __remove(key) {
    return localStorage.removeItem(key);
  }

  __get(key) {
    return localStorage.getItem(key);
  }
}

export default new LocalStorage();
