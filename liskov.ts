// Лисков нарушается

interface IRectangle {
    areaOf: (w: number, h: number) => number;
}

class Rectangle implements IRectangle {
    areaOf(w, h): number {
        return w * h;
    }
}

class Square extends Rectangle {
    areaOf(w): number {
        return w * w; // Не поддерживается логика из класса-родителя
    }
}

const r = new Rectangle();  // Нельзя заменить Rectangle на Square
const s = new Square();

r.areaOf(10, 20);
s.areaOf(20);



// Лисков будет работать

interface IRectangle {
    areaOf: (w: number, h: number) => number;
}

class Rectangle implements IRectangle {
    areaOf(w, h): number {
        return w * h;
    }
}

class Square extends Rectangle {
    areaOf(w, h?): number {
        return h ? w * h : w * w; // Поддерживаться логика из класса - родителя
    }
}

const r = new Rectangle(); // Можно заменить Rectangle на Square
const s = new Square();

r.areaOf(10, 20);
s.areaOf(20);



// Dependency injection

interface IRectangle {
    areaOf: (w: number, h: number) => number;
}
interface ISquare {
    areaOf: (s: number) => number;
}


interface IAreaService {
    calculateArea: (w: number, h?: number) => number;
}
class AreaService implements IAreaService {
    calculateArea(w, h?) {
        return h ? w * h : w * w;
    }
}

class Rectangle implements IRectangle {
    as: IAreaService;

    constructor(as: IAreaService) {
        this.as = as;
    }

    areaOf(w, h): number {
        return this.as.calculateArea(w, h);
    }
}

class Square implements ISquare {
    as: IAreaService;

    constructor(as: IAreaService) {
        this.as = as;
    }

    areaOf(s): number {
        return this.as.calculateArea(s);
    }
}

const as = new AreaService();
const r = new Rectangle(as);
const s = new Square(as);

r.areaOf(10, 20);
s.areaOf(20);