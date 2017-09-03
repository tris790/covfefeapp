const findMostCommon = (arr, number, wordLength, removeShort) => {
  // Word, Count
  const wordCounts = new Map();
  arr.forEach(word => {
    if (!removeShort || (removeShort && word.length >= wordLength)) {
      const currentWordCount = wordCounts.get(word.toLowerCase()) || 0;
      wordCounts.set(word.toLowerCase(), currentWordCount + 1);
    }
  });

  const sorted = [...wordCounts.entries()].sort((x, y) => y[1] - x[1]);
  if (number > wordCounts || number < 0) return sorted;

  return sorted.slice(0, number);
};

const tweetsToOneString = tweets => {
  return tweets
    .map(t => {
      return t.text;
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
        text: "Words"
      }
    }
  });
};

const getColors = () => {
  return [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#000000",
    "#800000",
    "#008000",
    "#000080",
    "#808000",
    "#800080",
    "#008080",
    "#808080",
    "#C00000",
    "#00C000",
    "#0000C0",
    "#C0C000",
    "#C000C0",
    "#00C0C0",
    "#C0C0C0",
    "#400000",
    "#004000",
    "#000040",
    "#404000",
    "#400040",
    "#004040",
    "#404040",
    "#200000",
    "#002000",
    "#000020",
    "#202000",
    "#200020",
    "#002020",
    "#202020",
    "#600000",
    "#006000",
    "#000060",
    "#606000",
    "#600060",
    "#006060",
    "#606060",
    "#A00000",
    "#00A000",
    "#0000A0",
    "#A0A000",
    "#A000A0",
    "#00A0A0",
    "#A0A0A0",
    "#E00000",
    "#00E000",
    "#0000E0",
    "#E0E000",
    "#E000E0",
    "#00E0E0",
    "#E0E0E0"
  ];
};
