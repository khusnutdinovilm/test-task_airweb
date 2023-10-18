const getJson = async (endpoint) => {
  const path = process.env.NODE_ENV === 'development'
    ? `http://localhost:3001/${endpoint}`
    : `https://raw.githubusercontent.com/khusnutdinovilm/VTinEdu/gh-pages/db/${endpoint}.json`;
  const response = await fetch(path);

  return await response.json();
};

const api = {
  get: {
    apartments: () => getJson("apartments"),
  },
};

export default api;
