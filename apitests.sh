#!/bin/bash
# Runs api testcases and checks if they pass or fail
for folder in $(ls ./testcases) 
do 
   echo -e "\n--- Testing $folder API ---\n"
   for script in $(ls ./testcases/$folder)
   do
      if [[ $(sh ./testcases/$folder/$script) =~ "pass" ]]; then
         echo "[PASS] $folder/$script"
      else
         echo "[FAIL] $folder/$script"
      fi
   done
done