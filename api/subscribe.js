/**
 * /api/subscribe.js — Vercel Serverless Function
 * Receives a POST with { email, source } and creates
 * a new row in the Notion Newsletter Subscribers database.
 *
 * Environment variables required (set in Vercel dashboard):
 *   NOTION_TOKEN   — your Notion Internal Integration secret
 *   NOTION_DB_ID   — d0e863e950664aceb12fccad28d6c8a2
 */

const NOTION_DB_ID = process.env.NOTION_DB_ID || 'd0e863e950664aceb12fccad28d6c8a2';
const NOTION_TOKEN = process.env.NOTION_TOKEN;

export default async function handler(req, res) {
  // CORS — allow your own domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!NOTION_TOKEN) {
    return res.status(500).json({ error: 'Server not configured. Add NOTION_TOKEN to Vercel environment variables.' });
  }

  const { email, source = 'Other' } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required.' });
  }

  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties: {
          Email:  { title:  [{ text: { content: email } }] },
          Source: { select: { name: source } },
          Status: { select: { name: 'Active' } },
        },
      }),
    });

    if (!notionRes.ok) {
      const err = await notionRes.json();
      // If duplicate — Notion doesn't enforce unique, so we treat all inserts as success
      console.error('Notion error:', err);
      return res.status(500).json({ error: 'Could not save to Notion.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
