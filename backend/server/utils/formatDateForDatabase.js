const formatDateForDatabase = dateISOString => {
  const tSeparator = 'T';

  return dateISOString.split(tSeparator)[0];
}

module.exports = {
  formatDateForDatabase
}
