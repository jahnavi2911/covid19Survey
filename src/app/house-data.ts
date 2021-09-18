import { InMemoryDbService } from "angular-in-memory-web-api";
import { House } from "./house";

export class HouseData implements InMemoryDbService {

    createDb(): { house: House[] } {
        const house: House[] = [
            {
                id: 1,
                houseNo: 1,
                address: 'address1',
                members: [{
                    memberName: 'jahnavi',
                    gender: 'female',
                    age: 22
                }]

            },
            {
                id: 2,
                houseNo: 2,
                address: 'address2',
                members: [{
                    memberName: 'jahnavi',
                    gender: 'female',
                    age: 22
                },
                {
                    memberName: 'padmini',
                    gender: 'female',
                    age: 49
                },
                {
                    memberName: 'kushal',
                    gender: 'male',
                    age: 70
                }
                ]
            }
        ];
        return { house };
    }

}