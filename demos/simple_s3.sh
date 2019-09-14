#!/bin/bash

. demo-magic.sh

# hide the evidence
clear

pe "cd demos/simple_s3"

pe "code index.ts"
wait

p "cdk synth"
cdk synth | pygmentize -l yaml

echo "
Are you sure you want to delete: StoreStack (y/n)?"
p "y"
echo "StoreStack: destroying...

 ✅  StoreStack: destroyed
"

