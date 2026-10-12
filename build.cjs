const fs=require('fs');
let html=fs.readFileSync('index.html','utf8');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+fs.readFileSync('style.css','utf8')+'</style>');
html=html.replace('<script src="data.js"></script><script src="app.js"></script>',()=>'<script>'+fs.readFileSync('data.js','utf8')+'</script><script>'+fs.readFileSync('app.js','utf8')+'</script>');
fs.writeFileSync('review.html',html);
console.log('review.html ready');
