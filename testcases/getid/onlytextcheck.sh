output="$(curl -s -X POST http://127.0.0.1:5000/api/getid)"

if [[ ! $output =~ [0-9] ]]; then
    echo "fail"
    exit 1
fi

echo "pass"