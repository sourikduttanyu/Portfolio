const fs = require('fs');

const files = [
  'src/App.jsx',
  'src/components/StatusBar.jsx',
  'src/components/Hero.jsx',
  'src/components/Blueprints.jsx',
  'src/components/ServiceLogs.jsx',
  'src/components/System.jsx',
  'src/components/CommandCenter.jsx'
];

const replacements = {
  'bg-brand-black': 'bg-graphite-100',
  'text-brand-black': 'text-graphite-100',
  'border-prussian-blue': 'border-yale-blue',
  'bg-prussian-blue': 'bg-yale-blue',
  'text-prussian-blue': 'text-yale-blue-light',
  'bg-brand-orange': 'bg-stormy-teal-light',
  'text-brand-orange': 'text-stormy-teal-light',
  'border-brand-orange': 'border-stormy-teal-light',
  'from-brand-orange': 'from-stormy-teal-light',
  'rgba\\(252,163,17': 'rgba(83,154,158',
  'bg-\\[#03050a\\]': 'bg-graphite-200'
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, value);
  }
  fs.writeFileSync(file, content);
});
console.log('done');
