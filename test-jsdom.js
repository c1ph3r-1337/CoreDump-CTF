const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('private/dashboard.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
dom.window.fetch = async (url) => {
  if (url === '/api/teams') return { json: async () => require('./teams.json') };
  if (url === '/api/myteam') return { json: async () => ({ team: null }) };
  if (url === '/api/users') return { json: async () => [] };
  if (url === '/api/profile') return { json: async () => ({ username: 'test' }) };
  return { json: async () => ({}) };
};
dom.window.io = () => ({ on: () => {} });

dom.window.console.error = (msg, err) => console.log('ERROR:', msg, err);
dom.window.addEventListener("error", (event) => {
  console.log("DOM Error:", event.error);
});
dom.window.addEventListener("unhandledrejection", (event) => {
  console.log("Unhandled rejection:", event.reason);
});

setTimeout(() => {
  console.log("Done waiting.");
}, 2000);
