export class Point {
    x: Number;
    y: Number;

    constructor(x: Number, y: Number) {
        this.x = x;
        this.y = y;
    }
}

export class Line {
    points: Array<Point>;

    constructor() {
        this.points = [];
    }

    addPoint(this: Line, point: Point) {
        this.points.push(point);
    }
}