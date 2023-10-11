output=$(curl -s -o /dev/null -w '%{http_code}' 'http://127.0.0.1:5000/api/makecard')
if [[ $output == "405" ]]; then
   echo "pass"
else
   echo "fail"
fi