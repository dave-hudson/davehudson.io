export class BlogPost {
    constructor(title, dateTime, hRef, openingFunction, articleFunction) {
        this.title = title;
        this.dateTime = dateTime;
        this.hRef = hRef;
        this.openingFunction = openingFunction;
        this.articleFunction = articleFunction;
    }
}
