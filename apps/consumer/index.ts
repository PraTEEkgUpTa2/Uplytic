import axios from 'axios';
import { xReadGroup, xAckBulk } from 'pusher/client'
import { prismaClient } from 'db/client';


async function main(){

    const regionId = await prismaClient.region.findFirst({
        select:{
            id: true
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    if(!regionId){
        return;
    }
    while(true){

        const response = await xReadGroup(regionId.id,'ind-1');

        if(!response){
            continue;
        }

        let res = response.map(({message}) => fetchWebsite(message.url, message.id, regionId.id) );

        await Promise.all(res);
        console.log(res.length);

        console.log(res);


        xAckBulk('india',response.map(msg => msg.id));

    }
}

async function fetchWebsite(url: string, id: string, regionId: string){

    return new Promise<void>((resolve,reject) => {
        const startTime = Date.now();

        axios.get(url)
        .then(async() => {
            const endTime = Date.now();
            await prismaClient.websiteCheck.create({
                data: {
                    response_time_ms: endTime - startTime,
                    status: 'UP',
                    website_id: id,
                    region_id: regionId

                }
            })
            resolve();
        })
        .catch( async () => {
            const endTime = Date.now();
            await prismaClient.websiteCheck.create({
                data: {
                    response_time_ms: endTime - startTime,
                    status: 'DOWN',
                    website_id: id,
                    region_id: regionId
                }
            })
            resolve();
        })
    })
}

main();