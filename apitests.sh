#!/bin/bash

function pausetests {
    echo "Waiting..."
    sleep 1
}

echo '***Test makecard API***'

echo "Testing with Valid Card"
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj","title":"Hellow World", "description":"Insert Description Here", "difficulty":"5"}' \
    > /dev/null

pausetests

echo "Testing with Additional Key"
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj","title":"Hellow World", "description":"Insert Description Here", "difficulty":"5", "extra":"95"}' \
   > /dev/null

pausetests

echo "Testing with Missing Title Key"
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj", "description":"Insert Description Here", "difficulty":"5", "extra":"95"}' \
   > /dev/null