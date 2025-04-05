const axios = require('axios');

const getToken = async () => {
  const url = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', process.env.CLIENT_ID);
  params.append('client_secret', process.env.CLIENT_SECRET);
  params.append('scope', 'https://analysis.windows.net/powerbi/api/.default');

  const { data } = await axios.post(url, params);
  return data.access_token;
};

const listReports = async () => {
  const token = await getToken();
  const { data } = await axios.get('https://api.powerbi.com/v1.0/myorg/reports', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Optional: Export as controller-style function if calling from Express route
const getEmbeddedReport = async (req, res) => {
  try {
    const reports = await listReports();
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch reports');
  }
};

module.exports = {
  getToken,
  listReports,
  getEmbeddedReport,
};
