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
    return state.filterCriteria
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
  getSignedInStorage(state) {
    return state.signedInStorage;
  },
  getKeepSignedIn(state) {
    return state.keepSignedIn;
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
    return state.movieNightList
  },
  getMovieNightButton(state) {
    return state.movieNightButton;
  },
  getStateFlex(state) {
    return state.stateFlex;
  }
};
