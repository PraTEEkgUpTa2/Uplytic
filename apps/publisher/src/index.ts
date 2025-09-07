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

    await xAddBulk(websites.map(website => ({
        url: website.url,
        id: website.id
    })));

}

setInterval( () => {
    main()
}, 3000*60)