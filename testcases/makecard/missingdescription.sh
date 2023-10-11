output=$(curl -s -X POST http://127.0.0.1:5000/api/makecard -H 'Content-Type: application/json' -d '{"id":"2nt3q3ju40t2tepj","title":"Hellow World", "difficulty":"5"}')

if [[ $output == "keyschemavalidationerror" ]]; then
   echo "pass"
else
   echo "fail"
fi