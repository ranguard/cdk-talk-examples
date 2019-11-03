
export const handler = async (event: any = {}) : Promise <any> => {

    event.Records.forEach( (record: any) => {
        let bucketName = record.s3.bucket.name;
        let objectKey = record.s3.object.key;

        console.log(`Do something with ${objectKey} from ${bucketName}`);
    });
}