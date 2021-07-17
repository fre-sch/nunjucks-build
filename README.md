# Nunjucks-build


```json
  "scripts": {
    "build": "nunjucks-build build/ src/",
    "watch": "nodemon -w src/ -e js,mjs,json,html,css -- nunjucks-build build/ src/pages/",
    "serve": "light-server -s ./build -w \"src/pages/**/* # npm run build\""
  },
```
