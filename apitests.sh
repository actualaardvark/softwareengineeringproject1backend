#!/bin/bash

function pausetests {
    echo "Waiting..."
    sleep 1
}

function sendtestrequest {
   if [ "$2" == "$(sh ./testcases/$1.sh)" ]; then
      echo "[PASS] $1"
   else
      echo "[FAIL] $1"
   fi
}

echo '***Test makecard API***'

sendtestrequest "makecard/valid" "success"

pausetests

sendtestrequest "makecard/additionalkey" "keyschemavalidationerror"

pausetests

sendtestrequest "makecard/missingtitle" "keyschemavalidationerror"

pausetests

echo "Testing with Missing Description Key"

sendtestrequest "makecard/missingdescription" "keyschemavalidationerror"

pausetests

echo "Testing with Missing ID Key"
# Error
curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"title":"Hellow World", "description":"Insert Description Here", "difficulty":"5"}'; echo

pausetests

echo "Testing with Missing Difficulty Key"

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

# Error
# Source https://superuser.com/questions/272265/getting-curl-to-output-http-status-code
outputcode="$(curl -s -o /dev/null -w '%{http_code}' 'http://127.0.0.1:5000/api/makecard')"
echo $outputcode
if [ $outputcode == "405" ]; then
   echo "[PASS] Testing with GET Request"
else
   echo "[FAIL] Testing with GET Request"
fi