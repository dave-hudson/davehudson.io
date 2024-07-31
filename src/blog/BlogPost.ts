import {VNode} from '../lib/dvdi'

export class BlogPost {
    title: string;
    dateTime: string;
    hRef: string;
    description: string;
    imageURL: string | null;
    preScriptFunction: (() => VNode[]) | null;
    openingFunction: () => VNode[];
    articleFunction: () => VNode[];
    postScriptFunction: (() => VNode[]) | null;

    constructor(
        title: string,
        dateTime: string,
        hRef: string,
        description: string,
        imageURL: string | null,
        preScriptFunction: (() => VNode[]) | null,
        openingFunction: () => VNode[],
        articleFunction: () => VNode[],
        postScriptFunction: (() => VNode[]) | null
    ) {
        this.title = title;
        this.dateTime = dateTime;
        this.hRef = hRef;
        this.description = description;
        this.imageURL = imageURL;
        this.preScriptFunction = preScriptFunction;
        this.openingFunction = openingFunction;
        this.articleFunction = articleFunction;
        this.postScriptFunction = postScriptFunction;
    }
}
