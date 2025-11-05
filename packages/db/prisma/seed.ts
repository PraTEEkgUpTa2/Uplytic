import { PrismaClient} from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function main(){

    // Seed Regions

    const regions = [{
        name: 'india'
    },
    {
        name: 'usa'
    }
];

    for(const region of regions){
        await prisma.region.upsert({
            where:{
                name: region.name
            },
            update: {},
            create: region,
        })
    }
}


main().then(
    () => {
        console.log('Seeding completed');
    }
).catch((e) => {
    console.error('Seeding failed', e);
    throw e;
});
