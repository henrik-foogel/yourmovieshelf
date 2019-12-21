export const state = {
        checkSignedIn: false,
        searchResult: '',
        searchResponse: '',
        filterCriteria: '',
        loginFailure: false,
        failureMessage: '',
        signedIn: false,
        keepSignedIn: false,
        signInBox: false,
        registerBox: false,
        user: '',
        firstTimeUser: false,
        signedInStorage: '',
        userCollection: [],
        emailDocumentId: '',
        inCollection: false,
        search: '',
        posterView: false,
        customShelfs: [],
        selectedMovie: [],
        chosen: false,
        alertWindowClosed: true,
        movieNightList: [],
        movieNightButton: false,
        stateFlex: 'row',
        currentDate: new Date(),
        savedMovieNightList: [],
        movieNightListFromDB: [],
        soundtrackSearchResult: [],
        formats: ['Blu-ray', 'DVD', 'Blu-ray/DVD', 'VHS', 'Laserdisc', 'VCD'],
        editions: ["Regular", "Collector's", "Special", "Collection", "Steelbook", "Limited", "Limited/Collection", "Limited Collector's", "Director's", "Uncut", "R-Rated", "Deluxe", "Ultimate", "Extended"],
        musicFormats: ["Vinyl", "CD", "Cassette", "8-track", "Tape"],
        selectedSoundtrack: [],
        selectedTrueFalse: false,
        soundtracksId: '',
        soundtrackList: [],
        searchSoundtrackTitle: '',
        searchSoundtrackArtist: '',
        searchFailure: false,
        searchSavedSoundtracks: '',
        soundtrackInCollection: false,
        menuDropdown: false,
        uneditedShelfs: [],
        editedShelfs: [],
        beforeEditShelfs: [],
        editShelfModeOn: false,
        manuallyAdd: false,
        editMovie: false,
        shelfInUse: false,
        shelfEditOnOff: false,
        beforeEditShelf: '',  
        editedShelf: '',
        closeSelectedMoreWindows: false
  };