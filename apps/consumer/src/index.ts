import { xReadGroup, xAck } from 'pusher/client'


async function main(){
    while(true){

        const response = await xReadGroup('india','ind-1');

        xAck('india','a')

    }
}

main();