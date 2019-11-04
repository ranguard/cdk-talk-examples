#!/bin/sh

. demo-magic.sh

# hide the evidence
clear

DIR="/tmp/FullS3Demo"
wait

pe "cd ${DIR}"

pe "npm run build"

pe "cdk synth --no-staging > template.yaml"
wait

pe "code template.yaml"
wait

pe "sam local generate-event s3 put --bucket TEST-BUCKET --key AN/OBJECT/Key.txt > payload.json"
wait

p "cat payload.json"
cat payload.json | pygmentize -l json | less
wait

pe "sam local invoke --event payload.json EchoS339537F1B"
wait

pe "code functions/s3_event/index.ts"
wait

pe "npm run build"

pe "sam local invoke --event payload.json EchoS339537F1B"

cd -

wait