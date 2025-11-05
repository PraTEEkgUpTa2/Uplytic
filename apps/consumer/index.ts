import axios from 'axios';
import { xReadGroup, xAckBulk, initConsumerGroup} from 'pusher/client'
import { prismaClient } from 'db/client';


async function main(){

    

    const region = await prismaClient.region.findFirst({
        select:{
            id: true,
            name: true
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    if(!region){
        return;
    }

    
    await initConsumerGroup(region.name);

    while(true){

        const response = await xReadGroup(region.name,'ind-1');

        if(!response){
            continue;
        }

        let res = response.map(({message}) => fetchWebsite(message.url, message.id, region.id) );

        await Promise.all(res);
        console.log(res.length);

        console.log(res);


        xAckBulk('india',response.map(msg => msg.id));

    }
}

async function fetchWebsite(url: string, id: string, regionId: string){

    return new Promise<void>(async (resolve,reject) => {
        const startTime = Date.now();

        const website = await prismaClient.website.findUnique({
      where: { id },
      select: { id: true }
    });

    if (!website) {
      console.warn(`⚠️ Skipping check: Website ID ${id} not found`);
      return;
    }

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