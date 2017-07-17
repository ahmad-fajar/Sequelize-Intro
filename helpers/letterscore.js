let letterScore = (data => {
  // let data = data;
  for (var i = 0; i <= data.length - 1; i++) {
    let score = data[i].score;
    if (score > 85) data[i].letter = 'A';
    else if (score > 70) data[i].letter = 'B';
    else if (score > 55) data[i].letter = 'C';
    else if (score > 0 && score <= 55) data[i].letter = 'E';
    else if (score == null ) data[i].letter = 'Empty'
  }
  return data;
})

module.exports = letterScore;