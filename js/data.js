export class DeviceData {
  constructor(max, numCount, keys) {
    this.max = max;
    this.numCount = numCount;
    this.keys = keys;
  }

  get data() {
    return this.generate(this.max, this.numCount, this.keys);
  }
  randombetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generate(max, numCount, keys) {
    var r = [];
    const newData = [];
    var currsum = 0;
    for (var i = 0; i < numCount - 1; i++) {
      r[i] = this.randombetween(1, max - (numCount - i - 1) - currsum);
      currsum += r[i];
    }
    r[numCount - 1] = max - currsum;

    for (let i = 0; i < keys.length; i++) {
      let newObj = {};
      newObj["name"] = keys[i];
      newObj["value"] = r[i];
      newData.push(newObj);
    }
    return newData;
  }
}

export const generatePopData = (max, year) => {
  const data = [];
  let maxSum = 0;
  const currDate = new Date().getFullYear() - 18;
  for (let i = 0; i < currDate - +year; i++) {
    let obj = {};
    obj.year = currDate - i;
    obj.value = Math.ceil(Math.random() * max + 40);
    data.push(obj);
  }
  data.forEach((x) => {
    maxSum += x.value;
  });
  data.forEach((x) => {
    x.maxSum = maxSum;
  });

  return data;
};

// return demographic data

export class DemographicData {
  constructor(name, values) {
    this.name = name;
    this.values = values;
  }

  get data() {
    return this.generate(this.values);
  }

  generate(val) {
    let obj = {};
    let range;
    let percentage;
    let startIdx, endIdx;

    startIdx = Math.floor(Math.random() * val.length);
    endIdx = val.length - Math.floor(Math.random() * (val.length - startIdx));
    range = startIdx === endIdx ? val : val.slice(startIdx, endIdx);
    //range = range.length === 1 ? val : range;

    percentage = Math.round((range.length / val.length) * 100);
    obj.name = this.name;
    obj.value = percentage;
    if (range.length === 1) {
      obj.range = `${range[0]}`;
    } else if (range.length === val.length) {
      obj.range = "ALL";
    } else {
      obj.range = `${range[0]} - ${range[range.length - 1]}`;
    }

    console.log(obj);
    return obj;
  }
}

// return random number of websites from provided list
export class RandWebsites {
  constructor(wesbites) {
    this.wesbites = wesbites;
  }

  get data() {
    let sliceIdx = Math.round(Math.random() * (this.wesbites.length - 20) + 20);
    return this.wesbites.slice(0, sliceIdx);
  }
}

export const demographicNames = [
  {
    name: "genders",
    value: ["male", "female"],
  },
  {
    name: "age",
    value: ["0", "18", "25", "35", "45", "64", "64+"],
  },
  {
    name: "income",
    value: ["0", "50k", "100k", "150k", "150k+"],
  },
  {
    name: "family",
    value: ["Has Kids", "No Kids"],
  },
  {
    name: "education",
    value: ["none", "undergrad", "graduate"],
  },
];

export const websiteList = [
  { name: "edmunds.com" },
  { name: "bloomberg.com" },
  { name: "motortrend.com" },
  { name: "fandango.com" },
  { name: "merakilane.com" },
  { name: "chinesenewyear.net" },
  { name: "quizlet.com" },
  { name: "money.cnn.com" },
  { name: "kpopmap.com" },
  { name: "geek.com" },
  { name: "cars.com" },
  { name: "cnbc.com" },
  { name: "powerball.com" },
  { name: "gizmodo.com" },
  { name: "active.com" },
  { name: "12tomatoes.com" },
  { name: "greatschools.org" },
  { name: "mapquest.com" },
  { name: "nextshark.com" },
  { name: "us.yahoo.com" },
  { name: "usedcars.com" },
  { name: "autooverload.com" },
  { name: "lotterypost.com" },
  { name: "cosmopolitan.com" },
  { name: "aalbc.com" },
  { name: "wholesomeyum.com" },
  { name: "enotes.com" },
  { name: "bleacherreport.com" },
  { name: "weather.com" },
  { name: "ask.com" },
  { name: "bankrate.com" },
  { name: "autos.yahoo.com" },
  { name: "freelotto.com" },
  { name: "vanityfair.com" },
  { name: "advocate.com" },
  { name: "dinnerthendessert.com" },
  { name: "beta.finance.yahoo.com" },
  { name: "nba.com" },
  { name: "accuweather.com" },
  { name: "ehow.com" },
];

export const colors = [
  {
    primary: "#193a70",
    secondary: "#0075bb",
    tertiary: "#008d41",
    quaternary: "#fba128",
  },
  {
    primary: "#e89a41",
    secondary: "#cb673d",
    tertiary: "#99273a",
    quaternary: "#54354a",
  },
  {
    primary: "#fd7f6f",
    secondary: "#7eb0d5",
    tertiary: "#b2e061",
    quaternary: "#bd7ebe",
  },
  {
    primary: "#b04238",
    secondary: "#df8879",
    tertiary: "#a4a2a8",
    quaternary: "#b3bfd1",
  },
  {
    primary: "#e27c7c",
    secondary: "#6d4b4b",
    tertiary: "#333333",
    quaternary: "#466964",
  },
  {
    primary: "#e27d60",
    secondary: "#84cdca",
    tertiary: "#e8a87c",
    quaternary: "#c38d9e",
  },
  {
    primary: "#c6493a",
    secondary: "#a23327",
    tertiary: "#679775",
    quaternary: "#917164",
  },
  {
    primary: "#61892f",
    secondary: "#86c232",
    tertiary: "#222629",
    quaternary: "#474b4f",
  },
  {
    primary: "#4285f4",
    secondary: "#5c2018",
    tertiary: "#bc4639",
    quaternary: "#d4a59a",
  },
];

// generate data for treemap

export const createTreeMapData = (categories, nodes, minVal, maxVal) => {
  const dataObj = {
    children: [],
  };

  for (let i = 0; i < nodes.length; i++) {
    const randIdx = Math.floor(Math.random() * categories.length); // this will create a random index
    const value = Math.round(Math.random() * (maxVal - minVal) + minVal);

    dataObj.children.push({
      group: categories[randIdx],
      value: value,
      name: nodes[i],
    });
  }

  return dataObj;
};
