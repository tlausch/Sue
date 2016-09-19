
export class Entity{
    pk: number;
    url: string;
}

export class Account extends Entity{
    name: string;
}

export class User extends Entity{
    name: string;
}

export class Exchange extends Entity{
    category: string;
    
    what: string;
    
    when: string;
    where: string;
    
    credit: number;

    account: string;
    confirmed: boolean;
    
    who: any
}