import {VNode} from '../lib/dvdi'

export class ProjectPage {
    hRef: string;
    pageFunction: () => VNode;

    constructor(
        hRef: string,
        pageFunction: () => VNode,
    ) {
        this.hRef = hRef;
        this.pageFunction = pageFunction;
    }
}
