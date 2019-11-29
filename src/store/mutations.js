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
      setSignInBox(state, signInBox) {
        state.signInBox = signInBox;
      },
      setRegisterBox(state, registerBox) {
        state.registerBox = registerBox;
      },
      setUser(state, user) {
        state.user = user;
      },
      setFirstTimeUser(state, first) {
        state.firstTimeUser = first;
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
      setChosen(state, view) {
        state.chosen = view;
      },
      setAlertWindowClosed(state, closed) {
        state.alertWindowClosed = closed;
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
      },
      setSavedMovieNightLists(state, movieNightList) {
        state.savedMovieNightList.push(movieNightList);
      },
      setMovieNightListFromDB(state, movies) {
        state.movieNightListFromDB = movies;
      },
      setSoundtrackSearchResult(state, list) {
        state.soundtrackSearchResult = list;
      },
      setSelectedSoundtrack(state, soundtrack) {
        state.selectedSoundtrack = soundtrack;
      },
      setSelectedTrueFalse(state, trueFalse) {
        state.selectedTrueFalse = trueFalse;
      },
      setSoundtracksId(state, id) {
        state.soundtracksId = id;
      },
      setSoundtrackList(state, list) {
        state.soundtrackList = list;
      },
      setSearchFailure(state, failure) {
        state.searchFailure = failure;
      },
      setSearchSavedSoundtracks(state, search) {
        state.searchSavedSoundtracks = search;
      },
      setSoundtrackInCollection(state, inCollection) {
        state.soundtrackInCollection = inCollection;
      },
      setMenuDropdown(state, drop) {
        state.menuDropdown = drop;
      },
      setUneditedShelfs(state, shelfs) {
        state.uneditedShelfs = shelfs;
      },
      setEditedShelfs(state, shelf) {
        state.editedShelfs.push(shelf);
      },
      setBeforeEditShelfs(state, shelf) {
        state.beforeEditShelfs.push(shelf);
      },
      setEditShelfModeOn(state, e) {
        state.editShelfModeOn = e;
      }
}