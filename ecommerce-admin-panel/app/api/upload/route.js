import { NextResponse } from 'next/server';
import { PutObjectAclCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import mime from 'mime-types'



const buckName = "yeshwanth-ecommerce"


export async function POST(req) {
    let data = await req.formData(); // Get the form data
    let arr = data.getAll('images');

    // Upload the files to S3


    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET,
        },
    });
    const links = [];

    for (const file of arr) {
        const ext = file.name.split('.').pop();
        const key = `${Date.now()}.${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        let type = mime.lookup(file.name)

        console.log(`Uploading file with key: ${key}`);
        console.log(file)


        await client.send(new PutObjectCommand({
            Bucket: buckName,
            Key: key,
            Body: buffer,
            ACL: "public-read",
            ContentType: type
        }))

        console.log("Uploaded successfully to S3");
        const link = `https://${buckName}.s3.amazonaws.com/${key}`
        console.log(link)
        links.push(link);
    }
    return NextResponse.json({ "link": links });

}

