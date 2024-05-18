const fetch = require('node-fetch');

const client = require('../../index.js')
const API_KEY = process.env.googleAPI;
const SEARCH_ENGINE_ID = process.env.googleSearchEngineID;
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!image')) {
    const query = message.content.slice('!image'.length).trim();
    if (!query) return;

    try {
      const imageUrl = await searchImage(query);
      if (imageUrl) {
        message.channel.send({ content: imageUrl });
      } else {
        message.channel.send({ content: 'No results found.' });
      }
    } catch (error) {
      console.error(error);
      message.channel.send({ content: 'An error occurred while searching.' });
    }
  }
});

async function searchImage(query) {
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&searchType=image&q=${encodeURIComponent(query)}`;
  
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    return data.items[0].link;
  } else {
    return null;
  }
}