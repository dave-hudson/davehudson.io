export class BlogPost {
    constructor(title, dateTime, hRef, preScriptFunction, openingFunction, articleFunction, postScriptFunction) {
        this.title = title;
        this.dateTime = dateTime;
        this.hRef = hRef;
        this.preScriptFunction = preScriptFunction;
        this.openingFunction = openingFunction;
        this.articleFunction = articleFunction;
        this.postScriptFunction = postScriptFunction;
    }
}
