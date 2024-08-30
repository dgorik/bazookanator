module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getReady: (req, res) => {
    res.render("ready.ejs");
  },

  getTest: (req, res) => {
    res.render("test.ejs");
  },

  getFirstReport: (req, res) => {
    res.render("first_report.ejs");
  },
};
