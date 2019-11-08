export const mutations = {
    setSearch(state, search) {
        state.search = search;
      },
      setPosterViewTrueFalse(state, view) {
        state.posterView = view;
      },
      setSearchResult(state, search) {
        state.searchResult = search;
      },
      setFilterCriteria(state, criteria) {
        state.filterCriteria = criteria;
      },
      setLoginFailure(state, login) {
        state.loginFailure = login;
      },
      setFailureMessage(state, message) {
        state.failureMessage = message;
      }, 
      setSignedIn(state, signedIn) {
        state.signedIn = signedIn;
      },
      setUser(state, user) {
        state.user = user;
      },
      setSignedInStorage(state, storage) {
        state.signedInStorage = storage;
      },
      setKeepSignedIn(state, keep) {
        state.keepSignedIn = keep;
      },
      setUserCollection(state, collection) {
        state.userCollection = collection;
      },
      setCustomShelfs(state, customShelfs) {
        state.customShelfs = customShelfs;
      },
      setEmailDocumentId(state, id) {
        state.emailDocumentId = id;
      },
      setInCollection(state, inCollection) {
        state.inCollection = inCollection;
      },
      setSelectedMovie(state, selectedMovie) {
        state.selectedMovie = selectedMovie;
      },
      setMovieNightList(state, list) {
        state.movieNightList = list;
      },
      setMovieNightListPush(state, movie) {
        state.movieNightList.push(movie);
      },
      setMovieNightButton(state, button) {
        state.movieNightButton = button;
      },
      setStateFlex(state, flex) {
        state.stateFlex = flex;
      }
}