export const getters = {
  getSearch(state) {
    return state.search;
  },
  getUser(state) {
    return state.user;
  },
  getPosterViewTrueFalse(state) {
    return state.posterView;
  },
  getSearchResult(state) {
    return state.searchResult;
  },
  getFilterCriteria(state) {
    return state.filterCriteria;
  },
  getLoginFailure(state) {
    return state.loginFailure;
  },
  getFailureMessage(state) {
    return state.failureMessage;
  },
  getSignedIn(state) {
    return state.signedIn;
  },
  getSignInBox(state) {
    return state.signInBox;
  },
  getRegisterBox(state) {
    return state.registerBox;
  },
  getSignedInStorage(state) {
    return state.signedInStorage;
  },
  getKeepSignedIn(state) {
    return state.keepSignedIn;
  },
  getFirstTimeUser(state) {
    return state.firstTimeUser;
  },
  getUserCollection(state) {
    return state.userCollection;
  },
  getCustomShelfs(state) {
    return state.customShelfs;
  },
  getSelectedMovie(state) {
    return state.selectedMovie;
  },
  getChosen(state) {
    return state.chosen;
  },
  getAlertWindowClosed(state) {
    return state.alertWindowClosed
  },
  getInCollection(state) {
    return state.inCollection;
  },
  getEmailDocumentId(state) {
    return state.emailDocumentId;
  },
  getFormats(state) {
    return state.formats.sort((a, b) => (a > b ? 1 : -1));
  },
  getEditions(state) {
    return state.editions.sort((a, b) => (a > b ? 1 : -1));
  },
  getMovieNightList(state) {
    return state.movieNightList;
  },
  getMovieNightButton(state) {
    return state.movieNightButton;
  },
  getStateFlex(state) {
    return state.stateFlex;
  },
  getSavedMovieNightLists(state) {
    return state.savedMovieNightList;
  },
  getMovieNightListFromDB(state) {
    return state.movieNightListFromDB;
  },
  getSoundtrackSearchResult(state) {
    return state.soundtrackSearchResult;
  },
  getMusicFormats(state) {
    return state.musicFormats;
  },
  getSelectedSoundtrack(state) {
    return state.selectedSoundtrack;
  },
  getSelectedTrueFalse(state) {
    return state.selectedTrueFalse;
  },
  getSoundtracksId(state) {
    return state.soundtracksId;
  },
  getSoundtrackList(state) {
    return state.soundtrackList;
  },
  getSearchFailure(state) {
    return state.searchFailure;
  },
  getSearchSavedSoundtracks(state) {
    return state.searchSavedSoundtracks;
  },
  getSoundtrackInCollection(state) {
    return state.soundtrackInCollection;
  },
  getMenuDropdown(state) {
    return state.menuDropdown;
  },
  getUneditedShelfs(state) {
    return state.uneditedShelfs;
  },
  getEditedShelfs(state) {
    return state.editedShelfs;
  },
  getBeforeEditShelfs(state) {
    return state.beforeEditShelfs;
  }
};
