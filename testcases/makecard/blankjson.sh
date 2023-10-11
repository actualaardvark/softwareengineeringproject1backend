output=$(curl -s \
   -X POST http://127.0.0.1:5000/api/makecard \
   -H 'Content-Type: application/json' \
   -d '{}')
if [[ $output == "keyschemavalidationerror" ]]; then
   echo "pass"
else
   echo "fail"
fi