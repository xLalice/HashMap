class HashMap {
    constructor(initialSize = 16){
        this.buckets = new Array(initialSize);
        this.size = 0;
        this.initialSize = initialSize;
    }
    
    hash(key) {
        let hashCode = 0;
          
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length ;
        }
        
        return hashCode;
    } 
    
    set(key, value) {
        const index = this.hash(key);
        
        if (index < 0 || index >= this.buckets.length) {
              throw new Error("Trying to access index out of bound");
        }
        
        if (!this.buckets[index]) {
            this.buckets[index] = []
        }
        
        for (let i = 0; i < this.buckets[index].length ; i++){
            if (this.buckets[index][i][0] === key){
                this.buckets[index][i][1] = value;
                return;
            }
        }
        
        this.buckets[index].push([key, value]);
        this.size++;
        
        const loadFactor = this.size / this.buckets.length;
        if (loadFactor > 0.75) {
          this.resize();
        }
    }
    
    get(key) {
        const index = this.hash(key);
        
        if (index < 0 || index >= this.buckets.length) {
              throw new Error("Trying to access index out of bound");
        }
        
        if (!this.buckets[index]) {
            return null;
        }
        
        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === key) {
                return this.buckets[index][i][1];
            }
        }
        
        return null;
    }
    
    has(key) {
        const index = this.hash(key);
        
        if (index < 0 || index >= this.buckets.length) {
              throw new Error("Trying to access index out of bound");
        }
        
        if (!this.buckets[index]) {
            return false;
        }
        
        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === key) {
                return true;
            }
        }
        return false;
    }
    
    remove(key) {
        const index = this.hash(key);
        
        if (index < 0 || index >= this.buckets.length) {
              throw new Error("Trying to access index out of bound");
        }
        
        if (!this.buckets[index]) {
            return false;
        }
        
        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === key) {
                this.buckets[index].splice(i, 1);
                return true;
            }
        }
        
        this.size--;
        return false;
    }
    
    length(){
        return this.size;
    }
    
    clear(){
        this.buckets = new Array(this.initialSize)
        this.size = 0;
        return;
    }
    
    keys() {
        const keys = [];
        
        for (let i = 0; i < this.buckets.length; i++){
            for (let j = 0; j < this.buckets[i].length; j++){
                keys.push(this.buckets[i][j][0]);
            }
        }
        
        return keys;
    }
    
    values() {
        const keys = [];
        
        for (let i = 0; i < this.buckets.length; i++){
            for (let j = 0; j < this.buckets[i].length; j++){
                keys.push(this.buckets[i][j][1]);
            }
        }
        
        return keys;
    }
    
    entries() {
        const keyValuePairs = [];
        
        for (let i = 0; i < this.buckets.length; i++){
            for (let j = 0; j < this.buckets[i].length; j++){
                let key = this.buckets[i][j][0];
                let value = this.buckets[i][j][1];
                keyValuePairs.push([key, value]);
            }
        }
        
        return keyValuePairs;
    }
    
    resize() {
        const newBuckets = new Array(this.buckets.length * 2);
        const oldBuckets = this.buckets;
        this.buckets = newBuckets;
        this.size = 0;
    
        for (const bucket of oldBuckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    this.set(key, value);
                }
            }
        }
    }
    
    visualize() {
        console.log("Hash Table Visualization:");
        for (let i = 0; i < this.buckets.length; i++) {
          if (this.buckets[i]) {
            console.log(`Bucket ${i}: ${JSON.stringify(this.buckets[i])}`);
          } else {
            console.log(`Bucket ${i}: empty`);
          }
        }
    } 
}


const test = new HashMap();

 test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')


console.log(test.get("dog"));
console.log(test.has("lion"));
console.log(test.has("jl"))
console.log(test.remove("hat"));

test.visualize();