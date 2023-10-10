#!/bin/bash

function pausetests {
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
sendtestrequest "makecard/additionalkey" "pass"
pausetests
sendtestrequest "makecard/missingtitle" "keyschemavalidationerror"
pausetests
sendtestrequest "makecard/missingdescription" "keyschemavalidationerror"
pausetests
sendtestrequest "makecard/missingid" "keyschemavalidationerror"
pausetests
sendtestrequest "makecard/missingdifficulty" "keyschemavalidationerror"
pausetests
sendtestrequest "makecard/invaliddifficulty" "difficultyvalueerror"
pausetests
sendtestrequest "makecard/invalidid" "idlengtherror"
pausetests
sendtestrequest "makecard/blankjson" "keyschemavalidationerror"
pausetests
sendtestrequest "makecard/getrequest" "405"

echo '***Test getid API***'
sendtestrequest "getid/correctlengthcheck" "pass"
pausetests
sendtestrequest "getid/onlynumberscheck" "pass"
pausetests
sendtestrequest "getid/onlytextcheck" "pass"