output=$(curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"id":"2nt3q3ju40t2tepj","title":"Hellow World", "description":"Insert Description Here", "difficulty":"11"}')

if [[ $output == "difficultyvalueerror" ]]; then
   echo "pass"
else
   echo "fail"
fi