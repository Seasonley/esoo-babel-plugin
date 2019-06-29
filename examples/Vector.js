module.exports = class Vector {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    toString(){
        return `Vector(${this.x},${this.y})`;
    }

    __add__(b){
        return new Vector(this.x + b.x, this.y + b.y);
    }


    __sub__(b){
        return new Vector(this.x - b.x, this.y - b.y);
    }

    __mul__(b){
        return new Vector(this.x * b, this.y * b);
    }

    __lt__(b){
        return (this.x <= b.x && this.y <= b.y && (this.x < b.x || this.y < b.y));
    }

    __le__(b){
        return (this.x <= b.x && this.y <= b.y);
    }

    __eq__(b){
        return this.x == b.x && this.y == b.y;
    }
};