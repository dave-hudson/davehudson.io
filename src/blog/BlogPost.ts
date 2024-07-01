import { VDom } from '../lib/dvdi'

export class BlogPost {
    title: string;
    dateTime: string;
    hRef: string;
    preScriptFunction: () => VDom;
    openingFunction: () => VDom;
    articleFunction: () => VDom;
    postScriptFunction: () => VDom;

    constructor(
        title: string,
        dateTime: string,
        hRef: string,
        preScriptFunction: () => VDom,
        openingFunction: () => VDom,
        articleFunction: () => VDom,
        postScriptFunction: () => VDom
    ) {
        this.title = title;
        this.dateTime = dateTime;
        this.hRef = hRef;
        this.preScriptFunction = preScriptFunction;
        this.openingFunction = openingFunction;
        this.articleFunction = articleFunction;
        this.postScriptFunction = postScriptFunction;
    }
}
