// default 'sort_by' popularity.desc
const SORT_BY = {
  MOST_POPULAR: 'popularity.desc',
  LEAST_POPULAR: 'popularity.asc',
  HIGHEST_REVENUE: 'revenue.desc',
  LOWEST_REVENUE: 'revenue.asc',
  HIGHEST_RATED: 'vote_average.desc',
  LOWEST_RATED: 'vote_average.asc',
  RELEASED_NEWEST: 'release_date.desc',
  RELEASED_OLDEST: 'release_date.asc',
};

// min number of votes needed to show up in results - helps filter out home movies
const MIN_VOTES = 21;

const GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  TV_MOVIE: 10770,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37,
};

const moods = {
  LAUGH: {
    shortLabel: 'Laugh',
    moodFor: 'Laughs',
    longLabel: 'Make me laugh!',
    genres: [GENRES.COMEDY],
  },
  MUSIC: {
    shortLabel: 'Tra la la!',
    moodFor: 'Music',
    longLabel: 'Singing and dancing',
    genres: [GENRES.MUSIC],
  },
  CRY: {
    shortLabel: 'Tears',
    moodFor: 'Tears',
    longLabel: 'Make me cry',
    genres: [GENRES.ROMANCE, GENRES.DRAMA],
  },
  ADVENTURE: {
    shortLabel: 'Adventure',
    moodFor: 'Adventure',
    longLabel: 'Take me on an adventure!',
    genres: [GENRES.ADVENTURE],
  },
  THRILL: {
    shortLabel: 'Thrill',
    moodFor: 'Thrills',
    longLabel: 'On the edge of my seat',
    genres: [GENRES.ACTION, GENRES.CRIME, GENRES.THRILLER],
  },
  CUDDLE: {
    shortLabel: 'Cuddle',
    moodFor: 'Cuddles',
    longLabel: 'I fancy a snuggle',
    genres: [GENRES.ROMANCE],
  },
  FANTASY: {
    shortLabel: 'Fantasy',
    moodFor: 'Fantasy',
    longLabel: 'Escape this world',
    genres: [GENRES.FANTASY, GENRES.SCIENCE_FICTION],
  },
  SCARE: {
    shortLabel: 'Scare',
    moodFor: 'Scares',
    longLabel: 'Brown pants time',
    genres: [GENRES.HORROR, GENRES.MYSTERY],
  },
  BLOOD: {
    shortLabel: 'Blood',
    moodFor: 'Blood',
    longLabel: 'I want to see some fighting',
    genres: [GENRES.WESTERN, GENRES.WAR],
  },
  LEARN: {
    shortLabel: 'Learn',
    moodFor: 'Learning',
    longLabel: 'Educate me',
    genres: [GENRES.DOCUMENTARY, GENRES.HISTORY],
  },
  FAMILY: {
    shortLabel: 'Family',
    moodFor: 'Family fun',
    longLabel: 'Kid friendly',
    genres: [GENRES.FAMILY],
  },
  ANIMATION: {
    shortLabel: 'Animation',
    moodFor: 'Animation',
    longLabel: 'Some moving illustrations',
    genres: [GENRES.ANIMATION],
  },
};

module.exports = {
  GENRES,
  moods,
  SORT_BY,
  MIN_VOTES,
};
