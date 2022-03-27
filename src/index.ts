import * as Crypto from "crypto-js";
class Block{
    public index : number;
    public hash : string;
    public previousHash : string;
    public data :string;
    public timestamp : number;
    
    //static 클래스 생성하지 않아도 함수호출이 가능
    static calculateBlockHash = (index:number , previousHash:string, timestamp:number , data:string ) : string => {return Crypto.SHA256(index+previousHash+timestamp + data).toString();}
    
    static validateStructure = (aBlock : Block) :boolean => {
        if(typeof aBlock.index === "number" && typeof aBlock.hash === "string" && typeof aBlock.previousHash ==="string" && typeof aBlock.timestamp ==="number"
        && typeof aBlock.data === "string") return true;
        return false;
    }

    constructor(index:number, hash :string, previousHash:string, data:string, timestamp :number ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }

}

const genesisBlock : Block = new Block(0,"532453","","hello",123456);

let blockchain : Block[] = [genesisBlock];

const getBlockChain = () : Block[] => blockchain;
const getLatestBlock = () : Block => blockchain[blockchain.length-1];
const getNewTimeStamp = () : number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data:string) : Block => {
    const previousBlock : Block = getLatestBlock();
    const newIndex : number = previousBlock.index +1;
    const newTimestamp : number = getNewTimeStamp();
    const newHash : string = Block.calculateBlockHash(newIndex , previousBlock.hash , newTimestamp , data);
    const newBlock : Block = new Block(newIndex , newHash, previousBlock.hash , data , newTimestamp);
    addBlock(newBlock);
    return newBlock;
}
const getHashforBlock = (aBlock :Block) :string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidate : Block , previous : Block) : boolean => {
    if(!Block.validateStructure(candidate)){
        return false;
    }else if(previous.index + 1 !== candidate.index) return false;
    else if(previous.hash !== candidate.previousHash) return false;
    else if(getHashforBlock(candidate) !== candidate.hash) return false;
    else {
        return true;
    }
}

const addBlock =  (candidate : Block ) : void => {
    if(isBlockValid(candidate , getLatestBlock())){
        blockchain.push(candidate);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export{};