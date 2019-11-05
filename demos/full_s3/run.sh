#!/bin/sh

. demo-magic.sh
mirror -on

SRC='/Users/leo/git/cdk-talk-examples/demos/full_s3'

DIR="/tmp/FullS3Demo"

rm -rf "${DIR}"

# hide the evidence
clear

wait

p "mkdir ${DIR}"
p "cd ${DIR}"

wait

p 'cdk init -l typescript'

cp -r /Users/leo/git/cdk-talk-examples/code/FullS3Demo /tmp/
cd /tmp/FullS3Demo
# rebuild as paths changed
npm rebuild > /dev/null 2>&1

p "npm install @aws-cdk/aws-s3 @aws-cdk/aws-lambda @aws-cdk/aws-lambda-event-sources @types/node"

# npm install --cache-min 9999999 @aws-cdk/aws-s3 @aws-cdk/aws-lambda @aws-cdk/aws-lambda-event-sources @types/node

# Copy full file to type
pbcopy < "${SRC}/files/full_s3-stack.ts"

wait

pe "code ."

wait

# Incase fuffed it up
cp ${SRC}/files/full_s3-stack.ts ./lib/full_s3-stack.ts

pe 'npm run build'

pe 'cdk synth'

wait

pe 'mkdir -p functions/s3_event'

# Copy so I Don't make typos
pbcopy < "${SRC}/files/index.ts"

pe 'code functions/s3_event/index.ts'

wait
# Incase fuffed it up
cp ${SRC}/files/index.ts functions/s3_event/

pe "npm run build"

pe "cdk synth"
cdk synth | pygmentize -l yaml | less
wait

pe "cdk diff"

wait

pe "cdk deploy"

cd -
clear

wait