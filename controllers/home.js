module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getReady: (req, res) => {
    res.render("ready.ejs");
  },
};
