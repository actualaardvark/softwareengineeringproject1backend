output=$(curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{"title":"Hellow World", "description":"Insert Description Here", "difficulty":"5"}')
if [[ $output == "keyschemavalidationerror" ]]; then
   echo "pass"
else
   echo "fail"
fi