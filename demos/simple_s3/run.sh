#!/bin/sh

. demo-magic.sh

cd code/simple_s3

# hide the evidence
clear
wait

p "cd simple_s3"

pe "ls"
wait

pe "code ."
wait

p "npm install";

# TODO: copy in node_modules and package-json
cp -r ../../demos/simple_s3/node_modules ./
cp ../../demos/simple_s3/package-lock.json ./

cat ../../demos/simple_s3/npm_install.txt
wait

pe "npm run build"

pe "ls"
wait

p "cdk synth"
cdk synth | pygmentize -l yaml | less
wait

p "cdk diff"

sleep .5

cat ../../demos/simple_s3/diff.txt

wait

p "cdk deploy"

# FIXME make 1 not 0.1
awk '{print $0; system("sleep 0.1");}' ../../demos/simple_s3/deploy.txt

wait

p "cdk destroy"

echo "
Are you sure you want to delete: StoreStack (y/n)?"

wait

p "y"

awk '{print $0; system("sleep 1");}' ../../demos/simple_s3/destroy.txt

cd ../..

wait
clear
