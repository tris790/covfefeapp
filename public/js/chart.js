const findMostCommon = (arr, number, wordLength) => {
  // Word, Count
  const wordCounts = new Map();
  arr.forEach(word => {
    const wordLower = word.toLowerCase();
    // Ajout seulement si > wordlength et n'est pas dans la blacklist
    if (word.length >= wordLength && !blacklist.includes(wordLower)) {
      const currentWordCount = wordCounts.get(wordLower) || 0;
      wordCounts.set(wordLower, currentWordCount + 1);
    }
  });

  const sorted = [...wordCounts.entries()].sort((x, y) => y[1] - x[1]);
  if (number > wordCounts || number < 0) return sorted;

  return sorted.slice(0, number);
};

const tweetsToOneString = tweets => {
  return tweets
    .map(t => {
      return t.full_text;
    })
    .join(" ")
    .split(/\W+/);
};

const initChart = chart => {
  let tweetData = {
    datasets: [
      {
        backgroundColor: getColors(),
        data: chart.data
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: chart.labels
  };
  var ctx = document.getElementById(chart.id).getContext("2d");
  var myPieChart = new Chart(ctx, {
    type: "pie",
    data: tweetData,
    options: {
      title: {
        display: true,
        text: `Top ${chart.data.length} words used by Trump`
      }
    }
  });
  document.getElementById(chart.id).onclick = function(evt) {
    var activePoints = myPieChart.getElementsAtEvent(evt);
    if (activePoints[0]) {
      const keyword = activePoints[0]._model.label;
      console.log(keyword);
      loadTweetsFromSearch(keyword);
    }
    // use _datasetIndex and _index from each element of the activePoints array
  };
};

const getColors = () => {
  return [
    "#56e2cf",
    "#56aee2",
    "#5668e2",
    "#8a56e2",
    "#8a56e2",
    "#e256ae",
    "#e25668",
    "#e28956",
    "#e2cf56",
    "#aee256",
    "#68e256",
    "#56e289"
  ];
};

const blacklist = [
  "http",
  "https",
  "will",
  "with",
  "that",
  "have",
  "more",
  "just",
  "this"
];
