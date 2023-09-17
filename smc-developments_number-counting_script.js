const optionsYears = {
  enableScrollSpy: true,
  duration: 3,
  suffix: "+"
};

const numAnimYears = new countUp.CountUp("count-years", 6, optionsYears);

const optionsHours = {
  enableScrollSpy: true,
  duration: 3,
  suffix: "+"
};

const numAnimHours = new countUp.CountUp("count-hours", 1000, optionsHours);

const optionsDevotion = {
  enableScrollSpy: true,
  duration: 3,
  suffix: "%"
};

const numAnimDevotion = new countUp.CountUp("count-devotion", 100, optionsDevotion);
