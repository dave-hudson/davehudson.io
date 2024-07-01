import { VDom } from '../lib/dvdi'

export class BlogPost {
    title: string;
    dateTime: string;
    hRef: string;
    preScriptFunction: (() => VDom[]) | null;
    openingFunction: () => VDom[];
    articleFunction: () => VDom[];
    postScriptFunction: (() => VDom[]) | null;

    constructor(
        title: string,
        dateTime: string,
        hRef: string,
        preScriptFunction: (() => VDom[]) | null,
        openingFunction: () => VDom[],
        articleFunction: () => VDom[],
        postScriptFunction: (() => VDom[]) | null
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
