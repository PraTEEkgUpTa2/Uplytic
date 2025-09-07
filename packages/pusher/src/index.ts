import { createClient} from 'redis'


const client = createClient().on('error', (err) => console.log('Redis Client Error', err)).connect();

type WebsiteEvent = {
    url: string,
    id: string
}

type Message = {
    id: string, 
    message: {
        url: string,
        id: string
    }
}

async function xAdd({url,id}: WebsiteEvent){

    (await client).xAdd('betteruptime:website', '*', {
        url,
        id
    })
}


export async function xAddBulk(websites: WebsiteEvent[]){
    for(const website of websites){
        await xAdd({
            url: website.url,
            id: website.id
        })
    }
}


export async function xReadGroup(consumerGroup: string, consumerName: string) : Promise<Message[] | undefined>{
    const res = (await client).xReadGroup(consumerGroup, consumerName, {
        key: 'betteruptime:website',
        id: '>'
    }, {
        COUNT: 10
    });

    // @ts-ignore
    let messages: Message[] | undefined = res?.[0].messages;

    return messages;
}


async function xAck(consumerGroup: string, id: string){
    const res = (await client).xAck('betteruptime:website', consumerGroup, id);

    return res;
}

export async function xAckBulk(consumerGroup: string, ids: string[]){

    for(const id of ids){
        await xAck(consumerGroup,id)
    }
}
