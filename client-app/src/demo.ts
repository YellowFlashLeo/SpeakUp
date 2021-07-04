 export interface IDuck {
    name:string;
    numLegs:number;
    makeSound:(sound:string)=>void;
    optionalFun?:(sth:string)=>void;
}


const duck1 : IDuck= {
    name:'huey',
    numLegs:2,
    makeSound:(sound:any)=>console.log(sound)
}

const duck2 : IDuck = {
    name:'dewey',
    numLegs:2,
    makeSound:(sound:any)=>console.log(sound)
}

duck1.makeSound("TypeScript is great since it givs you errors while you typing before compilcation");
duck2.optionalFun!("! sign overrides TypeScript behaviour, saying that it doesnt matter if function is optional or not");

// export will allow us to use these modules in our solution
export const ducks =[duck1,duck2]