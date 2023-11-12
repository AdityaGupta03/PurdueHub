const faqQueries = require("../database/queries/faqQueries");
// const stringSimilarity = require('string-similarity');
const tf = require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');

let model;
async function loadModel() {
  try {
    model = await use.load();
    console.log("Loaded model");
  } catch (error) {
    console.log(error);
  }
}

async function askQuestionAPI(req, res) {

  let { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Missing question field." });
  }

  console.log("[INFO] Asking: " + question);

  let allQuestions = await faqQueries.getAllFAQsQuery();
  let threshold = 0.7;

  // Calculate the embedding for the new question
  let newQuestionEmbedding = await getQuestionEmbedding(question);

  // Calculate embeddings for all existing questions
  let existingQuestionEmbeddings = await Promise.all(
    allQuestions.map(faq => getQuestionEmbedding(faq.question))
  ); 

  // Calculate cosine similarity between the new question and existing questions
  let similarities = existingQuestionEmbeddings.map(embedding =>
    calculateCosineSimilarity(newQuestionEmbedding, embedding)
  );

  // Find the index of the most similar question
  let highest_rating = Math.max(...similarities);
  let mostSimilarIndex = similarities.indexOf(highest_rating);

  // Find the data of the most similar index
  let mostSimilarFAQ = allQuestions[mostSimilarIndex];
  console.log(mostSimilarFAQ);
  console.log(highest_rating);

  let db_res;
  if (highest_rating > threshold) {
    db_res = await faqQueries.updateCountQuery(mostSimilarFAQ.id, mostSimilarFAQ.count + 1);
  } else {
    db_res = await faqQueries.addQuestionQuery(question);
  }

  if (db_res == false) {
    return res.status(500).json({ error: "Internal Server Error." });
  }

  return res.status(200).json({ message: "Success!" });

}

async function getQuestionEmbedding(question) {
  const embeddings = await model.embed([question]);
  return embeddings.arraySync()[0];
}

function calculateCosineSimilarity(vectorA, vectorB) {
  const dotProduct = vectorA.reduce((acc, value, index) => acc + value * vectorB[index], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((acc, value) => acc + value * value, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((acc, value) => acc + value * value, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

async function getFaqs(req, res) {
  console.log("[INFO] Getting top 5 FAQs.");
  
  let faqs = await faqQueries.getTop5Query();
  if (faqs == null) {
    return res.status(500).json({ error: "Internal Server Error." });
  }

  return res.status(200).json({ faq_arr: faqs });
}

module.exports = {
  getFaqs,
  askQuestionAPI,
  loadModel,
};