import {VNode} from '../lib/dvdi'

export class ProjectPage {
    title: string;
    hRef: string;
    description: string;
    pageFunction: () => VNode;

    constructor(
        title: string,
        hRef: string,
        description: string,
        pageFunction: () => VNode,
    ) {
        this.title = title;
        this.hRef = hRef;
        this.description = description;
        this.pageFunction = pageFunction;
    }
}
