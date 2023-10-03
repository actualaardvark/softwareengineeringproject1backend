#!/bin/bash

function pausetests {
    echo "Waiting..."
    sleep 1
}

echo '***Test makecard API***'

echo "Testing with Valid Card"
# No Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj","title":"Hellow World", "description":"Insert Description Here", "difficulty":"5"}'; echo

pausetests

echo "Testing with Additional Key"
# Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj","title":"Hellow World", "description":"Insert Description Here", "difficulty":"5", "extra":"95"}'; echo


pausetests

echo "Testing with Missing Title Key"
# Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj", "description":"Insert Description Here", "difficulty":"5"}'; echo


pausetests

echo "Testing with Missing Description Key"
# Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj","title":"Hellow World", "difficulty":"5"}'; echo

pausetests

echo "Testing with Missing ID Key"
# Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"title":"Hellow World", "description":"Insert Description Here", "difficulty":"5"}'; echo

pausetests

echo "Testing with Missing Difficulty Key"
# Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj","title":"Hellow World", "description":"Insert Description Here"}'; echo

pausetests

echo "Testing with Invalid Difficulty"
# Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj","title":"Hellow World", "description":"Insert Description Here", "difficulty":"11"}'; echo

pausetests

echo "Testing with Invalid ID"
# Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"23nt","title":"Hellow World", "description":"Insert Description Here", "difficulty":"5"}'; echo

pausetests

echo "Testing with Blank JSON Request"
# Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{}'; echo

pausetests

echo "Testing with GET Request"
# Error
# Source https://superuser.com/questions/272265/getting-curl-to-output-http-status-code
curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:5000/api/makecard"; echo