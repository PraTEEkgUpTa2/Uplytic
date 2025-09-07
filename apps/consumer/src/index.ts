import axios from 'axios';
import { xReadGroup, xAckBulk } from 'pusher/client'
import { prismaClient } from 'db/client';


async function main(){
    while(true){

        const response = await xReadGroup('india','ind-1');

        if(!response){
            continue;
        }

        let res = response.map(({message}) => fetchWebsite(message.url, message.id) );

        await Promise.all(res);


        console.log(response);


        xAckBulk('india',response.map(msg => msg.id));

    }
}

async function fetchWebsite(url: string, id: string){

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
                    region_id: '1'

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
                    region_id: '1'
                }
            })
            resolve();
        })
    })
}

main();