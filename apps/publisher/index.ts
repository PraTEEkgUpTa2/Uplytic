import { prismaClient} from 'db/client'
import dotenv from 'dotenv'
import { xAddBulk} from 'pusher/client'

dotenv.config();

async function main(){
    const websites = await prismaClient.website.findMany({
        select:{
            url: true,
            id: true
        }
    })

    console.log(`Adding ${websites.length} websites to the queue`);

    await xAddBulk(websites.map(website => ({
        url: website.url,
        id: website.id
    })));

}

setInterval( () => {
    main()
}, 3000*60)