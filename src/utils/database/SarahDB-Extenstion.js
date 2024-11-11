import { DbORM } from "./db";

const dbORM = new DbORM(); 

export async function SDBEIsFound(model, column, value) {
    
    console.log("$$result");
    const result = await dbORM.findOne(model, column, value); 
    console.log("$$result");
    console.log("$$result", result?.status?.[0]);
    if (result?.status?.[0] === "not found") {
        return null;
    } else {
        // return result?.status?.[1];
        return result
    }
}

export async function SDBEIsFoundAll(model, column, value) {
    const result = await dbORM.findAll(model, column, value); 
    if (result?.status?.[0] === "not found") {
        return [];
    } else {
        return result?.status?.[1];
    }
}
