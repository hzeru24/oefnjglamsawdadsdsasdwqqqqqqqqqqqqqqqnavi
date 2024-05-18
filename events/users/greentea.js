const { MongoClient } = require('mongodb');
const discordClient = require("../../index");

let currentLettersData = {
  letters: '',
  validLettersSet: [],
};

const words = new Set();

discordClient.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim().toLowerCase();

  if (message.channel.id === "1137605974866284605") {
    if (currentLettersData.letters === '') {
      currentLettersData = getRandomLetters();
      await message.channel.send(`${currentLettersData.letters}`);
    } else if (containsValidLetters(content, currentLettersData.validLettersSet)) {
      const newWord = content;

      if (!validWords.has(newWord)) {
        message.delete();
      } else if (words.has(newWord)) {
        message.react("❌");
      } else {
        message.react("✅");
        words.add(newWord);
        currentLettersData = getRandomLetters();
        await message.channel.send(`${currentLettersData.letters}`);
        updateCurrentLettersInDatabase(currentLettersData.letters);
      }
    } else {
      message.delete();
    }
  }

  const args = message.content.trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (message.channel.id === "1137605974866284605" && command === "r!resetletters") {
    resetCurrentLetters();
    await message.delete();
    await message.channel.send("The current letters have been reset.");
  }
});

const validWords = new Set(discordClient.config.wordlist.map(word => word.toLowerCase()));

async function initDatabase() {
  const uri = discordClient.config.mongooseConnectionString;
  const dbClient = new MongoClient(uri);

  try {
    await dbClient.connect();

    const database = dbClient.db('wordgames');
    const lettersCollection = database.collection('letters');

    const storedData = await lettersCollection.findOne();
    if (storedData) {
      currentLettersData.letters = storedData.currentLetters;
      currentLettersData.validLettersSet = currentLettersFromValidWords();
      storedData.words.forEach(word => words.add(word));
    } else {
      currentLettersData = getRandomLetters();
      await lettersCollection.insertOne({
        currentLetters: currentLettersData.letters,
        words: Array.from(words),
      });
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    dbClient.close();
  }
}

async function updateCurrentLettersInDatabase(newCurrentLetters) {
  const uri = discordClient.config.mongooseConnectionString;
  const updateClient = new MongoClient(uri);

  try {
    await updateClient.connect();

    const database = updateClient.db('wordgames');
    const lettersCollection = database.collection('letters');

    await lettersCollection.updateOne({}, { $set: { currentLetters: newCurrentLetters } });
  } catch (error) {
    console.error('Error updating current letters in database:', error);
  } finally {
    updateClient.close();
  }
}

// Call initDatabase function on bot startup
initDatabase();

function getRandomLetters() {
  const validLettersSet = currentLettersFromValidWords();
  const filteredValidLetters = validLettersSet.filter(letters => /^[a-zA-Z]+$/.test(letters));
  return {
    letters: filteredValidLetters[Math.floor(Math.random() * filteredValidLetters.length)],
    validLettersSet: validLettersSet,
  };
}

function currentLettersFromValidWords() {
  const validLettersSet = new Set();
  validWords.forEach(word => {
    if (/^[a-zA-Z]+$/.test(word)) { // Exclude words with special characters
      for (let i = 0; i < word.length - 2; i++) {
        validLettersSet.add(word.slice(i, i + 3));
      }
    }
  });
  return Array.from(validLettersSet);
}

function containsValidLetters(word, validLettersSet) {
  return validLettersSet.some(letters => word.includes(letters));
}

function resetCurrentLetters() {
  currentLettersData = {
    letters: '',
    validLettersSet: [],
  };
  updateCurrentLettersInDatabase(currentLettersData.letters);
}
