const GNEWS_API_KEY = '7287f4ac2486040fb472396df5d273f7';
const BASE_URL = 'https://gnews.io/api/v4/search';

/**
 * Fetch latest finance and digital transformation news from GNews API
 * @param {string} query - البحث (افتراضي: finance OR "digital transformation")
 * @param {string} lang - اللغة (افتراضي: en)
 * @param {number} max - عدد النتائج (افتراضي: 10)
 * @returns {Promise<Array>} قائمة الأخبار
 */
export async function fetchFinanceNews(query = 'finance OR "digital transformation"', lang = 'en', max = 10) {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&lang=${lang}&max=${max}&token=${GNEWS_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch news from GNews API');
  }
  const data = await response.json();
  return data.articles || [];
} 