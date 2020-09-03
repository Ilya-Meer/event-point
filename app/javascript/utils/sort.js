const SORTING_FILTERS = {
  date: 'date',
  votes: 'votes',
};

const sortByDate = (events) => {
  return events.sort(
    (prev, next) => new Date(next.created_at) - new Date(prev.created_at)
  );
};

const sortByVotes = (events) => {
  return events.sort((prev, next) => prev.votes.length - next.votes.length);
};

const sortEvents = (filter, events) => {
  if (filter === SORTING_FILTERS.date) {
    return sortByDate(events);
  }

  if (filter === SORTING_FILTERS.votes) {
    return sortByVotes(events);
  }
};

export { SORTING_FILTERS, sortEvents };
