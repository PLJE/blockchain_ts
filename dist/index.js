"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crypto = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
//static 클래스 생성하지 않아도 함수호출이 가능
Block.calculateBlockHash = (index, previousHash, timestamp, data) => { return Crypto.SHA256(index + previousHash + timestamp + data).toString(); };
Block.validateStructure = (aBlock) => {
    if (typeof aBlock.index === "number" && typeof aBlock.hash === "string" && typeof aBlock.previousHash === "string" && typeof aBlock.timestamp === "number"
        && typeof aBlock.data === "string")
        return true;
    return false;
};
const genesisBlock = new Block(0, "532453", "", "hello", 123456);
let blockchain = [genesisBlock];
const getBlockChain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidate, previous) => {
    if (!Block.validateStructure(candidate)) {
        return false;
    }
    else if (previous.index + 1 !== candidate.index)
        return false;
    else if (previous.hash !== candidate.previousHash)
        return false;
    else if (getHashforBlock(candidate) !== candidate.hash)
        return false;
    else {
        return true;
    }
};
const addBlock = (candidate) => {
    if (isBlockValid(candidate, getLatestBlock())) {
        blockchain.push(candidate);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map