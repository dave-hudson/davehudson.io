#!/bin/sh

curl -X POST https://api.indexnow.org/IndexNow \
  -i \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "davehudson.io",
    "key": "ed47ed196d2645a3ace5016b63fa0f76",
    "keyLocation": "https://davehudson.io/ed47ed196d2645a3ace5016b63fa0f76.txt",
    "urlList": [
      "https://davehudson.io",
      "https://davehudson.io/blog",
    ]
  }'

