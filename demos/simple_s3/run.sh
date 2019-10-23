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
cp -r ../../demos/simple_s3/node_modules ./
cp ../../demos/simple_s3/package-lock.json ./

cat ../../demos/simple_s3/npm_install.txt

pe "npm run build"

pe "ls"
wait

p "cdk synth"
cdk synth | pygmentize -l yaml
wait

cdk deploy

wait
# echo "
# Are you sure you want to delete: StoreStack (y/n)?"
# p "y"
# echo "StoreStack: destroying...

#  ✅  StoreStack: destroyed
# "

