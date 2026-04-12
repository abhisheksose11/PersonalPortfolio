/**
 * rag-engine.js — Client-side RAG pipeline
 * BM25 search + smart response templating
 * Zero API costs, runs entirely in the browser
 */

const RAGEngine = (function () {
  'use strict';

  // ===== Text Processing =====
  const STOP_WORDS = new Set([
    'a','an','the','is','are','was','were','be','been','being','have','has','had',
    'do','does','did','will','would','shall','should','may','might','must','can','could',
    'i','me','my','we','our','you','your','he','him','his','she','her','it','its',
    'they','them','their','this','that','these','those','am','or','and','but','if',
    'then','so','no','not','of','at','by','for','with','about','to','from','in','on',
    'up','out','off','over','into','as','than','too','very','just','also','what',
    'which','who','whom','how','when','where','why','all','each','every','both',
    'few','more','most','other','some','such','only','own','same','tell','know',
    'does','abhishek','sose','dr','mr','his','he','him','please','could','would',
    'like','want','need','get','got','make','much','many','well','really'
  ]);

  function tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1 && !STOP_WORDS.has(w));
  }

  function stem(word) {
    // Simple suffix stripping
    return word
      .replace(/ies$/, 'y')
      .replace(/ves$/, 'f')
      .replace(/s$/, '')
      .replace(/ing$/, '')
      .replace(/tion$/, 't')
      .replace(/ment$/, '')
      .replace(/ness$/, '')
      .replace(/ally$/, '')
      .replace(/ment$/, '')
      .replace(/ed$/, '');
  }

  function processTokens(text) {
    return tokenize(text).map(stem);
  }

  // ===== BM25 Search =====
  const BM25_K1 = 1.5;
  const BM25_B = 0.75;

  let corpus = [];      // processed chunks
  let avgDocLen = 0;
  let docFreqs = {};     // term -> number of docs containing it

  function buildIndex() {
    corpus = KNOWLEDGE_BASE.map(chunk => {
      const allText = [
        chunk.content,
        chunk.keywords.join(' '),
        chunk.category
      ].join(' ');
      const tokens = processTokens(allText);
      return { ...chunk, tokens, tokenSet: new Set(tokens) };
    });

    // Average document length
    const totalLen = corpus.reduce((s, d) => s + d.tokens.length, 0);
    avgDocLen = totalLen / corpus.length;

    // Document frequencies
    docFreqs = {};
    corpus.forEach(doc => {
      doc.tokenSet.forEach(term => {
        docFreqs[term] = (docFreqs[term] || 0) + 1;
      });
    });
  }

  function bm25Score(queryTokens, doc) {
    const N = corpus.length;
    const dl = doc.tokens.length;
    let score = 0;

    // Count term frequencies in document
    const tf = {};
    doc.tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });

    queryTokens.forEach(qt => {
      const df = docFreqs[qt] || 0;
      if (df === 0) return;
      const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);
      const termFreq = tf[qt] || 0;
      const tfNorm = (termFreq * (BM25_K1 + 1)) /
        (termFreq + BM25_K1 * (1 - BM25_B + BM25_B * dl / avgDocLen));
      score += idf * tfNorm;
    });

    // Keyword match bonus
    const keywordTokens = doc.keywords.map(stem);
    queryTokens.forEach(qt => {
      if (keywordTokens.includes(qt)) score += 2.0;
    });

    // Priority bonus
    score += (doc.metadata.priority || 0) * 0.1;

    return score;
  }

  function search(query, topK = 5) {
    const queryTokens = processTokens(query);
    if (queryTokens.length === 0) return [];

    const scored = corpus.map(doc => ({
      doc,
      score: bm25Score(queryTokens, doc)
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored
      .filter(s => s.score > 0.5)
      .slice(0, topK);
  }

  // ===== Response Generation =====
  const GREETINGS = /^(hi|hello|hey|howdy|greetings|good\s*(morning|afternoon|evening))/i;
  const THANKS = /^(thanks|thank\s*you|thx|ty|cheers)/i;

  function detectIntent(query) {
    const q = query.toLowerCase().trim();
    if (GREETINGS.test(q)) return 'greeting';
    if (THANKS.test(q)) return 'thanks';
    if (/how many.*(paper|publication|article)/i.test(q)) return 'pub_count';
    if (/list.*(all|every).*(paper|publication)/i.test(q)) return 'pub_list';
    if (/(contact|email|reach|phone)/i.test(q)) return 'contact';
    if (/(where|live|location|based|city)/i.test(q)) return 'location';
    if (/(education|degree|phd|school|universit)/i.test(q)) return 'education';
    if (/(award|honor|prize|recognition)/i.test(q)) return 'awards';
    if (/(skill|software|tool|program|language)/i.test(q)) return 'skills';
    if (/(faculty|professor|hire|job|future|plan|group)/i.test(q)) return 'career';
    return 'general';
  }

  function generateResponse(query) {
    const intent = detectIntent(query);

    // Handle special intents
    if (intent === 'greeting') {
      return "Hi there! 👋 I'm an AI assistant with knowledge of Abhishek's research, publications, and background. What would you like to know about him?";
    }
    if (intent === 'thanks') {
      return "You're welcome! Feel free to ask anything else about Abhishek's research or background. For direct communication, you can reach him at **atsose@umd.edu**.";
    }

    // Search knowledge base
    const results = search(query);

    if (results.length === 0) {
      return "I don't have specific information about that in my knowledge base. For detailed questions, I'd recommend reaching out to Abhishek directly at **atsose@umd.edu** or checking his [Google Scholar](https://scholar.google.ca/citations?user=PnaArzMAAAAJ&hl=en) profile.";
    }

    // Build response from top results
    const topResult = results[0];
    const supporting = results.slice(1, 4);

    let response = topResult.doc.content;

    // Add supporting context if relevant and from different categories
    const usedCategories = new Set([topResult.doc.category]);
    supporting.forEach(r => {
      if (r.score > 1.5 && !usedCategories.has(r.doc.category)) {
        response += '\n\n' + r.doc.content;
        usedCategories.add(r.doc.category);
      } else if (r.score > 2.5) {
        response += '\n\n' + r.doc.content;
      }
    });

    // Special formatting for publication lists
    if (intent === 'pub_list') {
      const pubs = corpus
        .filter(d => d.category === 'publications')
        .sort((a, b) => (b.metadata.year || 0) - (a.metadata.year || 0));
      response = "Here are Abhishek's publications:\n\n";
      pubs.forEach((p, i) => {
        response += `**${i + 1}.** ${p.content}\n\n`;
      });
    }

    if (intent === 'pub_count') {
      response = "Abhishek has published **17 peer-reviewed articles** (including 2 under review/submitted in 2026), with **8 as first author** and **4 co-first author** publications. His current total citations are **311**.\n\n" + response;
    }

    return response;
  }

  // ===== Public API =====
  function init() {
    buildIndex();
  }

  return {
    init,
    search,
    generateResponse,
  };
})();
