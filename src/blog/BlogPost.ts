import { VNode } from '../lib/dvdi'

export class BlogPost {
    title: string;
    dateTime: string;
    hRef: string;
    metaData: string;
    preScriptFunction: (() => VNode[]) | null;
    openingFunction: () => VNode[];
    articleFunction: () => VNode[];
    postScriptFunction: (() => VNode[]) | null;

    constructor(
        title: string,
        dateTime: string,
        hRef: string,
        metaData: string,
        preScriptFunction: (() => VNode[]) | null,
        openingFunction: () => VNode[],
        articleFunction: () => VNode[],
        postScriptFunction: (() => VNode[]) | null
    ) {
        this.title = title;
        this.dateTime = dateTime;
        this.hRef = hRef;
        this.metaData = metaData;
        this.preScriptFunction = preScriptFunction;
        this.openingFunction = openingFunction;
        this.articleFunction = articleFunction;
        this.postScriptFunction = postScriptFunction;
    }
}
