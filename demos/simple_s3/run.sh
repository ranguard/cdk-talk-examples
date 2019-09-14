#!/bin/bash

. demo-magic.sh

# hide the evidence
clear

pe "cd code/simple_s3"

pe "ls"
wait

pe "code ."
wait

p "npm install";
# TODO: copy in node_modules and package-json

p "cdk synth"
cdk synth | pygmentize -l yaml

echo "
Are you sure you want to delete: StoreStack (y/n)?"
p "y"
echo "StoreStack: destroying...

 ✅  StoreStack: destroyed
"

