for i in {1..5}; do
   output=$(curl -s -X POST http://127.0.0.1:5000/api/getid)
   curl -s -X POST http://127.0.0.1:5000/api/makecard -H 'Content-Type: application/json' -d '{"id":"'"$output"'","title":"Hellow World", "description":"Insert Description Here", "difficulty":"'"$(shuf -i1-10 -n1)"'"}' > /dev/null
done