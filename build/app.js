(() => {
  // src/lib/dvdi.js
  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    html: "http://www.w3.org/1999/xhtml",
    xml: "http://www.w3.org/XML/1998/namespace",
    xlink: "http://www.w3.org/1999/xlink",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  var VDom = class {
    /**
     * Create a VDom node.
     * @param {string} namespace - The namespace for the matching DOM element.
     * @param {string} type - The type of the node (e.g., 'div').
     * @param {Object} [props={}] - The properties and attributes of the node.
     * @param {Array} [childNodes=[]] - The child nodes of this node.
     */
    constructor(namespace, type, props = {}, childNodes = []) {
      this.namespace = namespace;
      this.type = type;
      this.props = props;
      this.parentVNode = null;
      this.childNodes = childNodes;
      this.domElement = null;
      this.isMounted = false;
      this.mountCallback = null;
      this.unmountCallback = null;
    }
    /**
     * Append a child node.
     * @param {VDom|string} vNode - The child node to append.
     */
    appendChild(vNode) {
      this.childNodes.push(vNode);
      if (typeof vNode === "string") {
        return;
      }
      vNode.parentVNode = this;
    }
    /**
     * Remove a child node.
     * @param {VDom|string} vNode - The child node to remove.
     */
    removeChild(vNode) {
      const index = this.childNodes.indexOf(vNode);
      this.childNodes = this.childNodes.slice(0, index).concat(this.childNodes.slice(index + 1));
      if (typeof vNode === "string") {
        return;
      }
      vNode.parentVNode = null;
    }
    /**
     * Replace an old child node with a new one.
     * @param {VDom|string} newVNode - The new child node.
     * @param {VDom|string} oldVNode - The old child node to replace.
     */
    replaceChild(newVNode, oldVNode) {
      const index = this.childNodes.indexOf(oldVNode);
      this.childNodes[index] = newVNode;
      if (typeof newVNode !== "string") {
        newVNode.parentVNode = this;
      }
      if (typeof oldVNode !== "string") {
        oldVNode.parentVNode = null;
      }
    }
  };
  function mountVNode(vNode) {
    if (typeof vNode === "string") {
      return;
    }
    if (vNode.mountCallback && !vNode.isMounted) {
      vNode.mountCallback();
    }
    vNode.isMounted = true;
    for (let i of vNode.childNodes) {
      mountVNode(i);
    }
  }
  function unmountVNode(vNode) {
    if (typeof vNode === "string") {
      return;
    }
    if (vNode.unmountCallback && vNode.isMounted) {
      vNode.unmountCallback();
    }
    vNode.isMounted = false;
    for (let i of vNode.childNodes) {
      unmountVNode(i);
    }
  }
  function newAttribute(domElement, key, value) {
    if (key.startsWith("on")) {
      domElement.addEventListener(key.substring(2).toLowerCase(), value);
      return;
    }
    if (key === "className") {
      domElement.className = value;
      return;
    }
    const [prefix, ...unqualifiedName] = key.split(":");
    let ns = null;
    if (prefix === "xmlns" || unqualifiedName.length && namespaces[prefix]) {
      ns = namespaces[prefix];
    }
    domElement.setAttributeNS(ns, key, String(value));
  }
  function deleteAttribute(domElement, key, value) {
    if (key.startsWith("on")) {
      domElement.removeEventListener(key.substring(2).toLowerCase(), value);
      return;
    }
    if (key == "className") {
      domElement.className = null;
      return;
    }
    const [prefix, ...unqualifiedName] = key.split(":");
    let ns = null;
    if (prefix === "xmlns" || unqualifiedName.length && namespaces[prefix]) {
      ns = namespaces[prefix];
    }
    domElement.removeAttributeNS(ns, key);
  }
  function render(vNode) {
    if (typeof vNode === "string") {
      const domElement2 = document.createTextNode(vNode);
      return domElement2;
    }
    const { namespace, type, props, childNodes } = vNode;
    const domElement = document.createElementNS(namespaces[namespace], type);
    vNode.domElement = domElement;
    for (const key in props) {
      newAttribute(domElement, key, props[key]);
    }
    const len = childNodes.length;
    for (let i = 0; i < len; i++) {
      const vn = childNodes[i];
      domElement.appendChild(render(vn));
    }
    return domElement;
  }
  function unrender(vNode) {
    if (typeof vNode === "string") {
      return;
    }
    const { props, childNodes, domElement } = vNode;
    const len = childNodes.length;
    for (let i = len - 1; i >= 0; i--) {
      const vn = childNodes[i];
      vNode.removeChild(vn);
      unrender(vn);
    }
    for (const key in props) {
      deleteAttribute(domElement, key, props[key]);
    }
    vNode.domElement = null;
  }
  function changed(vnode1, vnode2) {
    return typeof vnode1 !== typeof vnode2 || typeof vnode1 === "string" && vnode1 !== vnode2 || typeof vnode1 !== "string" && vnode1.namespace !== vnode2.namespace || vnode1.type !== vnode2.type;
  }
  function updateProps(domElement, oldProps, newProps) {
    for (const key in oldProps) {
      if (!(key in newProps) || oldProps[key] !== newProps[key]) {
        deleteAttribute(domElement, key, oldProps[key]);
      }
    }
    for (const key in newProps) {
      if (!(key in oldProps) || oldProps[key] !== newProps[key]) {
        newAttribute(domElement, key, newProps[key]);
      }
    }
  }
  function updateElement(parent, parentVNode, oldVNode, newVNode, index) {
    if (oldVNode === null && newVNode !== null) {
      if (parentVNode) {
        parentVNode.appendChild(newVNode);
      }
      parent.appendChild(render(newVNode));
      mountVNode(newVNode);
      return;
    }
    if (oldVNode !== null && newVNode === null) {
      unmountVNode(oldVNode);
      unrender(oldVNode);
      if (parentVNode) {
        parentVNode.removeChild(oldVNode);
      }
      parent.removeChild(parent.childNodes[index]);
      return;
    }
    if (changed(oldVNode, newVNode)) {
      unmountVNode(oldVNode);
      unrender(oldVNode);
      if (parentVNode) {
        parentVNode.replaceChild(newVNode, oldVNode);
      }
      parent.replaceChild(render(newVNode), parent.childNodes[index]);
      mountVNode(newVNode);
      return;
    }
    if (typeof oldVNode === "string") {
      return;
    }
    newVNode.domElement = oldVNode.domElement;
    updateProps(parent.childNodes[index], oldVNode.props, newVNode.props);
    let oldLen = oldVNode.childNodes.length;
    let newLen = newVNode.childNodes.length;
    for (let i = oldLen - 1; i > newLen - 1; i--) {
      updateElement(parent.childNodes[index], oldVNode, oldVNode.childNodes[i], null, i);
    }
    if (oldLen > newLen) {
      oldLen = newLen;
    }
    for (let i = 0; i < oldLen; i++) {
      updateElement(parent.childNodes[index], oldVNode, oldVNode.childNodes[i], newVNode.childNodes[i], i);
    }
    for (let i = oldLen; i < newLen; i++) {
      updateElement(parent.childNodes[index], oldVNode, null, newVNode.childNodes[i], i);
    }
  }
  function h(type, props, ...childNodes) {
    let v = new VDom("html", type, props || {}, []);
    for (let i of childNodes) {
      v.appendChild(i);
    }
    return v;
  }
  function svg(type, props, ...childNodes) {
    let v = new VDom("svg", type, props || {}, []);
    for (let i of childNodes) {
      v.appendChild(i);
    }
    return v;
  }

  // src/lib/icons.js
  function chevronLeftIcon() {
    return svg(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg("polyline", { points: "15 18 9 12 15 6" })
    );
  }
  function chevronRightIcon() {
    return svg(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg("polyline", { points: "9 18 15 12 9 6" })
    );
  }
  function gitHubIcon() {
    return svg(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg(
        "path",
        {
          d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        }
      )
    );
  }
  function instagramIcon() {
    return svg(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg("rect", { x: 2, y: 2, width: 20, height: 20, rx: 5, ry: 5 }),
      svg("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
      svg("line", { x1: 17.5, y1: 6.5, x2: 17.51, y2: 6.5 })
    );
  }
  function linkedInIcon() {
    return svg(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
      svg("rect", { x: 2, y: 9, width: 4, height: 12 }),
      svg("circle", { cx: 4, cy: 4, r: 2 })
    );
  }
  function mailIcon() {
    return svg(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
      svg("polyline", { points: "22,6 12,13 2,6" })
    );
  }
  function moonIcon() {
    return svg(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
    );
  }
  function sunIcon() {
    return svg(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg("circle", { cx: 12, cy: 12, r: 5 }),
      svg("line", { x1: 12, y1: 1, x2: 12, y2: 3 }),
      svg("line", { x1: 12, y1: 21, x2: 12, y2: 23 }),
      svg("line", { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }),
      svg("line", { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }),
      svg("line", { x1: 1, y1: 12, x2: 3, y2: 12 }),
      svg("line", { x1: 21, y1: 12, x2: 23, y2: 12 }),
      svg("line", { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }),
      svg("line", { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 })
    );
  }
  function xIcon() {
    return svg(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg("polygon", { points: "21.3,21.1 9.9,2.9 2.7,2.9 14.1,21.1" }),
      svg("line", { x1: 2.7, y1: 21.1, x2: 9.9, y2: 14.5 }),
      svg("line", { x1: 14.1, y1: 9.5, x2: 21.3, y2: 2.9 })
    );
  }

  // src/lib/page.js
  var darkTheme = null;
  var darkModeSun = null;
  var darkModeMoon = null;
  function sunMoonIcon(isSun, clickCallback) {
    return h(
      "button",
      {
        className: "icon",
        id: isSun ? "dark-mode-sun" : "dark-mode-moon",
        "aria-label": isSun ? "Light mode" : "Dark mode",
        onClick: () => clickCallback(!isSun)
      },
      isSun ? sunIcon() : moonIcon()
    );
  }
  function pageHeader() {
    const component = () => h(
      "header",
      { className: "header" },
      h(
        "nav",
        { className: "site-title" },
        h(
          "h1",
          {},
          h("a", { href: "/", onClick: (e) => navigateEvent2(e, "/") }, "davehudson.io")
        ),
        h(
          "a",
          { className: "icon", href: "https://instagram.com/davehudsonio", title: "Instagram" },
          instagramIcon()
        ),
        h(
          "a",
          { className: "icon", href: "https://x.com/davehudsonio", title: "X" },
          xIcon()
        ),
        h(
          "a",
          { className: "icon", href: "https://linkedin.com/in/davejh", title: "LinkedIn" },
          linkedInIcon()
        ),
        h(
          "a",
          { className: "icon", href: "https://github.com/dave-hudson", title: "GitHub" },
          gitHubIcon()
        ),
        h(
          "a",
          {
            className: "icon",
            href: "mailto:hello@davehudson.io?subject=Email about davehudson.io",
            title: "Email"
          },
          mailIcon()
        )
      ),
      h(
        "nav",
        { className: "site-menu" },
        h("a", { className: "menu", href: "/blog", onClick: (e) => navigateEvent2(e, "/blog") }, "Blog"),
        h("a", { className: "menu", href: "/projects", onClick: (e) => navigateEvent2(e, "/projects") }, "Projects"),
        h("a", { className: "menu", href: "/about", onClick: (e) => navigateEvent2(e, "/about") }, "Me"),
        sunMoonIcon(false, setDarkTheme),
        sunMoonIcon(true, setDarkTheme)
      )
    );
    const windowMedia = window.matchMedia("(prefers-color-scheme: dark)");
    function setDarkTheme(dark) {
      if (dark === true) {
        darkModeSun.style.display = "";
        darkModeMoon.style.display = "none";
        darkTheme.disabled = false;
        if (windowMedia.matches) {
          localStorage.removeItem("darkTheme");
        } else {
          localStorage.setItem("darkTheme", "dark");
        }
      } else {
        darkModeSun.style.display = "none";
        darkModeMoon.style.display = "";
        darkTheme.disabled = true;
        if (!windowMedia.matches) {
          localStorage.removeItem("darkTheme");
        } else {
          localStorage.setItem("darkTheme", "light");
        }
      }
    }
    let vNode = component();
    vNode.mountCallback = () => {
      darkTheme = document.getElementById("dark-mode-theme");
      darkModeSun = document.getElementById("dark-mode-sun");
      darkModeMoon = document.getElementById("dark-mode-moon");
      let localDarkTheme = localStorage.getItem("darkTheme");
      if (localDarkTheme === null) {
        setDarkTheme(windowMedia.matches);
      } else {
        setDarkTheme(localDarkTheme === "dark");
      }
      if (windowMedia.addEventListener) {
        windowMedia.addEventListener("change", () => {
          setDarkTheme(windowMedia.matches);
        });
      } else if (windowMedia.addListener) {
        windowMedia.addListener(() => {
          setDarkTheme(windowMedia.matches);
        });
      }
    };
    return vNode;
  }
  function articleTitle(title, timeStr = "") {
    return h(
      "header",
      { className: "title" },
      h("h1", {}, title),
      h("time", { className: "meta" }, timeStr)
    );
  }
  function pageFooter() {
    return h(
      "footer",
      { className: "footer" },
      h(
        "p",
        { className: "copyright" },
        "\xA9 2014-2024 David J. Hudson"
      )
    );
  }

  // src/about/about.js
  function aboutPage() {
    return h(
      "div",
      { className: "container" },
      pageHeader(),
      h(
        "article",
        { className: "article" },
        articleTitle("About me (Dave Hudson)", "2024-05-29 07:45"),
        h(
          "p",
          {},
          "Hello, good morning/afternoon/evening* and welcome! ",
          h("em", {}, "(*please delete as appropriate)")
        ),
        h(
          "p",
          {},
          "I'm an unrepentant geek who loves all things engineering, scientific or otherwise techie. I would say I love maths too, but I should probably leave that to the experts :-)"
        ),
        h(
          "figure",
          {},
          h("img", { src: "/about/dave.jpg", alt: "Me (apparently always pictured with a drink!)" }),
          h("figcaption", {}, "Me (apparently always pictured with a drink!)")
        ),
        h(
          "p",
          {},
          "I've been playing with computers and writing software since I was 9 which is way more years than I care to think about. In that time I've had the pleasure of working on everything from massive scale embedded systems (IoT before anyone called it that) to mainframes, and now to decentralised systems. Along the way, I stopped to build operating systems, network stacks, compilers. For a while I also helped design CPU instruction sets."
        ),
        h(
          "p",
          {},
          "Lately I've been building blockchain and distributed ledger systems."
        ),
        h(
          "p",
          {},
          "That journey has led me all over the world and I've had the privilege of collaborating with some amazing people.  I live in North Wales (UK), but for 17 years I \u201Ccommuted\u201D to Northern California. Now my travels tend to take me to London (UK) and Abu Dhabi (UAE)."
        ),
        h("h2", {}, "Contact me"),
        h(
          "p",
          {},
          "Please feel free to reach out to me on: ",
          h("a", { href: "mailto:hello@davehudson.io?subject=Email about davehudson.io" }, "Email"),
          ", ",
          h("a", { href: "http://linkedin.com/in/davejh/" }, "LinkedIn"),
          ", ",
          h("a", { href: "http://x.com/davehudsonio" }, "X"),
          ", or ",
          h("a", { href: "http://instagram.com/davehudsonio" }, "Instagram")
        )
      ),
      pageFooter()
    );
  }

  // src/blog/BlogPost.js
  var BlogPost = class {
    constructor(title, dateTime, hRef, articleFunction) {
      this.title = title;
      this.dateTime = dateTime;
      this.hRef = hRef;
      this.articleFunction = articleFunction;
    }
  };

  // src/blog/2014-03-09-0000/2014-03-09-0000.js
  function blogArticle_201403090000() {
    return [
      h(
        "p",
        {},
        "Bitcoin mining is seemingly unique. T here has probably never been any technology problem that has triggered such sustained growth and it may be a very long time before we see another one.  A convergence of the scalable Bitcoin protocol design, readily available technology, money and mining incentives have accelerated this particular mine train in a truly explosive way.  Let's look at the trends and what they suggest for future mining activities."
      ),
      h("h2", {}, "What has been happening?"),
      h(
        "p",
        {},
        "There is probably a lot to be said for looking at the history of Bitcoin mining prior to the last 12 months but it's more interesting to look at how it has progressed since the introduction of ASIC (application specific integrated circuit) mining.  We might argue that this is the point at which mining started to become a professional task since the hardware involved can't be used for anything else.  Previous generations used hardware that was originally designed for other purposes and so let amateurs play too."
      ),
      h(
        "p",
        {},
        "Let's look at the worldwide hashing data:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-03-09-0000/20140309-hash-12months.png" }),
        h("figcaption", {}, "Worldwide hashing rate")
      ),
      h(
        "p",
        {},
        "The first thing to notice is that this isn't an ordinary graph.  It's plotted on a logarithmic Y axis meaning that each major graduation is 10 times larger than the one below.  If we look at the red trend line though it's a straight line, signalling that we have had exponential (runaway) growth.  There was a small period of time before the value of Bitcoins soared late in 2013 where things had slowed down but then everything caught up (which rarely happens with technology problems)."
      ),
      h("h2", {}, "Exponential growth"),
      h(
        "p",
        {},
        "It's useful to think about what that red trend line shows us.  What we see is that in the last 12 months the worldwide hashing rate has increased by a factor of approximately 1000.  That means that roughly every 4 months it got 10x larger, that it doubles almost every 37 days and that it increases by almost 1.9% per day!  We don't know how long this trend will continue but it has been somewhat stable for the last year.  Given that newer and faster ASIC hardware is due to ship throughout the next few months it seems likely that it will continue for some time yet."
      ),
      h("h2", {}, "The economics of professional mining"),
      h(
        "p",
        {},
        "Bitcoin mining is a zero-sum game; if one player wins then everyone else has to lose.  When the value of Bitcoins increases it means that even winning a small share of the total can be highly valuable so, rather than play alone, most people join a mining pool.  Mining pools let a player win fractions of the payout to that pool in proportion to the resources supplied to the pool but what we've just seen is that any resources a player contributes are reduced by almost 1.9% per day.  After a week they're down by more than 12% and after 37 days they're only 50% of what they started at."
      ),
      h(
        "p",
        {},
        "What this really means is that mining equipment has a staggering level of depreciation.  If the value of a Bitcoin doesn't change in that 37 day period then the mining hardware is only producing half of the value it started with.  After 74 days it's a quarter and after 4 months it's only a tenth.  It quickly reaches the point where the operating cost (OpEx) outweighs the value of what's being produced and the hardware is worthless.  At this point the entire capital cost (CapEx) of buying the equipment is wiped out."
      ),
      h(
        "p",
        {},
        "Almost nothing else we encounter works this way; consider that servers in a data centre or a laptop may be assumed to have a useful life of 3 to 5 years, while a car would typically be more than 10 years.  With a stagnant Bitcoin price, mining hardware has depreciated to just 1% of its original value in 8 months and its useful lifespan (where it produces more value than it costs to operate) is probably much shorter! Even if the value of Bitcoin increases by a factor of 10 it still only defers the huge reduction in capital value by 4 months."
      ),
      h("h2", {}, "How does this affect the hashing rate?"),
      h(
        "p",
        {},
        "The huge rate of depreciation means that there's only one sensible approach that a bitcoin miner can take: Run the hardware 24/7 at the highest speed that doesn't cause it to break from the moment it arrives until it's no longer generating more value than it costs to run.  Not doing this simply means a miner is losing the most valuable portion of their hardware's life."
      ),
      h(
        "p",
        {},
        "This simple rule has an important consequence; It guarantees a constant supply of the newest and fastest hashing engines driving the worldwide hashing rate.  Once an order is placed a miner is committed to fueling this expansion.  Unlike the rides in theme parks around the world, this particular runaway mine train isn't slowing down for anyone!"
      )
    ];
  }
  var blogPost_201403090000 = new BlogPost(
    "The Bitcoin runaway mine train",
    "2014-03-09",
    "/blog/2014-03-09-0000",
    blogArticle_201403090000
  );

  // src/blog/2014-03-12-0000/2014-03-12-0000.js
  function blogArticle_201403120000() {
    return [
      h(
        "p",
        {},
        "There's something odd about the fluctuations in the price of Bitcoins.  The data shows a set of spikes when the price jumps up and then falls back somewhat and levels out.  This wouldn't be so unusual if the spikes occurred intermittently but in the case of Bitcoins the spikes happen with a very surprising regularity!"
      ),
      h("p", {}, "Let's look at the graph:"),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-03-12-0000/20140312_BTC_Price.png" }),
        h("figcaption", {}, "Bitcoin price over time")
      ),
      h(
        "p",
        {},
        "The first thing to note is that the graph is plotted with a logarithmic Y axis so each step indicates a price point ten times larger than the one below.  Using a log scale means that we see patterns in the relative change in price much more easily, rather than changes in the actual value."
      ),
      h(
        "p",
        {},
        "There are 7 major spikes in the Bitcoin price starting on 17th November 2010 and finishing on the 30th November 2013.  If we ignore the spike on 10th February 2011 the other 6 spikes have an amazingly consistent spacing!"
      ),
      h(
        "p",
        {},
        "All of the major price spikes also show another remarkable similarity.  In each case the price ramps up very quickly, hits its highest point for a day or two and then slowly drops off."
      ),
      h(
        "p",
        {},
        "So there are a few big questions (to which I don't have any answers right now):"
      ),
      h(
        "ul",
        {},
        h("li", {}, "Why does the price spike up every 7 to 7.5 months?"),
        h("li", {}, "Why does the price never drop back below where it starts from?"),
        h("li", {}, "Is the behaviour just coincidence or is someone or something triggering it?")
      ),
      h(
        "p",
        {},
        "Does anyone have any data that might explain this?"
      )
    ];
  }
  var blogPost_201403120000 = new BlogPost(
    "Strange spikes in the Bitcoin price",
    "2014-03-12",
    "/blog/2014-03-12-0000",
    blogArticle_201403120000
  );

  // src/blog/2014-03-17-0000/2014-03-17-0000.js
  function blogArticle_201403170000() {
    return [
      h(
        "p",
        {},
        "Which comes first: The miners or the money?  Much as the old question of \u201CWhich came first: The chicken or the egg?\u201D there appears to have been a lot of debate about whether the price of Bitcoins is a result of mining activity or whether mining activity is the result of the price of Bitcoins."
      ),
      h(
        "p",
        {},
        "The generally-held belief is that as the value of Bitcoins has increased there has been more interest in Bitcoins and this has in turn driven miners to mine, but is it really this simple?"
      ),
      h(
        "p",
        {},
        "Let's look at a chart comparing the value of Bitcoin in US Dollars vs the global hashrate in GHash/s and see if we can make any sense of this?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-03-17-0000/20140317_Bitcoin-vs-hash.png" }),
        h("figcaption", {}, "Bitcoin price vs global hashrate")
      ),
      h(
        "p",
        {},
        "This chart is plotted on two logarithmic axis but they're not on the same scale.  The price trace increases by approximately a factor of a thousand but the hashing traces increases by approximately a factor of ten million.  Essentially this means that the hashing rate has increased 56 times faster than the price. There's nothing particularly significant about the ratios other than that they let us watch the two traces relative to each other."
      ),
      h(
        "p",
        {},
        "We can see something a little curious here though.  The hashing rate does indeed speed up as the price of a Bitcoin increases and the rate slows once the price starts to fall but it's almost as if the hashing rate has been acting as an anchor for the price. If we think about the hardware that has been used for hashing, however, there's an interesting pattern."
      ),
      h(
        "p",
        {},
        "In 2010 and the first half of 2011 miners could rapidly bring new hardware on-stream in the form of CPUs and then GPUs.  In many cases these were already available and so mining profitability didn't really have to account for the hardware costs and people would want CPUs and fast GPUs anyway."
      ),
      h(
        "p",
        {},
        "From mid 2011 to early 2013 the initial euphoria waned, yet that seems a little strange for something that had seen such rapid growth only a short while earlier.  There were the ",
        h(
          "a",
          { href: "/blog/2014-03-12-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-12-0000") },
          "strange periodic spikes in the Bitcoin price every 7-ish months"
        ),
        " but neither the price nor the hashing rate really changed that much.  Roll forward to early 2013 though and things suddenly changed - a lot."
      ),
      h(
        "p",
        {},
        "In early 2013 Bitcoin mining ASICs started to take over the hashing activity.  Unlike previous generations that used CPUs and GPUs that were intrinsically useful for other purposes the ASICs weren't; they weren\u2019t cheap either!  Suddenly a lot of Bitcoin miners were having to pay a lot of money to mine Bitcoins but curiously the price started to go up just as the ASICs started to become available.  Even more curiously, the ASICs had long lead times so miners had made a financial commitment to mining months in advance of their mining hardware being available.  Was it just \u201Cgood luck\u201D that the Bitcoin price suddenly surged, and then surged again, or was the price increase simply reflecting that a lot of money had been spent to go mining?"
      ),
      h(
        "p",
        {},
        "It seems quite possible that at least part of the reason for the surges in the Bitcoin price is a result of the miners investing in mining.  The price increases have encouraged more miners too and that means more money spent on mining by those new miners.  This really does feel like a \u201Cchicken and egg\u201D problem.  A bigger question, however, is what happens when the number of miners is large and the technology roadmap eventually limits the ability to increase the hash rate? At that point there will need to be some other driver for any other price increases."
      )
    ];
  }
  var blogPost_201403170000 = new BlogPost(
    "Chickens and eggs?",
    "2014-03-17",
    "/blog/2014-03-17-0000",
    blogArticle_201403170000
  );

  // src/blog/2014-03-23-0000/2014-03-23-0000.js
  function blogArticle_201403230000() {
    return [
      h(
        "p",
        {},
        "ASIC mining is now the norm for Bitcoin, and 28 nm ASICs are now becoming the mainstream replacing the 65 nm, or even 110 nm, designs of a year ago.  Bitcoin ASICs have leapfrogged several integrated circuit (IC) technologies in a way that's rarely been seen before and at an almost unprecedented rate of progress."
      ),
      h(
        "p",
        {},
        "How have things been able to move so fast, how much further can this go, and what might we expect from new designs?"
      ),
      h("h2", {}, "Why Have Things Moved So Fast?"),
      h(
        "p",
        {},
        "There are two characteristics of Bitcoin's design that have enabled the current style of ASIC mining:"
      ),
      h(
        "ul",
        {},
        h("li", {}, "It was designed from the outset to be incredibly scalable."),
        h("li", {}, "It uses a commonly-used SHA256 hash function for most of the work.")
      ),
      h(
        "p",
        {},
        `From a hardware designer's perspective the scalability of Bitcoin was a brilliant piece of engineering.  Its design allows many parallel engines to work on the same problem without significant serialization (where things get bottlenecked through one part of the system) and the system design anticipated the need to automatically adapt as processing capacity increased or decreased, so adding a huge increase in processing wouldn't break anything.  This sort of design is sometimes referred to as "embarrassingly parallel", and is one of the reasons why GPU mining worked so well prior to the development of ASICs as graphics processing is very similar.`
      ),
      h(
        "p",
        {},
        "The SHA256 hash has been the subject of some criticism from other cryptocurrency advocates (although the introduction of Scrypt ASICs is showing that their arguments in favour of more complex hashes are somewhat weaker than they originally believed), but from an ASIC designer's perspective SHA256 was ideal.  SHA256 has been supported in hardware for some time and so there were designs readily available to be used in mining chips."
      ),
      h(
        "p",
        {},
        "As two of the most tricky aspects of building an ASIC were already solved they were able to be developed far faster and with far less expense than would be true for most chips.  With the first generation ASICs being so profitable for their designers then the rapid push towards newer and faster chips was almost inevitable."
      ),
      h("h2", {}, 'Why does the "nm" size matter?'),
      h(
        "p",
        {},
        `Silicon designers think in terms of the "feature size" or "geometry" of a design and this is measured in nanometers (nm).  This number describes the smallest sized part used in constructing the transistors or wires within the integrated circuit (IC).  The smaller the number, the more such elements can be fitted into the same space.  It's important to realize that because ICs are two dimensional then making the feature size half of what it was means that we can actually get four times as many things in the same space.`
      ),
      h(
        "p",
        {},
        'Over the course of time silicon designers "shrink" the feature size, typically at the rate of about 2x every four years.  130 nm designs were state of the art in 2002, 65 nm in 2006, 32 nm in 2010, etc. At the time of writing (2014), x86 processors used in PCs, laptops and servers are using 22 nm and are scheduled to jump to 14 nm, while a state of the art mobile phone or tablet is probably using 28 nm.'
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-03-23-0000/ASIC_geometry.png" }),
        h("figcaption", {}, "ASIC geometry")
      ),
      h(
        "p",
        {},
        "Looking at this as a picture we can see just how much difference there is between 110 nm, 65 nm and 28 nm.  We're able to get more than 5x the number of transistors in a 28 nm device than a 65 nm one, and about 16x the number of a 110 nm one.  What this means for mining ASICs is that we can get 16x as many hashing engines in the same amount of silicon.  The solid block colours indicate geometries in which Bitcoin ASICs have either shipped or have been announced."
      ),
      h(
        "p",
        {},
        "The process geometry matters for many reasons:"
      ),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          "As the feature size shrinks the speed of the devices increases!  We don't just gain in terms of having more hashing engines, but each one can run faster too."
        ),
        h(
          "li",
          {},
          "When larger ICs are built there's usually some amount of parts that don't work because of small flaws in manufacturing.  The smaller the devices, the more working ones that helps to keep the cost down."
        ),
        h(
          "li",
          {},
          "ICs generate a lot of heat when they are run but we can offset some of that by running with lower operating voltages.  As the process size shrinks, so too do the required operating voltages.  This is something of a balancing act though, as it also tends to make them slightly slower."
        )
      ),
      h(
        "p",
        {},
        `This isn't the full story as there are lots of subtleties that we won't go into here, such as there being "fast" and "slow" processes where typically faster processes consume a lot more power for the same work and slower ones consume less.  When looking at 28 nm mining ASICs, though, it's worth noting that they're not all created equal and there will inevitably be quite large differences between the different designs we see.`
      ),
      h("h2", {}, "Where Do Bitcoin ASICs Go Next?"),
      h(
        "p",
        {},
        "Bitcoin ASICs have jumped forwards to the point where they're catching up with the limits of what can be done.  Realistically they should be able to shrink to 16 nm by the end of the year or the beginning of 2015, and at 16 nm there's potentially a 3x improvement over an equivalent 28 nm device.  Once things reach the limits of the fabs that produce the ASICs, though, then process-related gains will slow down dramatically."
      ),
      h(
        "p",
        {},
        "This doesn't mean that there are no more big jumps possible.  It's likely that designers this year will have to start (if they haven't already) at other ways to try to keep propelling the ASIC ",
        h(
          "a",
          { href: "/blog/2014-03-09-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-09-0000") },
          "mining train"
        ),
        ".  Here are a few thoughts on where things may go next:"
      ),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          "Look at how to reduce the power required for each hashing operation so that they can build systems with perhaps more ASICs but the same power consumption."
        ),
        h(
          "li",
          {},
          "Improve the implementation of the SHA256 engines to make them take fewer gates/transistors and thus pack even more into each new chip."
        ),
        h(
          "li",
          {},
          "Develop novel chip packaging that can dissipate heat more effectively."
        )
      ),
      h(
        "p",
        {},
        "These sorts of changes are going to require more work though because they won't just be based on known-working hardware concepts."
      ),
      h(
        "p",
        {},
        "It will be interesting to see just how this progresses; while the pace of progress will slow from where it is now, and the steep exponential growth in the hashing rate is likely to slow, there's every reason to believe that progressively faster hashing rates will continue to be a reality for quite some time to come."
      )
    ];
  }
  var blogPost_201403230000 = new BlogPost(
    "Where next for Bitcoin mining ASICs?",
    "2014-03-23",
    "/blog/2014-03-23-0000",
    blogArticle_201403230000
  );

  // src/blog/2014-04-03-0000/2014-04-03-0000.js
  function blogArticle_201404030000() {
    return [
      h(
        "p",
        {},
        "Bitcoin mining can be a very profitable activity. It's good that it is because Bitcoin, as a system, only works because of the mining activity; it's the mining that ensures the transactions actually take place.  Just how much money does it generate though and does this help us make any predictions for the future?"
      ),
      h(
        "p",
        {},
        "Like mining any other finite resource, Bitcoin mining gets harder over time and requires more investment to mine profitably.  Mining requires a capital outlay to buy mining equipment, incurs operating costs to keep it running and is ultimately only successful if, over the useful life of the mining equipment, the value of what's mined is higher than the total costs to mine it."
      ),
      h(
        "p",
        {},
        "For Bitcoin the mining rewards seem pretty simple to estimate.  The current (2014-04-03) fixed block reward is 25 BTC and there are a nominal 144 blocks per day.  This yields a nominal 3600 BTC per day. 1 BTC is currently worth about $450 (USD) so that's $1.62M being mined per day.  In practice though, this underestimates the mining reward for a couple of reasons:"
      ),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          "The difficulty level is going through a rapid (exponential) growth that means we're seeing far more than 144 blocks mined per day."
        ),
        h(
          "li",
          {},
          "The mining activity also earns the successful miner any transaction fees."
        )
      ),
      h("h2", {}, "Blocks mined per day"),
      h(
        "p",
        {},
        "Bitcoin was set up to try to track the amount of hashing capacity in the total network and to adjust the difficulty of the next batch of blocks every 2016 block (nominally every 2 weeks).  The aim is to try to have the next 2016 blocks take 2 weeks to complete.  Between the adoption of GPUs and the introduction of ASICs for mining this actually worked out quite well but the huge increases in hashing capacity enabled by ASICs have meant that the difficulty level has lagged behind. ",
        h(
          "a",
          { href: "/blog/2014-03-23-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-23-0000") },
          "ASIC technology"
        ),
        " limits will eventually slow this but not for some months at least."
      ),
      h(
        "p",
        {},
        "The impact of steadily increasing hashing rates can be seen when we look at the date at which the fixed block reward halves.  The genesis block was created on 2009-01-03, with the first mined block being on 2009-01-09.  The fixed reward halves every 210000 blocks so at 144 blocks per day this should have been 1458 days later, or 2013-01-06. In practice block 210000 occurred on 2012-11-28, some 39 days earlier."
      ),
      h(
        "p",
        {},
        "If we consider more recent trends the effect is even more marked.  Between blocks 210000 and 294000 there should have been 583.3 days, but we actually reached block 294000 in just 490 days.  Over 19 months of hashing work was completed in a little over 16 months. Our average number of blocks per day has been slightly more than 171.  In fact most of the gain has come in the last 14 months so the average block rate has been higher still."
      ),
      h(
        "p",
        {},
        "For the next few months at least it seems likely that we'll see this much larger average block rate so based on our original $450 per BTC then we get a fixed reward per day of $1.92M; this is $300k per day more than we might have guessed.  The downside, of course, is that while there's more money being made now, so the date of the next halving of the reward is moving closer. Instead of being in November 2016 it's already moved to August 2016 and, unless something unexpected happens, will almost certainly happen a month or two before that."
      ),
      h("h2", {}, "Transaction fees"),
      h(
        "p",
        {},
        "Bitcoin mining was designed to steadily move from a phase where mining was about collecting the fixed per-block reward of new coins to one in which transaction fees represented the majority of what a successful miner gained.  So far the numbers of transactions haven't been high enough to provide significant rewards from the fees and they're typically only generating about 10-15 BTC per day.  It's not unreasonable to state that Bitcoin needs transaction fees to become a larger part of the system otherwise the reduction in the fixed mining reward will be a serious problem."
      ),
      h(
        "p",
        {},
        "Typically miners will invest in the best hardware available in order to maximize their returns but that investment is funded by what they mine.  If there's not a major increase in the value of transaction fees when the fixed mining reward halves again then there's an equally strong risk that mining investments will drop substantially.  Given that mining uses highly specialized hardware and that the hardware comes from highly specialized companies then any such drop poses a serious risk to the profitability of companies supplying the virtual picks and shovels!"
      ),
      h(
        "h2",
        {},
        "Chickens and eggs part 2"
      ),
      h(
        "p",
        {},
        'In an earlier article, "',
        h(
          "a",
          { href: "/blog/2014-03-17-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-17-0000") },
          "Chickens and eggs?"
        ),
        `", I speculated about the relationship between hashing rates and BTC price.  In retrospect it seems a more interesting comparison is between hashing rates and the total daily miners' reward. Here's that new chart:`
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-04-03-0000/hash-vs-reward.png" }),
        h("figcaption", {}, "Bitcoin hashing rate compared with total mining rewards April 2014")
      ),
      h(
        "p",
        {},
        "As with earlier charts both of these traces are plotted on logarithmic axes but the two lines are spaced apart a little to make comparisons easier."
      ),
      h(
        "p",
        {},
        "If we consider that a state-of-the-art Bitcoin mining platform can generate a little over 300 MHash/s/$ then the current worldwide capacity of 48 PHash/s would require an investment of $160M.  In practice most of the hashing capacity is nowhere near as cost effective as 300 MHash/s/$ so it seems likely that the actual investment worldwide in the hardware that is currently running has been more like $300M to $500M.  Given that the hashing rates have been increasing so dramatically for more than 12 months it's also highly unlikely that more than a very small fraction of the currently-deployed hardware has been in use for more than 8 months."
      ),
      h(
        "p",
        {},
        "If we look at the estimated miner's reward for the last 8 months it's $514M.  This suggests that a huge fraction of the money being made from mining is now also being spent on mining hardware.  Another jump in the BTC price will help make things more profitable for miners but will probably also just trigger yet more spending on mining hardware.  It also suggests that the correlation between mining hash rates and the BTC price is certainly more circular than might otherwise seem likely as purchases of mining hardware has been one of the biggest uses of Bitcoin itself."
      ),
      h("h2", {}, "Limits on hashing?"),
      h(
        "p",
        {},
        "The $514M represents a realistic limit on the hashing rate since no-one can afford to operate at a loss for long.  Some of that $514 has to have been used to cover operating costs such as electricity, HVAC, premises, and some amount of miner's profit.  Unless ASIC and mining equipment vendors reduce their prices significantly then that puts an upper bound of $514M * 300 MHash/s/$; a little over 150 PHash/s.  Realistically it's probably less than 120 PHash/s and that's assuming that everyone was suddenly able to buy currently-shipping state-of-the-art equipment."
      ),
      h(
        "p",
        {},
        "As ASICs start to hit the limits of the process technology the huge expansions in the hashing rate will have to slow down and that will start to change the mining economics again... seems like something to write about next time :-)"
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-03-23-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-23-0000") },
            "Where next for Bitcoin mining ASICs? (2014-03-23)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-03-09-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-09-0000") },
            "The Bitcoin runaway mine train (2014-03-09)"
          )
        )
      )
    ];
  }
  var blogPost_201404030000 = new BlogPost(
    "The rewards for a Bitcoin miner",
    "2014-04-03",
    "/blog/2014-04-03-0000",
    blogArticle_201404030000
  );

  // src/blog/2014-04-28-0000/2014-04-28-0000.js
  function blogArticle_201404280000() {
    return [
      h(
        "p",
        {},
        "One of the more common questions asked when people think about the scale of Bitcoin mining is just how much electricity is being spent supporting the worldwide hashing activities.  The question becomes more interesting once it's realized that hashing performs no useful function other than to support mining."
      ),
      h(
        "p",
        {},
        "While the green footprint is of interest to many, the electricity costs turn out to play a much more interesting role in predicting future mining behaviour.  They play a major role in defining the viability of mining hardware, help determine the upper limit on the worldwide hashing rate and the potential scale of future mining operations."
      ),
      h("h2", {}, "What are the electricity costs?"),
      h(
        "p",
        {},
        "At the time of writing (2014-04-27) a state-of-the-art 28 nm mining ASIC achieves between 700 and 800 GH/s at a power cost of about 0.65 W/GH/s.  The current worldwide hashing rate is hovering around 57 PH/s and so that equates to about 37 MW. While this defines a theoretical minimum power consumption it's nowhere near the actual number; most mining is not using state-of-the-art hardware and is probably operating at closer to 1 to 2 W/GH/s.  If we assume an average of 1.5 W/GH/s then that would probably give a more realistic power requirement of about 86 MW."
      ),
      h(
        "p",
        {},
        "There is a small amount of hashing capacity provided by older, much less efficient designs but we can largely ignore these systems for our purposes; very few miners can sustain operating at a substantial operating loss.  Similarly there are newer designs due to ship within a month or two that may reduce the power requirements to 0.52 W/GH/s and potentially less, but these aren't apparently contributing to the current hashrate in any very significant way.  We're also choosing to ignore the costs of hardware that control the mining ASICs and the PSU inefficiencies."
      ),
      h(
        "p",
        {},
        "If we take our 86 MW number then that equates to 2.06M kWh of electricity per day.  Electricity prices vary quite a lot based on location but the range is probably as low as $0.08 all the way through to $0.50 (see ",
        h(
          "a",
          { href: "http://energyusecalculator.com/global_electricity_prices" },
          "http://energyusecalculator.com/global_electricity_prices.htm"
        ),
        " but a reasonable working average might be $0.20.  Commercial users might average a lower raw cost for electricity, but they will often have to pay for cooling systems that in turn take electricity and so have an amortized cost that is probably not dissimilar."
      ),
      h(
        "p",
        {},
        "At this level the electricity bill for the worldwide hashing would currently be $413k per day (about $151M per year!)."
      ),
      h("h2", {}, "How does this affect peak hashing rates?"),
      h(
        "p",
        {},
        'In an earlier article, "',
        h(
          "a",
          { href: "/blog/2014-04-03-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-04-03-0000") },
          "The rewards for a Bitcoin miner"
        ),
        `", we looked at how hardware costs and mining rewards could put an upper limit on the worldwide hashing rate, but this didn't really try to account for operating costs.  If we start to think about these it starts to provide some new insights!`
      ),
      h(
        "p",
        {},
        "First we need to consider the total Bitcoin mining rewards that are available each day.  With the BTC price at around $450, the current growth in hashing rate and the current transaction fees the available mining reward is around $2M per day."
      ),
      h(
        "p",
        {},
        "If we take our electricity estimate of $413k per day then that still leaves us with about $1.58M left over.  If we ignore any need to pay other overheads then that can in theory just go on paying for new hashing hardware.  Of course this isn't really possible and our miners still need to deduct money for equipment space, cooling, salaries, replace failed hardware, taxes and of course any profits.  We can get an upper bound this way though, so it's still useful."
      ),
      h(
        "p",
        {},
        "At $3.20 per GH/s then $1.58M pays for a little over 490 TH/s per day, or about 28.6 PH/s of extra capacity after 58 days.  At the beginning of March 2014 our total hash rate was around 30 PH/s, while 58 days later we're at 57 PH/s and have thus added a net 27 PH/s.  That's surprisingly close!"
      ),
      h("h2", {}, "The runaway mine train slowing down?"),
      h(
        "p",
        {},
        "As new hardware goes online, older, far less efficient devices, drop off the network so the additional capacity isn't purely additive.  A percentage of our original capacity will have been lost this way and other losses will occur because of equipment failures. All this suggests that for the moment, at least, hashing capacity is being added at a rate that is probably not even close to breaking even for many of those concerned.  Total mining rewards are being fully absorbed by new hardware, yet those other overheads are very real."
      ),
      h(
        "p",
        {},
        "Most of this recently added hashing capacity was prepaid when the BTC price was much higher and expectations of returns were equally higher.  The past few months will have certainly curtailed much of that enthusiasm. It seems very likely that in the short term a lot more older mining hardware will have to shut down and the purchase of newer hardware will slow down unless the BTC price recovers significantly.  This probably has the largest impact on anyone looking to mine on a commercial scale because they have to generate profits to return to investors as well as cover costs."
      ),
      h(
        "p",
        {},
        'In another article, "',
        h(
          "a",
          { href: "/blog/2014-03-23-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-23-0000") },
          "Where next for Bitcoin mining ASICs?"
        ),
        `", some thought was given to how much opportunity there is to see much more efficient hashing hardware.  It seems inevitable that technology will no longer offer a path to dramatically higher hashing rates at the same capital and operating costs.  That can only mean one thing, hashing rate increases will become much more incremental.  There is some evidence that this is already happening and where only a few months ago hashing rates were increasing 10x every 4 months, they're now starting to take longer.  This no longer seems surprising given what we have just calculated.`
      ),
      h("h2", {}, "Modeling the trend"),
      h(
        "p",
        {},
        "In order to better understand this it seemed a good model was required.  I built a simulation (written in C) that calculates mining behaviour using a more refined version of the ideas presented above.  As with all models there are some assumptions, so here are the main ones:"
      ),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          "Assume that ASICs will improve incrementally every day to deliver 2x more hashing every 2 years.  Technology changes usually come in jumps so this will probably over-estimate hashing slightly."
        ),
        h(
          "li",
          {},
          "Predict that the power consumption per hash will reduce by 50% in the same 2 years.  In practice this is probably over-optimistic as Moore's Law only really allows for a total improvement of 2x every 2 years and this is a cumulative 4x improvement but it seems likely that there's still more room to improve ASIC designs."
        ),
        h(
          "li",
          {},
          "Assume steady changes in the BTC price over the course of the 2 years it runs for.  Again the validity of this approach can be argued but the impact on results is relatively small."
        )
      ),
      h(
        "p",
        {},
        "Let's look at the prediction. Data prior to May 2014 is actual measured data from ",
        h("a", { href: "http://blockchain.info" }, "blockchain.info"),
        ", while the 2 years after are predicted."
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-04-28-0000/hash-predict.png" }),
        h("figcaption", {}, "Predictions of the Bitcoin hashing rate April 2014. Shows an S curve appearing")
      ),
      h(
        "p",
        {},
        "The vertical axis is logarithmic and clearly shows how the hashing rate will slow down over the next two years.  What's somewhat interesting is that whether the BTC price remains the same, doubles or quadruples over that time the effect is still pronounced.  The hashing rate continues to grow, but slows dramatically.  What's also important to reiterate is that these represent the highest hashing rates that can be achieved; when other overheads and profits are taken then the growth rate will be lower and flatter."
      ),
      h("h2", {}, "Warehouse scale mining?"),
      h(
        "p",
        {},
        "Mainstream server farms in small data centres were the model of computing for many years, but the need for power and management efficiency has driven the development of warehouse scale computing facilities.  These same motivators clearly affect Bitcoin mining too."
      ),
      h(
        "p",
        {},
        "For most of the last year the exponential hashing growth rate has meant that mining has necessarily been focused on the short term, a trend that is all but totally incompatible with the sorts of investments required to operate at warehouse scale.  The predicted slowdown should start to change that quite dramatically."
      ),
      h(
        "p",
        {},
        "Warehouse scale designs can operate with the lowest electricity costs and lowest cooling costs while also enabling more cost effective maintenance.  Large scale mining also allows dramatic reductions in equipment costs; the unit price for 10000 ASICs will be dramatically lower than for 10."
      ),
      h(
        "p",
        {},
        "It is somewhat ironic that rather the decentralized hashing we may be on the verge of moving much of it into large, highly centralized, mining facilities."
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-04-03-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-04-03-0000") },
            "The rewards for a Bitcoin miner (2014-04-03)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-03-23-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-23-0000") },
            "Where next for Bitcoin mining ASICs? (2014-03-23)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-03-09-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-09-0000") },
            "The Bitcoin runaway mine train (2014-03-09)"
          )
        )
      )
    ];
  }
  var blogPost_201404280000 = new BlogPost(
    "Megawatts of mining",
    "2014-04-28",
    "/blog/2014-04-28-0000",
    blogArticle_201404280000
  );

  // src/blog/2014-04-30-0000/2014-04-30-0000.js
  function blogArticle_201404300000() {
    return [
      h(
        "p",
        {},
        `Over the last few months I've written about patterns and trends in Bitcoin mining while I've been trying to predict how things will evolve.  More recently I've built simulations that attempt to model how various trends will affect the mining network.  Irrespective of the "improvements", be they improved hashing rates, lower power consumption per hash, lower price per kWh of electricity or higher BTC price, one thing is inescapable:  The Bitcoin difficulty increases quickly absorb everything thrown at them in order to maintain the system's block finding rate.  This has very significant implications for the not-too-distant future.`
      ),
      h("h2", {}, "The role of difficulty"),
      h(
        "p",
        {},
        "The Bitcoin difficulty concept is a very elegant approach to ensure that no matter how the hashing infrastructure changes the intrinsic timescales envisaged for Bitcoin mining stay essentially the same.  The design allows for the system to remain computationally stable and secure as technology changes and expansions in the numbers of participants take place.  It also helped solve a problem of how to start up (bootstrap) the mining network.  Mining could use commodity hardware that already existed and had other purposes.  It also required no capital investment, just the additional cost of running PCs at higher CPU loads than they had been."
      ),
      h(
        "p",
        {},
        "As Bitcoins started to become worth money, however, the prospect of mining a larger share of them has been ever more enticing.  Mining became an end in itself, rather than just a means to support the transmission of Bitcoins.  Once mining became seen as valuable there was a clear challenge to any intent that miners would co-operate for the good of the network.  Instead individuals could gain an advantage, albeit at the expense of everyone else.  The behaviour of miners essentially became a real-world prisoner's dilemma."
      ),
      h("h2", {}, "Prisoner's dilemma"),
      h(
        "p",
        {},
        "In the prisoner's dilemma, two prisoners, A and B, suspected of committing the same crime (and for which there is no other evidence) are arrested and held such that they cannot communicate with each other.  Each has a choice: confess (known as defecting) or remain silent (known as cooperating)."
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-04-30-0000/Prisoners_Dilemma.png" }),
        h("figcaption", {}, "Depiction of the Prisoner's Dilema. Image by Chris Jensen and Greg Riestenberg")
      ),
      h(
        "p",
        {},
        "The choices lead to 4 possible outcomes:"
      ),
      h(
        "ol",
        {},
        h("li", {}, "A and B both stay silent: both go free."),
        h("li", {}, "A and B both confess: both get 2 years in jail."),
        h("li", {}, "A confesses and B stays silent: A gets 1 year in jail and B gets 3 years in jail."),
        h("li", {}, "A stays silent and B confesses: A gets 3 years in jail and B gets 1 year in jail.")
      ),
      h(
        "p",
        {},
        "Clearly the best option is for both to stay silent (neither acts to harm the interests of the other), but the average outcome is: (0.25 * 0) + (0.25 * 1) + (0.25 * 3) + (0.25 * 2) =\xA01.5 years in jail.  The potential risk of getting 3 years in jail is probably enough to have more confess than not but there's no strong favourite position.  If A confesses then it's a 50:50 chance of a positive or negative result"
      ),
      h(
        "p",
        {},
        "Now imagine the same game but with 3 members of the same criminal gang - if any one confesses either of the others who stays silent get the full 3 year penalty, while all those who do confess get just 1 year in jail. There are 8 possible options here and the average result is still 1.5 years in jail.  Now, however, if A stays silent then only 1 out of the 4 outcomes is positive (0 years) and 3 out of the 4 are the most negative (3 years).  Remaining silent now carries an average cost of 9/4 = 2.25 years in jail.  Conversely confessing now carries an average cost of 5/4 = 1.25 years in jail!"
      ),
      h(
        "p",
        {},
        "This is the core of the problem with Bitcoin difficulty, but the outcomes are slightly different. With mining we have a zero sum game (the total result however played is the same).  Consider 2 miners:"
      ),
      h(
        "ol",
        {},
        h("li", {}, "A and B have the same hardware: Both get 50% of the mining reward."),
        h("li", {}, "A and B both double their hashing rates: Both get 50% of the mining reward."),
        h("li", {}, "A doubles their hashing rate but B does not: A gets 67% of the mining reward, B gets 33%."),
        h(
          "li",
          {},
          "A keeps the same hardware but B doubles their hashing rate: A gets 33% of the mining reward, B gets 67%."
        )
      ),
      h(
        "p",
        {},
        "In this version the average is still 50% of the total, but now defecting (increasing hashing rate) averages 58.3% of the mining reward vs 41.7% for cooperating.  If we play the same game with 3 miners then all start with 33.3% of the total, but cooperating averages only 26% and defecting averages 41%.  Statistically it seems obvious that defecting and doubling hash rates leads to the best outcome.  Of course all of the miners know this so where possible they will always defect; it becomes an ongoing race to try to continually leapfrog the other players.  Sometimes a player will choose to leave the game but then another will likely try to join and ultimately no-one gains an advantage."
      ),
      h(
        "p",
        {},
        `Interestingly one of Satoshi Nakamoto's last public posts (2010-12-12) alluded to this same problem: "We should have a gentleman's agreement to postpone the GPU arms race as long as we can for the good of the network".  It's unclear just how far he had gone in thinking about this though.`
      ),
      h(
        "p",
        {},
        "This then is the headache for mining.  The headlong race of miners trying to prevent anyone else from outdoing themselves simply leads to a point where all of the resources that each miner can bring to bear end up fully consumed in the arms race itself.  A very small number of miners will make money (where they have a short-term advantage) and exit the game, while most will make long-term losses."
      ),
      h("h2", {}, "The runaway mining headache"),
      h(
        "p",
        {},
        "As with gold rushes of the past, most of the money has recently flowed to suppliers who have enabled ever-larger-scale mining.  While much more efficient than previous generations the difficulty levels increased exponentially to absorb the improvements and the trend towards ever-increasing operating costs was simply deferred, not prevented.  A short term respite has recently seen a move to locations with lower cost electricity suppliers but this has simply freed up money to spend on yet more hashing capacity and that in turn requires more electricity.  There are probably a few more short term improvements that might be made, such as utilizing waste heat in some more useful way, but these too only act to make more money available to increase hashing capacity.  Even BTC price increases only offer temporary respite.  Whatever the cause, the difficulty level increases accordingly and this quickly negates any benefits."
      ),
      h(
        "p",
        {},
        "It's already apparent that difficulty level increases are also affecting the price of hardware.  This has started to fall in order to offer any potential prospect of useful mining rewards.  Technology limits mean that technology improvements do not offer a path to enable the necessary cost reductions, so hardware vendors margins are being cut too.  Inexorably the balance will continue to move towards operating costs consuming almost all of the available mining rewards."
      ),
      h(
        "p",
        {},
        `In traditional "arms race" problems the participants often end up mutually agreeing to try to de-escalate things and verify that all parties have honoured their commitments, but the decentralized nature of Bitcoin mining means that such agreements are all but impossible; the participants just aren't knowable.`
      ),
      h(
        "p",
        {},
        "Other cryptocurrencies have tried to prevent an arms race by making things harder for custom hardware.  While this relieves some short-term pressure any computational problem ends up susceptible to the same economic pressures.  Given the scope of Bitcoin mining deployments it seems improbable that changing the core hashing algorithm would be an option anyway."
      ),
      h(
        "p",
        {},
        "Early miners and ASIC suppliers have already seen their profits, and indeed may still earn more yet.  They can sit on a sunny beach sipping champagne cocktails, but as the difficulty levels eat into everyone else's margins it's unclear how the mining dilemma can end up having a happy ending for anyone else but the energy suppliers."
      ),
      h(
        "p",
        {},
        "Acknowledgement: The last line of this article was rewritten thanks to an ",
        h("a", { href: "https://bitcointalk.org/index.php?topic=580632.msg6572887#msg6572887" }, "insightful remark"),
        " when I first posted a link to it!"
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-04-28-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-04-28-0000") },
            "Megawatts of mining (2014-04-28)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-04-03-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-04-03-0000") },
            "The rewards for a Bitcoin miner (2014-04-03)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-03-23-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-23-0000") },
            "Where next for Bitcoin mining ASICs? (2014-03-23)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-03-09-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-09-0000") },
            "The Bitcoin runaway mine train (2014-03-09)"
          )
        )
      )
    ];
  }
  var blogPost_201404300000 = new BlogPost(
    "Prisoner's dilemmas?",
    "2014-04-30",
    "/blog/2014-04-30-0000",
    blogArticle_201404300000
  );

  // src/blog/2014-05-20-0000/2014-05-20-0000.js
  function blogArticle_201405200000() {
    return [
      h(
        "p",
        {},
        'One of the more infuriating challenges when trying to do any sort of analysis of Bitcoin mining is to understand the current world-wide hashing rate and how this affects difficulty changes.  The very best "live update" websites seem to show the hash rate being all over the place. Large spikes occur frequently and it appears that huge amounts of hashing capacity have either come online or gone offline.  This explanation may appeal to conspiracy theorists, and will sometimes be the real cause, but there is a much more mundane reason most of the time (but nonetheless surprising).'
      ),
      h("h2", {}, "Isn't mining set up to generate a block once every 10 minutes?"),
      h(
        "p",
        {},
        "The first thing to look at is the way mining operates.  The use of the SHA256 hash is intended to make it effectively impossible to predict what will or won't give a particular hash result without actually computing the hash and seeing if it solved a block.  Essentially each minor change in the an attempt to solve a block gives a totally random effect, so trying one hash means that the next attempt is neither no more likely, or no less likely, to succeed!  This highly random nature means that mining is a ",
        h("a", { href: "http://en.wikipedia.org/wiki/Poisson_process" }, "Poisson Process"),
        " As each attempt to solve a block is unpredictable then in theory everyone might mine all day and never solve a block.  Similarly it's also possible that a single miner might find 6 blocks in a succession. Both outcomes are possible, but both are staggeringly unlikely!"
      ),
      h("h2", {}, "A Poisson process"),
      h(
        "p",
        {},
        "Poisson Processes have some very well understood characteristics.  We can prediction how many events (finding blocks in our case) will occur in a particular period of time when we know what the average number of events will be."
      ),
      h(
        "p",
        {},
        "For Bitcoin mining where the difficulty isn't changing (the hash rates are constant) then we should see an average of 6 blocks per hour, 144 per day, or 2016 per 2 weeks."
      ),
      h(
        "p",
        {},
        "Here's what the probabilities look like for a single hour:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-05-20-0000/blocks-per-hour.png" }),
        h("figcaption", {}, "Probabilities of blocks in a given hour")
      ),
      h(
        "p",
        {},
        "The chart shows the probability (between 0 and 1) for each block count in yellow and the cumulative probability in red.  Even though we might expect 6 blocks every hour we will actually see 2 or fewer blocks around once every 16 hours; we'll also see 10 or more blocks once every 24 hours too.  It may seem surprising but once every 2.8 days we'll find an hour between consecutive blocks ",
        h(
          "em",
          {},
          "[2015-02-05: This originally stated 16.8 days and not 2.8 days, but I had mistakenly multiplied by 6.]"
        )
      ),
      h("h2", {}, "What happens when difficulty levels are increasing?"),
      h(
        "p",
        {},
        "When difficulty levels are increasing we see a change in the probabilities.  Let's look at our original cumulative probability chart and add in a chart for where the average block finding rate is 10% higher (we're seeing 6.6 blocks per hour):"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-05-20-0000/cumulative-blocks-per-hour.png" }),
        h("figcaption", {}, "Cumulative probabilities")
      ),
      h(
        "p",
        {},
        "Our original statistics are in red and the new ones are in blue.  It's now more likely that we'll see a slightly higher block finding rate, but we still see much lower and much higher numbers occurring quite frequently!"
      ),
      h("h2", {}, "Hash rate calculators"),
      h(
        "p",
        {},
        "Hash rate calculators have a huge problem as a result of the randomness shown by the statistics.  All they can do is measure the event rate and make an estimate of the rate, based on the block finding rates.  They have no way of telling if the statistics for any given period of time were normal, low, high, very low, very high, etc."
      ),
      h("h2", {}, "Difficulty changes"),
      h(
        "p",
        {},
        "Difficulty changes occur every 2016 blocks.  They play a very interesting role in hash rate statistics because they're computed by taking the time it took to find the previous set of blocks and to set the difficulty to a level where they would have taken 14 days to find."
      ),
      h(
        "p",
        {},
        "Let's look at the probabilities for a 14 day period:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-05-20-0000/blocks-per-14-days.png" }),
        h("figcaption", {}, "Probabilities over a 14 day period")
      ),
      h(
        "p",
        {},
        "The scale here is different to our original graphs, and we're only looking at the numbers closer to the nominal 2016 blocks that should be found in 14 days.  There are some interesting markers shown."
      ),
      h(
        "p",
        {},
        "As we might expect, the most likely outcome is that we will see 2016 blocks found, but 10% of the time we'll see fewer than 1958.  Similarly 10% of the time we'll see more than 2073. Of course the difficulty will be reset after 2016 anyway but in that case it would be set about 2.8% higher than it should be. If we think about those two 10% numbers this means that every 5 blocks we will see a difficulty level that is either 2.8% higher or lower than it should be.  In the next difficulty change period we will probably see that counteracted, but there's no actual guarantee since we may see two consecutive high estimates."
      ),
      h(
        "p",
        {},
        "We can also look at the 1% and 99% markers. They represent things that between them will happen about once every 2 years.  Approximately once every 2 years the hash rate estimates at the difficulty change will be out by more than 5% and so the difficulty will be set incorrectly by as much as 5%!"
      ),
      h(
        "p",
        {},
        "What's really important here is that even if the worldwide hash rate was constant we'd still appear to see significant difficulty changes occurring every 2016 blocks!"
      ),
      h(
        "p",
        {},
        "As for hash rate estimation, doesn't it now look much more complex than it seemed it would?"
      ),
      h("hr", {}),
      h("h2", {}, "Source code"),
      h(
        "p",
        {},
        "This article was written with the help of data from a C language application that generates the probability distributions. The data was rendered into charts using Excel.  The source code can be found on github: ",
        h(
          "a",
          { href: "https://github.com/dave-hudson/hash-rate-headaches" },
          "https://github.com/dave-hudson/hash-rate-headaches"
        )
      )
    ];
  }
  var blogPost_201405200000 = new BlogPost(
    "Hash rate headaches",
    "2014-05-20",
    "/blog/2014-05-20-0000",
    blogArticle_201405200000
  );

  // src/blog/2014-05-24-0000/2014-05-24-0000.js
  function blogArticle_201405240000() {
    return [
      h(
        "p",
        {},
        "Everyone knows that mining is a noisy task.  Did you realize just how noisy Bitcoin mining is though? These aren't the noises you were looking for..."
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-05-24-0000/high-noise-levels.jpg" })
      ),
      h("h2", {}, "A simple question"),
      h(
        "p",
        {},
        'An earlier article, "',
        h(
          "a",
          { href: "/blog/2014-05-20-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
          "Hash rate headaches"
        ),
        `" looked at the statistics associated with Bitcoin mining and how it is a random Poisson Process.  It was pretty clear that the global hashing rate, and thus the Bitcoin mining difficulty, are subject to quite a lot of noise, but it wasn't completely obvious how much.`
      ),
      h(
        "p",
        {},
        "One way to think about this is to ask a simple question: If the hash rate stayed constant for 52 difficulty changes (approximately 2 years) then what would happen to the Bitcoin difficulty during that time?"
      ),
      h(
        "p",
        {},
        "Intuitively it seems that the difficulty shouldn't really change, but what are the statistics?  This seemed like an interesting thing to try to unravel so I built another simulator (it's another one written in C, please contact me if you'd like to know more about it)."
      ),
      h("h2", {}, "A simple mining simulation"),
      h(
        "p",
        {},
        "The simulation sets up a nomalized difficulty of 1 and then models each individual block being found.  Every 2016 blocks it then updates the the difficulty and the random mining continues.  It's not a perfect simulation because it ignores network latency or the possibility of orphaned blocks, but these have a very small impact. Here's one run:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-05-24-0000/simulation.png" }),
        h(
          "figcaption",
          {},
          "Chart showing noise spikes in the Bitcoin difficulty based on a simulation at a constant hash rate"
        )
      ),
      h(
        "p",
        {},
        "This is just one of many random simulation runs.  The difficulty changes are somewhat surprising. On 7 occasions the difficulty increases by more than 5% and on 3 it reduces by more than 5% (over a much larger number of runs the number higher and lower are typically the same; in this instance if we move the threshold to 4% then it's 8 higher and 7 lower)."
      ),
      h(
        "p",
        {},
        "Our intuition about the difficulty basically staying the same isn't actually wrong, it's just that that's an average behaviour.  Run the simulations for long enough and everything levels out. Each set of 2016 blocks takes almost exactly 14 days to find."
      ),
      h(
        "p",
        {},
        "Doubters may question the simulation because negative difficulty changes have been so rare, but for most of the last 5 years the hashing rate has been climbing.  Even when it wasn't climbing at current levels though it was still generally increasing.  With this first simulation, as long as the hashing rate increases by more than 5% then we will rarely see a negative difficulty change.  By Bitcoin standards, 5% is a very gentle growth rate.  If we have 14 successive difficulty changes of 5% then we end up at 1.98x the original hashing rate. That same 14 difficulty changes would take 186.7 days; more than 6 months."
      ),
      h(
        "p",
        {},
        "It's a little difficult to extract the increase in hashing rate from the current difficulty levels, but let's assume it has had still a steady exponential growth.  The steady rate would be 16.9% for the last 4 months.  The assumption doesn't strictly hold as we're seeing a gradual slowdown but even with the simplification we can still see that the variance from our 16.9% is very similar to what the simulation shows:"
      ),
      h(
        "table",
        {},
        h(
          "thead",
          {},
          h(
            "tr",
            {},
            h("th", { align: "left" }, "Date"),
            h("th", { align: "right" }, "Difficulty"),
            h("th", { align: "right" }, "Change"),
            h("th", { align: "right" }, "Variance")
          )
        ),
        h(
          "tbody",
          {},
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-05-24"),
            h("td", { align: "right" }, "10455720138"),
            h("td", { align: "right" }, "18.10%"),
            h("td", { align: "right" }, "1.20%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-05-12"),
            h("td", { align: "right" }, "8853416309"),
            h("td", { align: "right" }, "10.66%"),
            h("td", { align: "right" }, "-6.24%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-04-29"),
            h("td", { align: "right" }, "8000872136"),
            h("td", { align: "right" }, "14.64%"),
            h("td", { align: "right" }, "-2.26%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-04-17"),
            h("td", { align: "right" }, "6978842650"),
            h("td", { align: "right" }, "14.04%"),
            h("td", { align: "right" }, "-2.86%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-04-05"),
            h("td", { align: "right" }, "6119726089"),
            h("td", { align: "right" }, "22.23%"),
            h("td", { align: "right" }, "5.33%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-03-24"),
            h("td", { align: "right" }, "5006860589"),
            h("td", { align: "right" }, "17.80%"),
            h("td", { align: "right" }, "0.90%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-03-13"),
            h("td", { align: "right" }, "4250217920"),
            h("td", { align: "right" }, "11.39%"),
            h("td", { align: "right" }, "-5.21%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-02-28"),
            h("td", { align: "right" }, "3815723799"),
            h("td", { align: "right" }, "21.92%"),
            h("td", { align: "right" }, "5.02%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-02-17"),
            h("td", { align: "right" }, "3129573175"),
            h("td", { align: "right" }, "19.39%"),
            h("td", { align: "right" }, "2.49%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-02-05"),
            h("td", { align: "right" }, "2621404453"),
            h("td", { align: "right" }, "19.49%"),
            h("td", { align: "right" }, "2.59%")
          ),
          h(
            "tr",
            {},
            h("td", { align: "left" }, "2014-01-24"),
            h("td", { align: "right" }, "2193847870"),
            h("td", { align: "right" }, "22.59%"),
            h("td", { align: "right" }, "5.69%")
          )
        )
      ),
      h(
        "p",
        {},
        "The variations here are slightly larger than we would expect for just our random noise but the rate at which hashing is added to the network can't be completely steady.  The behaviour is very close to what the statistical model predicts."
      ),
      h(
        "p",
        {},
        "One simulation isn't anywhere near sufficient of course.  As we compare more trials though the behaviour is essentially the same. Here are 2 different simulation runs overlaid on top of our original one:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-05-24-0000/simulation_x3.png" }),
        h("figcaption", {}, "Simulated mining with constant hash rate")
      ),
      h(
        "p",
        {},
        "The good news for miners is that for every spike that goes up there's one that goes down, but the cries of despair from the latest 18.10% difficulty change are already echoing around the Internet.  Unlike space, where no-one can hear your scream, it seems that in Cyberspace a little noise can sometimes be very loudindeed!"
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-20-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
            "Hash rate headaches (2014-05-20)"
          )
        )
      )
    ];
  }
  var blogPost_201405240000 = new BlogPost(
    "Reach for the ear defenders!",
    "2014-05-24",
    "/blog/2014-05-24-0000",
    blogArticle_201405240000
  );

  // src/blog/2014-06-05-0000/2014-06-05-0000.js
  function blogArticle_201406050000() {
    return [
      h(
        "p",
        {},
        "About 3 months ago I looked at how the BTC price seems to spike up approximately every 7 months.  It seems to be happening again!"
      ),
      h(
        "p",
        {},
        "Over the last couple of weeks the BTC price has reversed its earlier falls and has yet again started to jump back up again.  The timing is pretty-much consistent with previous spikes."
      ),
      h("p", {}, "Let's look at the graph (plotted on a logarithmic Y axis):"),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-05-0000/BTC-price.png" }),
        h("figcaption", {}, "Chart of BTC price over time")
      ),
      h(
        "p",
        {},
        "The trend of high points in the graph (red line) shows another ",
        h(
          "a",
          { href: "/blog/2014-03-09-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-03-09-0000") },
          "theme park ride"
        ),
        ". Like any good thrill ride we see regular highs and lows; here the peaks are anywhere between 212 days and 235 days, but in general the later ones have been nearer 235 days.  235 days from the last high would be 2014-07-24.  It will be interesting to see if the current rises follow the same trend and if that's near our next destination."
      ),
      h(
        "p",
        {},
        "While our roller coaster may be an entertaining ride for many, the gentle slopes of the low point trend (green line) form an intriguingly steady path. Perhaps it's this trend that should be attracting far more attention?"
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-03-12-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-03-12-0000") },
            "Strange spikes in the Bitcoin price (2014-03-12)"
          )
        )
      )
    ];
  }
  var blogPost_201406050000 = new BlogPost(
    "Strange spikes revisited!",
    "2014-06-05",
    "/blog/2014-06-05-0000",
    blogArticle_201406050000
  );

  // src/blog/2014-06-10-0000/2014-06-10-0000.js
  function blogArticle_201406100000() {
    return [
      h(
        "p",
        {},
        "Bitcoin difficulty and hash rate statistics should be considered an illness.  The symptoms include anxiety, depression, sleeplessness and paranoia.  Bitcoin miners follow their every movement, rejoicing at smaller-than-expected difficulty changes and collectively dismaying when things go the other way.  Authoritative-looking charts have people puzzling about why things are so erratic and chasing non-existent mining conspiracies. The truth is out there..."
      ),
      h("h2", {}, "Difficulty charts"),
      h(
        "p",
        {},
        "When we start to think about mining, difficulty charts are not far away. Most of them are presented something like this:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-10-0000/6m-hash-rate-linear.png" }),
        h("figcaption", {}, "Bitcoin hash rate for the last 6 months (June 2014) on a linear scale")
      ),
      h(
        "p",
        {},
        "This chart shows the last 6 months of daily hash rates and the rising difficulty.  It also shows a baseline trend line but we'll look at that a little later."
      ),
      h(
        "p",
        {},
        `Aside from that inexorable increase in difficulty and the cries of woe from miners watching it, the most striking characteristic is that way it's getting progressively much more "spiky"!  Look at how smooth it used to look?  In fact this assessment is actually just plain wrong; if you were to look at 6 months of data starting 3 months earlier then that nice "smooth" part would end up looking just as bad as the most recent data.  The problem is a question of scale; the variations in the hash rate become numerically larger as the overall hash rate increases.`
      ),
      h(
        "p",
        {},
        "When confronted with this sort of data, many statisticians switch to logarithmic graphs instead of linear ones because log charts show the magnitude differences rather than absolute differences.  Here's the same data on a log chart:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-10-0000/6m-hash-rate-log.png" }),
        h("figcaption", {}, "Bitcoin hash rate for the last 6 months (June 2014) on a logarithmic scale")
      ),
      h(
        "p",
        {},
        "Notice how the spikes in the blue hash rate look pretty much the same all the way across now?  If you're observant you might argue that the ones on the left are slightly less spiky, but that's because the slope of the graph is steeper there.  Even there though it's clear that the statistical noise on a day-to-day basis is actually much larger than the overall trend.  That overall trend shows that hashing rate, and thus the difficulty, increases are slowing down for now (and probably for the foreseeable future).  The slowdown wasn't evident on the linear scale graph and so we can see another advantage of logarithmic scale graphs."
      ),
      h("h2", {}, "Calculating a baseline"),
      h(
        "p",
        {},
        `Most Bitcoin miners tend to think in terms of "difficulty" because it's what determines the complexity of any mining.  On both of the graphs we've just looked at, though, the difficulty is clearly lagging behind the hash rate.  The problem is that it's set retrospectively, and set at a level that would make the preceding 2016 blocks take exactly 14 days to find.  This means that the difficulty lags around 5.5 to 7 days behind the actual hash rate even when it's changed.  If we want a real baseline to think about hash rates we need something more up-to-date.`
      ),
      h(
        "p",
        {},
        `In both of the charts we've just seen there is a baseline trace, and that trace represents "something more up-to-date".  The baseline is calculated by looking at the days where the difficulty changes and taking the square root of the ratio of a new to previous difficulty level and then multiplying it by the new difficulty.  In-between these fixed points is an interpolation that assumes a steady percentage growth rate between them.`
      ),
      h(
        "p",
        {},
        `This particular baseline isn't perfect because it has no way to account for statistical noise in the hashing rate (see "`,
        h(
          "a",
          { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
          "Hash rate headaches"
        ),
        '") but it turns out to be a surprisingly effective estimate nonetheless.'
      ),
      h("h2", {}, "Checking the baseline"),
      h(
        "p",
        {},
        'Visually our baseline looks pretty reasonable.  We know that even if the hash rate was constant the difficulty would change as a result of random noise (see "',
        h(
          "a",
          { href: "/blog/2014-05-24-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-24-0000") },
          "Reach for the ear defenders"
        ),
        `").  The question is what does our noise profile look like if we subtract out the baseline hash rate estimate?  This should approximately follow Bitcoin's Poisson process noise profile and should oscillate about zero.  Here's what it actually looks like for the last 12 months:`
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-10-0000/12m-hash-rate-variation.png" }),
        h("figcaption", {}, "12 month Bitcoin hash rate variations (June 2014)")
      ),
      h(
        "p",
        {},
        "Comparing this with what simulations suggest for 24 hour variations this looks remarkably consistent.  This pretty-much suggests that there has been very little if anything unusual happening over the last 12 months and that hashing capacity has been reasonably steadily added throughout.  One final check though is to look at the probability histogram for the variations about our baseline:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-10-0000/12m-hash-rate-variation-probability.png" }),
        h("figcaption", {}, "12 month Bitcoin mining hash rate variation probability histogram (June 2014)")
      ),
      h(
        "p",
        {},
        "While it's not perfect, it has just the sort of probability distribution we would expect to see."
      ),
      h("h2", {}, "What have we gained?"),
      h(
        "p",
        {},
        "We started out trying to understand how key statistics were presented.  We've seen how linear charts can be highly misleading.  By devising a way to estimate the hash rate baseline, we've been able to go one step further and see just how much the day to day hash rate estimates will oscillate quite wildly.  We can now be confident that even 20% swings from the estimate are surprisingly likely, and that day-to-day swings can be even larger!"
      ),
      h(
        "p",
        {},
        "The gods of statistics didn't want us to worry about what happens in the course of hour or even a few days; those numbers, tantalizing as they may seem, are largely meaningless.  They are the lies among the truth that only becomes apparent over a much longer timescale."
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-24-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-24-0000") },
            "Reach for the ear defenders! (2014-05-24)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
            "Hash rate headaches (2014-05-20)"
          )
        )
      )
    ];
  }
  var blogPost_201406100000 = new BlogPost(
    "Lies, damned lies and Bitcoin difficulties",
    "2014-06-10",
    "/blog/2014-06-10-0000",
    blogArticle_201406100000
  );

  // src/blog/2014-06-15-0000/2014-06-15-0000.js
  function blogArticle_201406150000() {
    return [
      h(
        "p",
        {},
        "2016 blocks is the magic number that corresponds to each change in difficulty within the Bitcoin network.  Nominally it should take 14 days to find this many blocks, but how long does it really take?"
      ),
      h("h2", {}, "The simple case"),
      h(
        "p",
        {},
        'In an earlier article, "',
        h(
          "a",
          { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
          "Hash rate headaches"
        ),
        '", I looked at the probabilities of finding a particular number of blocks in a given time.  This time around the goal is to work out how long it takes to find 2016 blocks.'
      ),
      h(
        "p",
        {},
        "To work out the behaviour I wrote a Monte-Carlo simulation that models the behaviour of mining during a 2016 block period.  The simulation was run 10 million times in each run shown here in order to get good smoothing of the data."
      ),
      h(
        "p",
        {},
        "Let's start with the simple cases where the global hashing rate isn't changing:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-15-0000/find2016_0.png" }),
        h("figcaption", {}, "Time to find 2016 Bitcoin blocks with 0% hash rate expansion")
      ),
      h(
        "p",
        {},
        "As we'd expect, the average time to find 2016 blocks is indeed 14 days.  We can see the effects of the " + h(
          "a",
          { href: "/blog/2014-05-24-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-24-0000") },
          "noise"
        ),
        "in the hashing design though and how once every 10 difficulty changes we'd be likely to see the time at +/- half a day (i.e. 13.5 days or less, or 14.5 days or more)."
      ),
      h("h2", {}, "Practical complexities"),
      h(
        "p",
        {},
        h(
          "a",
          { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
          "Previously"
        ),
        "I've talked about how Bitcoin hashing is a Poisson process.  @coinometrics pointed out on Twitter that things become more complex when the hashing rate is expanding because it then becomes a non-homogeneous (or inhomogeneous) Poisson process.  Towards the end of the difficulty change we're going to see blocks being found faster than at the start.  The observation is, of course, quite correct and the simulations here now account for that.  The assumption is that hashing capacity comes online at a steady exponentially expanding rate, so, say, the hashing capacity assumed at 5 days is larger than that at 4.9 days, irrespective of the number of blocks found."
      ),
      h(
        "p",
        {},
        `Another complication is that the current difficulty level doesn't really indicate the the actual hashing rate of the network even on the day it's first set. In the article, "`,
        h(
          "a",
          { href: "/blog/2014-06-10-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-65-10-0000") },
          "Lies, damned lies and Bitcoin difficulties"
        ),
        "I showed that a more accurate starting measure was to multiple the new difficulty by the square root of the difficulty increase.  The simulations account for this too."
      ),
      h(
        "p",
        {},
        "Let's see what happens when we have a 1% daily hashing rate expansion:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-15-0000/find2016_1.png" }),
        h("figcaption", {}, "Time to find 2016 Bitcoin blocks with 1% hash rate expansion")
      ),
      h(
        "p",
        {},
        "With a 1% daily expansion rate we now typically find our 2016 blocks after 12.37 days (a little under 12 days, 9 hours).  It also equates to a difficulty increase of 13.1%."
      ),
      h(
        "p",
        {},
        "Now let's look at a 2% daily hashing rate increase:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-15-0000/find2016_2.png" }),
        h("figcaption", {}, "Time to find 2016 Bitcoin blocks with 2% hash rate expansion")
      ),
      h(
        "p",
        {},
        "With a 2% daily expansion rate we now typically find our 2016 blocks after 11.19 days (a little over 11 days, 4.5 hours).  This equates to a difficulty increase of 24.8%."
      ),
      h(
        "p",
        {},
        "It's interesting to note that doubling the hashing rate expansion per day doesn't correspond to doubling the next difficulty change because we get to the next change quicker and thus compensate faster too."
      ),
      h(
        "p",
        {},
        "The numbers also have an interesting implication for the block reward halving dates though as the dates move closer all the time."
      ),
      h("h2", {}, "Putting it all together"),
      h(
        "p",
        {},
        "Here's a final chart.  This shows the 3 earlier charts superimposed on each other:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-15-0000/find2016_combined.png" }),
        h("figcaption", {}, "Time to find 2016 Bitcoin blocks with 0%, 1% and 2% hash rate expansions")
      ),
      h(
        "p",
        {},
        "It's worth noticing the effect of noise again.  The overlaps between the 2% and 1% expansion rate are pretty clear. When we see a difficulty change at 11.75 days are we really seeing the effect of 13.1% extra hashing capacity, 24.8%, or more likely somewhere inbetween? It could be even more divergent though!"
      ),
      h(
        "p",
        {},
        "Over the last few days there has been much discussion about the GHash.IO mining pool's hashing rate.  It clearly has a very substantial fraction but the error margins even across an entire 2016 block period are surprisingly large.  As ever Bitcoin statistics often lead to more questions than answers!"
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-06-10-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-06-10-0000") },
            "Lies, damned lies and Bitcoin difficulties (2014-06-10)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-24-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-24-0000") },
            "Reach for the ear defenders! (2014-05-24)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
            "Hash rate headaches (2014-05-20)"
          )
        )
      )
    ];
  }
  var blogPost_201406150000 = new BlogPost(
    "Finding 2016 blocks",
    "2014-06-15",
    "/blog/2014-06-15-0000",
    blogArticle_201406150000
  );

  // src/blog/2014-06-23-0000/2014-06-23-0000.js
  function blogArticle_201406230000() {
    return [
      h(
        "p",
        {},
        `Every so often a Bitcoin mining pool is reported to manage more than half of the Bitcoin hashing capacity, exposing the spectre of a so called "51% attack".  Ignoring the perceived threat though, can we really trust the statistics?  We've seen, previously, that Bitcoin mining statistics aren't quite as obvious as we might hope, so what do they look like in these cases?`
      ),
      h("h2", {}, "A day in the life of a 50% mining pool"),
      h(
        "p",
        {},
        "Let's look at what happens when a Bitcoin mining pool has 50% of the actual global hash rate and see what the estimated statistics look like for 24 hours.  We'll start by considering what happens when there's no expansion occurring in the network.  Here's what we find from a Monte Carlo simulation with 10M trials:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-23-0000/24hours0percent.png" }),
        h(
          "figcaption",
          {},
          "Mining pool with 50% of the Bitcoin network over 24 hours, assuming no network hash rate expansion"
        )
      ),
      h(
        "p",
        {},
        `One curious thing is to note that around the 50% level we see the cumulative statistics actually become a little "blocky" but that's because there turn out to be a limited number of values that can occur.`
      ),
      h(
        "p",
        {},
        "With 50% of the hashing capacity we do indeed see an average rate where 50% of the blocks are found by our mining pool, but one day in ten we'll see the network hashing rate for the pool at 43.1% and less, or 56.8% or more.  In practice if we're not seeing more than 50% every other day then the pool we're looking at probably doesn't really have at least half of the network hash rate; an odd day above is really not as interesting."
      ),
      h(
        "p",
        {},
        "Let's see if it makes much difference if our network hash rate is expanding at 2% per day:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-23-0000/24hours2percent.png" }),
        h(
          "figcaption",
          {},
          "Mining pool with 50% of the Bitcoin network over 24 hours, assuming a 2% network hash rate expansion"
        )
      ),
      h(
        "p",
        {},
        `The 2% per day hash rate expansion is pretty extreme, corresponding to a difficulty change of 24.8% on average, but this doesn't actually make much difference.  Our "once in ten days" metric now has ranges of 43.5% or less and 56.4% and greater.`
      ),
      h("h2", {}, "50% for 2016 blocks"),
      h(
        "p",
        {},
        "We've seen what happens on a daily basis, but what happens when we look at the 2016 block difficulty change?  Here's the simulation for the network when no expansion is occuring:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-23-0000/2016blocks0percentgrowth.png" }),
        h(
          "figcaption",
          {},
          "[2016 Bitcoin blocks for a pool having 50% of the network and with no network expansion"
        )
      ),
      h(
        "p",
        {},
        "Even over 2016 blocks (14 days on average) we can see quite a lot of variability in the measured hash rates.  One difficulty change in five we'll see a discrepancy in the estimated pool hash rate of more than +/- 1.4%."
      ),
      h("h2", {}, "Final thoughts"),
      h(
        "p",
        {},
        "As with many of the Bitcoin statistics we've seen, things are rarely as clear-cut as they first appear.  We really need to see more than 55%, and probably close to 60%, of the hash rate being assigned to a pool within any 24 hour period before that alone is sufficient to say that the pool has achieved 50% of the network hash rate."
      ),
      h(
        "p",
        {},
        "None of this diminishes the potential risk associated with a single owner gaining a majority of the network hashing, but as we've seen before, we should be wary that daily statistics alone aren't enough to show that this level has been reached."
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-06-10-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-06-10-0000") },
            "Lies, damned lies and Bitcoin difficulties (2014-06-10)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-24-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-24-0000") },
            "Reach for the ear defenders! (2014-05-24)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
            "Hash rate headaches (2014-05-20)"
          )
        )
      )
    ];
  }
  var blogPost_201406230000 = new BlogPost(
    "51% of the network",
    "2014-06-23",
    "/blog/2014-06-23-0000",
    blogArticle_201406230000
  );

  // src/blog/2014-06-30-0000/2014-06-30-0000.js
  function blogArticle_201406300000() {
    return [
      h(
        "p",
        {},
        "What's the best way to get a return when we mine Bitcoins?  Should we mine on our own, mine with a small pool or mine with a large pool?  How much difference does it really make?"
      ),
      h(
        "p",
        {},
        "Whether we want to be a gambler or an investor is really a question of how much risk we're prepared to take, but what are those risks and what are the odds of success?"
      ),
      h("h2", {}, "Starting thoughts"),
      h(
        "p",
        {},
        "Before we can look at the odds of getting a particular return we need to establish a few starting conditions.  Let's assume that we're planning to mine using hardware that, at the outset of our mining, is able to hash at 0.01% of the total global hash rate.  If we have 120 PH/s of hashing then that means that we have 12 TH/s of hashing hardware, but if that global rate was 600 PH/s then we'd need 60 TH/s.  The actual numbers don't matter though, just the percentages."
      ),
      h(
        "p",
        {},
        "We're going to assume that the network is expanding at 1% per day.  For most of 2014 it has been above this but the trend is generally downwards and we need to assume something.  At 1% per day then over 6 months (approximately 183 days) we'd see the global hash rate increase by a factor of 6.177 by the end, so our 0.01% of the network is only 0.0016188% after the 6 months.  We're not expecting to add new capacity as we go though, so we only have the hardware that we start with."
      ),
      h(
        "p",
        {},
        'Bitcoin mining is highly erratic (see "',
        h(
          "a",
          { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
          "Hash rate headaches"
        ),
        `") so it's not easy to calculate how our mining will progress so instead I built a Monte Carlo simulator.  The results presented here all come from that simulation with 10M simulations of each scenario to ensure that the data is well smoothed.`
      ),
      h("h2", {}, "Solo mining"),
      h(
        "p",
        {},
        "Let's start with the simplest case.  We're going to assume that we'll use all of our hashing capacity to mine for blocks on our own.  What might we expect?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-30-0000/solo-mine.png" }),
        h("figcaption", {}, "Solo mining with 0.01% of the Bitcoin hash rate for 15 difficulty changes")
      ),
      h(
        "p",
        {},
        "The chart shows 15 difficulty changes (6 months).  It plots the cumulative probability of achieving a particular BTC reward.  50% of miners will achieve 32 BTC or less at the end of the 6 months, while 5% will receive nothing at all!  It's not possible to get smaller amounts in this time period by solo mining so that's why there's a discontinuity in the graph at the start.  10% of miners will actually receive 65 BTC or more."
      ),
      h(
        "p",
        {},
        "The gambler in us might be attracted to the potential for high rewards; that part of us that wants to be an investor though is probably going to look at this graph in horror!"
      ),
      h("h2", {}, "Mining with a pool"),
      h(
        "p",
        {},
        "The easiest way to mitigate some of the risk is to join a mining pool.  Let's ignore pool fees or anything that doesn't just give an equal share for hashing capacity provided to the pool.  What might the same hardware achieve when run this way?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-30-0000/small-pool-mine.png" }),
        h("figcaption", {}, "Bitcoin mining reward with 10% of a pool that has 0.1% of the total network hash rate")
      ),
      h(
        "p",
        {},
        "Our gambler self may be disappointed to see that the potentially large payouts have vanished; 10% of miners will achieve 44 BTC or better.  Our, more rational, investor self is probably much happier though as only 10% of miners achieve less than 26 BTC.  The simple exercise of merging with a pool that has 10x the total mining capacity has made a huge difference to the variance of the mining rewards.  Our 50% reward point is higher too (the chart shows 48% to keep things simpler)!"
      ),
      h("h2", {}, "What are the effects of using larger mining pools?"),
      h(
        "p",
        {},
        "Now that we can see the reduction in variance from using a mining pool we really need to ask questions about just how much does the mining pool size change the statistics.  In order to do that we need to consider a few different ways to deploy our hardware."
      ),
      h(
        "p",
        {},
        "The following graph shows a much narrower span of BTC rewards.  It also shows the effects of mining as part of a pool controlling 0.1%, 1%, 10%, 25% and 50% of the global hash rate.  That last one is sure to be controversial as a pool with 50% of the hash rate is deemed to pose a potentially serious risk, but rational miners have been keen to participate in such pools.  Just how good are the reasons to do so?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-06-30-0000/mining-comparison.png" }),
        h("figcaption", {}, "Comparison of Bitcoin mining rewards for different pool sizes")
      ),
      h(
        "p",
        {},
        "The first things to notice are just how bad the solo mining and 10% membership of 0.1% pool now look!  The larger pools are definitely more attractive to anyone seeking predictable returns."
      ),
      h("h2", {}, "Mining pools are here to stay?"),
      h(
        "p",
        {},
        "In a simpler world the Bitcoin mining network might only be expanding very slowly and miners could attempt to allow time to smooth out the effects of mining variance.  In practice though, as the network expands and the ever-increasing difficulty consumes the usefulness of any current hardware, then best known way to avoid the vagaries of random mining behaviour is to use large blocks of co-ordinated mining.  Solo mining and mining in small pools is a strategy for gamblers, not investors."
      ),
      h(
        "p",
        {},
        "Arguments may rage regarding the risks posed by large mining pools and their tendency towards centralizing our supposedly decentralized network, but it seems very unlikely that they will be disappearing any time soon.  Any proposal to remove them will have to address the issue of variance if it is to gain any sort of widespread acceptance."
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-06-23-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-06-23-0000") },
            "51% of the network (2014-06-23)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
            "Hash rate headaches (2014-05-20)"
          )
        )
      )
    ];
  }
  var blogPost_201406300000 = new BlogPost(
    "The gambler's guide to Bitcoin mining",
    "2014-06-30",
    "/blog/2014-06-30-0000",
    blogArticle_201406300000
  );

  // src/blog/2014-11-02-0000/2014-11-02-0000.js
  function blogArticle_201411020000() {
    return [
      h(
        "p",
        {},
        "The general wisdom seems to be that the Bitcoin network can currently sustain 7 transactions per second.  Bitcoin advocates often worry that this will be a limiting factor when credit card processing networks can handle several orders of magnitude more transactions in the same time, but what are the actual statistics related to Bitcoin transaction processing?  Our Bitcoin ",
        h(
          "a",
          { href: "/blog/2014-03-09-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-03-09-0000") },
          "mine train"
        ),
        " may not be seeing its hashing engines running away quite as much as they were earlier this year, but are we heading for other problems instead?"
      ),
      h("h2", {}, "Bitcoin transactions per day"),
      h(
        "p",
        {},
        "Before we can really think about Bitcoin transaction processing we need to look at how its transaction processing has evolved over time.  Let's start by looking at the numbers of transactions per day for approximately the last 4 years:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-02-0000/trans-per-day-linear.png" }),
        h("figcaption", {}, "Number of Bitcoin transactions per day (linear chart)")
      ),
      h(
        "p",
        {},
        "As with all of our Bitcoin rollercoaster rides there are highs and lows, but the trend is generally up over time.  It may not be the sort of exponential growth seen with the global hash rate but it's hard to argue that the number of transactions hasn't been going up.  It's looking much more erratic as we move to the right but we've seen that sort of thing before and it's usually because the percentage swings are the same but the larger numbers makes things look worse.  One solution is to look at this on a log scale:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-02-0000/trans-per-day-log.png" }),
        h("figcaption", {}, "Number of Bitcoin transactions per day (log chart)")
      ),
      h(
        "p",
        {},
        "With this view the growth may not look quite as impressive but we can see that the daily variations really aren't anything new."
      ),
      h(
        "p",
        {},
        "What else can we see?  Well we're not really getting to more than about 80k transactions per day right now, or just under 1 per second.  On the surface it would seem that we ought to be quite some way from hitting any limits."
      ),
      h("h2", {}, "A quick aside: The Bitcoin network gets tired on Sundays?"),
      h(
        "p",
        {},
        "Did you notice that the noise over the last year looks surprisingly periodic?  Zooming in on this we can see that's surprisingly consistent!"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-02-0000/sunday-trans.png" }),
        h("figcaption", {}, "Periodic variations in the Bitcoin transaction processing rate with dips on Sundays")
      ),
      h(
        "p",
        {},
        "The horizontal axis grid lines correlate to Sundays.  For some reason the Bitcoin transaction processing network doesn't seem to get used as much on Sundays; it's down about 20% on the rest of the week?  No I don't know why this happens either!  Perhaps it gets tired and needs a nap? :-)  The trend is evident all the way back to fairly early in 2013 but has become much more pronounced in 2014."
      ),
      h("h2", {}, "Block statistics"),
      h(
        "p",
        {},
        "We've looked at how many transactions are processed, but there's another really important characteristic.  We need to consider how large our blocks are.  How do things actually look when we look at block sizes averaged over individual days?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-02-0000/avg-block-size-linear.png" }),
        h("figcaption", {}, "Average Bitcoin block size over the last 16 months (linear chart)")
      ),
      h(
        "p",
        {},
        "In the interests of consistency let's see that on a log scale too:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-02-0000/avg-block-size-log.png" }),
        h("figcaption", {}, "Average Bitcoin block size over the last 16 months (log chart)")
      ),
      h(
        "p",
        {},
        "Something definitely doesn't appear to add up!"
      ),
      h(
        "p",
        {},
        "That black (linear) trend line may not be perfect but it's not a bad approximation.  It shows that our average block size has gone from about 0.11 Mbytes to 0.275 in that same 16 months.  That's almost exactly 2x in the last 12 months.  The problem, though, is that instead of being more than 7x away from our limits as the supposed 7 TPS number might suggest, we're actually only about 3.6x away (1/0.275)."
      ),
      h(
        "p",
        {},
        "Something clearly doesn't scale the way we expected.  Let's look at the average block size compared with the number of transactions per day:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-02-0000/blksize-vs-transactions.png" }),
        h("figcaption", {}, "Comparison of average block size and transaction rate per day over the last 2 years")
      ),
      h(
        "p",
        {},
        "Things start out pretty well correlated, but there does seem to be a trend where the block size is increasing a little faster than the number of transactions.  This indicates that our average transactions are getting larger over time.  This shouldn't really surprise us too much as we'd probably expect things to get more complex over time.  We're now seeing multi-sig transactions and ones with very large numbers of inputs and outputs, all of which makes the individual transactions larger.  That claim of 7 TPS is looking more fragile all the time."
      ),
      h("h2", {}, "What is the TPS rate that we can actually get?"),
      h(
        "p",
        {},
        "Given that we know how many transactions take place per day and we know how large the average block size is, we can now work out the maximum TPS rate that we might have achieved on any given day (with the same mix of transactions):"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-02-0000/sustained-trans-per-second-linear.png" }),
        h("figcaption", {}, "Sustainable transactions per second rate (linear chart)")
      ),
      h(
        "p",
        {},
        "Here's the log version too:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-02-0000/sustained-trans-per-second-log.png" }),
        h("figcaption", {}, "Sustainable transactions per second rate (log chart)")
      ),
      h(
        "p",
        {},
        "Unlike our other graphs the log chart reduces the apparent volatility of the left side of the chart this time, but the message is pretty clear; the last time we could hit 7 TPS was sometime in 2011.  Right now we're lucky to be able to achieve much over 3.2 TPS; it also means that we're at about 30% of the total capacity of the network!  In fact on several individual days we were at 40% of the total capacity of the network."
      ),
      h(
        "p",
        {},
        "For most engineers this will start to sound alarm bells.  We're not talking about the peak usage being 40% on those days, but the average usage.  Once we start to hit 100% even for relatively short times then that will start to affect the speed with which transactions find their way into the blockchain, especially as the ",
        h(
          "a",
          { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
          "10 minutes between blocks"
        ),
        " is only a mean, not a guarantee."
      ),
      h("h2", {}, "A final thought"),
      h(
        "p",
        {},
        `There is one interesting aspect to finding that blocks might soon become congested.  With congestion miners will actually have a significant incentive to pick transactions with higher fees associated, as opposed to just taking all available transactions.  The specific "tragedy of the commons" that says it's better to take any minor reward than to hold out for a better one may be overturned!  Block scarcity may actually prove to be the characteristic that helps miners finally achieve revenues from fees instead of block rewards.  That, however, seems like a story for another day...`
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-06-15-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-06-15-0000") },
            "Finding 2016 blocks (2014-06-15)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
            "Hash rate headaches (2014-05-20)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-03-09-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-03-09-0000") },
            "The Bitcoin runaway mine train (2014-03-09)"
          )
        )
      )
    ];
  }
  var blogPost_201411020000 = new BlogPost(
    "7 transactions per second? Really?",
    "2014-11-02",
    "/blog/2014-11-02-0000",
    blogArticle_201411020000
  );

  // src/blog/2014-11-11-0000/2014-11-11-0000.js
  function blogArticle_201411110000() {
    return [
      h(
        "p",
        {},
        "The Bitcoin network is currently running at around 30% of its maximum capacity, but what does that actually mean to its users?  Should we care?  What about when we reach 50%, or 90%?  When roads start to get full of cars they start to get congested, when large numbers of visitors enter or exit a building everyone slows down and takes longer to set where they want, but what happens with Bitcoin?"
      ),
      h("h2", {}, "Bitcoin transaction processing"),
      h(
        "p",
        {},
        `Bitcoin mining (and therefore transaction processing) is what's known as a Non-Homogenous (or Inhomogeneous) Poisson Process.  In the article, "`,
        h(
          "a",
          { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
          "Hash rate headaches"
        ),
        `" we saw how this actually works and that our nominal 10 minute spacing between Bitcoin blocks isn't quite as straightforward as we might hope.  For transaction processing though things get even more complicated.  Now we have transactions that themselves appear somewhat randomly; in fact they will typically follow something like a Poisson Process distribution too.`
      ),
      h(
        "p",
        {},
        'In the case of Bitcoin the transactions do have some other biases.  We saw in "',
        h(
          "a",
          { href: "/blog/2014-11-02-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-11-02-0000") },
          "7 transactions per second?  Really?"
        ),
        '" that Sundays are usually quieter than other days, while Bitcoin transactions can also be perturbed by network delays, orphan races and mining fees that might incentivize some transactions to be processed quicker than others.  None of those effects really come into play though when we have a very small number of transactions so we could actually model the behaviour and see what happens.'
      ),
      h(
        "p",
        {},
        "We also saw that the current Bitcoin network has a peak capacity of a little under 3.5 transactions per second (arguably closer to 3.2 at times).  We can use that information to build a Monte Carlo simulation that will predict how long it takes to get transactions confirmed."
      ),
      h("h2", {}, "Monte Carlo simulation"),
      h(
        "p",
        {},
        "For the purposes of this article I constructed just such a Monte Carlo simulation that assumed a peak of 3.5 TPS and that would simulate a mining Poisson Process with a mean block finding time of 10 minutes and a transaction arrival Poisson Process with a mean that was given by a percentage network load.  For example a 10% load would be 0.35 TPS, or 30,240 transactions per day.  In order to get good data the simulation was set to run 100,000 weeks of mining at 11 different loading levels.  Each week started from scratch and with zero transactions pending."
      ),
      h(
        "p",
        {},
        "The simulator ignores mining fees and assumed that transactions are processed first-come, first-served; this actually turns out to be a reasonably accurate prediction for most current transactions that include a fee.  It also ignores network propagation delays (how long it takes for a transaction to be seen by all mining nodes) but that will really just add a fairly small starting delay of up to a few seconds per transaction and so this is probably ok too (see: ",
        h(
          "a",
          { href: "http://bitcoinstats.com/network/propagation" },
          "http://bitcoinstats.com/network/propagation"
        ),
        ").  It does mean that the data is probably a little too optimistic about how quickly transactions can be mined.  Finally it assumes that the mining network capacity is constant and neither increasing, nor decreasing in capacity.  When things are increasing then blocks will be found slightly quicker, but the effect has become quite small over the last few months."
      ),
      h(
        "p",
        {},
        "Let's start by looking at what happens when there are almost no transactions being announced.  This should represent an almost perfect scenario because every transaction can immediately go into the next available block.  The network load for this example is 0.1%, or 0.0035 TPS."
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-11-0000/first-conf-0-linear.png" }),
        h(
          "figcaption",
          {},
          "Probabilities for time to a first block confirmation with the Bitcoin network loaded at 0.1% (linear scale)"
        )
      ),
      h(
        "p",
        {},
        "We have four traces here.  The probability traces show the probability of a transaction being confirmed at a given time after it was submitted, while the other show the cumulative probability; i.e. the probability that a transaction will have received its first confirmation at or before a given time."
      ),
      h(
        "p",
        {},
        "You might ask why there are 2 traces for each and that's a very good question!  The solid line version are the results obtained from the simulation (actually 1 million simulations), while those superimposed on top are the results of a theoretical model.  The theoretical model, gives probabilities for a single transaction arriving at the network."
      ),
      h(
        "p",
        {},
        "We can see that 50% of transactions are confirmed within 415 seconds (a little under 7 minutes).  Equally though, 10% have not had their first confirmation after 1380 second (23 minutes), and 1% are still unconfirmed after 2760 minutes (46 minutes).  This may come as a surprise to people, but no amount of fee changes, or network improvements will change these basic numbers!"
      ),
      h(
        "p",
        {},
        "In the past we've tended to make use of graphs plotted on a logarithmic axis and these ones are no exception!  Here's the same graph with a logarithmic time (horizontal) axis:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-11-0000/first-conf-0-log.png" }),
        h(
          "figcaption",
          {},
          "Probabilities for time to a first block confirmation with the Bitcoin network loaded at 0.1% (log scale"
        )
      ),
      h(
        "p",
        {},
        'The logarithmic scale compresses the "tail" to the right so we can compare things more easily later.  The cumulative probability curve looks different too, and is somewhat easier to work with on this sort of scale.'
      ),
      h(
        "p",
        {},
        'In this version we can also see a little of the "noise" that the simulation has when compared with the theoretical model (the red trace at times under 10 seconds).'
      ),
      h("h2", {}, "What happens with more loading?"),
      h(
        "p",
        {},
        "Things become much more interesting when we start to consider some reasonable loading on the network.  As of early November 2014 the network load is around 30%.  If we use the simple Monte Carlo simulation we can model this pretty easily."
      ),
      h(
        "p",
        {},
        "Let's look at network loading from 0.1% all the way to 100%:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-11-0000/first-conf-0-100.png" }),
        h(
          "figcaption",
          {},
          "Probabilities for time to a first block confirmation with the Bitcoin network at various load levels (log scale)"
        )
      ),
      h(
        "p",
        {},
        "Probably the first thing to realize here is that the traces for 0.1%, 10% and 20% are so similar that the 20% line hides the other two.  The 30% line is only slightly different.  This tells us that up to now we've notreally seen any real effects as a result of transaction rate.  At 30% loading we'll still see half of all transactions confirmed within 434 seconds, as opposed to 415 for 0.1%.  That gap really starts to widen at 40%, however, where it now takes 466 seconds and at 80% we're up at 1109 seconds (18.5 minutes)!  At 100% we're up at a huge 7744 seconds (more than 2 hours)!  If the network were ever to reach this 100% level, though, the problems would be much worse as 10% of all transactions would still not have received a confirmation after 22800 seconds (6.3 hours)."
      ),
      h("h2", {}, "Mining fees will save us?"),
      h(
        "p",
        {},
        "The simulations are pretty simplistic because they assume all transactions are processed in the order they arrive.  There's no attempt to simulate the effect of fees, but the first thing to recognize is that the 0.1% loading case (and indeed almost everything up to 30%) pretty much wouldn't care anyway.  In these situations there's little to no congestion so fee-base reordering of transactions won't make any real difference.  As the network gets congested though then fees can start to have an impact."
      ),
      h(
        "p",
        {},
        "Once we start to see full blocks (and we have been starting to see these in the last few weeks) then fees should decide whether a transaction is in the next block or may be delayed to one after that.  Statistically that will mean that blocks with higher fees, or that for other reasons are deemed to have high value to the network, will follow curves closer to those for a lightly loaded system as we've seen so far.  It also means that those with low fees will actually see even worse delays than the simple model predicts."
      ),
      h(
        "p",
        {},
        `No matter how much the fee structures are changed, however, unless the speed of finding blocks is increased then we're pretty-much stuck with the characteristics that have been present for the last 5+ years.  For example, the "floating fees" change coming in the new Bitcoin Core software won't improve anyone's confirmation times beyond a few seconds, but fee-based prioritization will allow anyone willing to pay to keep their current confirmation behaviour.  Similarly making the blocks larger won't improve confirmation times other than by moving us to the curves for a less congested network.`
      ),
      h("h2", {}, "Rewards for a Bitcoin miner?"),
      h(
        "p",
        {},
        "While less than ideal for users of Bitcoin, congestion of the network does have a potentially positive impact for one group: Miners.  As block space becomes scarce, users of the network will have to attach larger fees to continue to see confirmation times of the order they are used to.  When fees increase then miners reap the reward."
      ),
      h(
        "p",
        {},
        `When block space is readily available, miners suffer from a "tragedy of the commons" problem in which the only rational behaviour is to accept all transactions, no matter how small the fee.  With scarcity, however, there's suddenly a competitive market for block space.  Those paying fees may not appreciate the extra costs, but a transition to a system that allows mining fees to become a larger fraction of mining income is actually a good thing for the long term security of the network.  Increased fees would go some way to offsetting the losses that miners will see at the next block reward halving to 12.5 BTC per block in 2016.`
      ),
      h("h2", {}, "Consequences"),
      h(
        "p",
        {},
        'If the network becomes more congested and fees increase then this will inevitably have an interesting impact on "spam" or low value transactions.  They may well start to find themselves priced out of the blockchain.  This may well also be a trigger for the use of something like sidechains.'
      ),
      h(
        "p",
        {},
        "One thing is clear though!  Anyone looking closely at transactions on the network can probably see the signs of those tail lights coming on ahead.  Unless something happens quickly, it looks like we're going to be slowing down pretty soon."
      ),
      h("hr", {}),
      h("h2", {}, "Source code"),
      h(
        "p",
        {},
        "This article was written with the help of data from a C language simulation.  The data was rendered into charts using Excel.  The source code can be found on github: ",
        h(
          "a",
          { href: "https://github.com/dave-hudson/bitcoin-traffic-bulletin" },
          "https://github.com/dave-hudson/bitcoin-traffic-bulletin"
        )
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-11-02-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-11-02-0000") },
            "7 transactions per second?  Really? (2014-11-02)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-06-15-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-06-15-0000") },
            "Finding 2016 blocks (2014-06-15)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-20-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
            "Hash rate headaches (2014-05-20)"
          )
        )
      )
    ];
  }
  var blogPost_201411110000 = new BlogPost(
    "Bitcoin traffic bulletin",
    "2014-11-11",
    "/blog/2014-11-11-0000",
    blogArticle_201411110000
  );

  // src/blog/2014-11-12-0000/2014-11-12-0000.js
  function blogArticle_201411120000() {
    return [
      h(
        "p",
        {},
        "Bitcoin is often touted as having substantially lower fees associated with using it than most other financial systems, but fees and costs are very different things.  The reality of things in the Bitcoin ecosystem is rarely simple, and this one is no exception.  What then are the actual numbers, where are they heading and what are the consequences?"
      ),
      h("h2", {}, "Transaction fees"),
      h(
        "p",
        {},
        `Probably the biggest challenge in looking at the costs of transactions is to work out what that actually means.  For anyone sending BTC the obvious "cost" is the transaction fee, so let's look at that:`
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-12-0000/fee-per-trans-linear.png" }),
        h("figcaption", {}, "Fees per transaction (linear scale)")
      ),
      h(
        "p",
        {},
        "The chart shows the fee per transaction for the last 4 years, and shows that that cost is in BTC and what that converted to in USD. The USD trace is really hard to follow early on though so let's look at this on a logarithmic scale:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-12-0000/fee-per-trans-log.png" }),
        h("figcaption", {}, "Fees per transaction (log scale)")
      ),
      h(
        "p",
        {},
        "Certainly these numbers would appear to back up the claim that Bitcoin transactions are really inexpensive!  BTC-denominated fees have actually steadily fallen for most of the last 4 years and are now at about 0.00015 BTC per transaction.  As long as we're talking about transactions involving, say, 0.1 BTC then the fees have pretty-much always been less than 1%, and are now more like 0.15%!"
      ),
      h(
        "p",
        {},
        `This is where things start to become a little interesting though.  The fee is primarily concerned with ensuring a minimum charge to avoid the network relaying "dust" transactions of tiny amounts, and also charging an amount per kbyte of data required to store the transaction in the blockchain.  What the fee doesn't take into account at all is the BTC value being transferred.`
      ),
      h(
        "p",
        {},
        `The fee structure means that BTC transfers are incredibly inexpensive for large transactions, but that small transfers can become much more expensive.  As we've seen before in "`,
        h(
          "a",
          { href: "/blog/2014-11-02-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-11-02-0000") },
          "7 transactions per second?  Really?"
        ),
        `", there's actually a hard limit on transaction space and the current mean transaction size limits the network to less than 3.5 transactions per second so the fee structure is designed to prevent people from consuming too much block space with low-value transactions (if anyone wants to do micropayments then they really need to aggregate them together).`
      ),
      h(
        "p",
        {},
        "The transaction rate limit also has an impact on the speed with which the network confirms transactions.  With more transactions the network becomes congested and confirmation times increase.  The only way to avoid increased confirmation times will be to incentivize miners to mine specific transactions, and the only way to do that is to add a larger fee to a transaction.  If the network starts to become congested then one natural consequence is that fees will start to increase too."
      ),
      h("h2", {}, "Rewards for Bitcoin miners"),
      h(
        "p",
        {},
        "The observation that fees are likely to increase may upset some users of the Bitcoin network, but is good news for the people actually doing the transaction processing: Bitcoin miners."
      ),
      h(
        "p",
        {},
        "Let's look at things from the perspective of a miner:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-12-0000/miners-reward.png" }),
        h("figcaption", {}, "Miners' reward (log scale)")
      ),
      h(
        "p",
        {},
        "The red line showing the amount of money received by miners in USD looks impressive.  Even with the decline in BTC price to late October the daily revenue for Bitcoin miners was at over $1.5M per day, but that revenue is paying for the installation and running of mining hardware.  If we guess that the average mining server is about 1.5 TH/s and the current network capacity is around 270 PH/s then that would suggest at least 180,000 mining units worldwide!  In reality there are probably in excess of 200,000."
      ),
      h(
        "p",
        {},
        "The 25 BTC reward for each block over the last 2 years has enabled industrial scale mining that was initially very profitable for miners and their suppliers, but has rapidly followed the same trends as other sorts of industrialized mining and has reached a point where the costs associated with mining almost consume the reward from selling what was mined.  Bitcoin mining has been heavily squeezed as a segment, especially with the decline in the USD price of Bitcoin during 2014.  The USD price (or other fiat currency conversion rates) is critically important because development, equipment manufacturing, hosting, and power are almost entirely paid for in fiat currency."
      ),
      h(
        "p",
        {},
        "The blue line shows the problem though.  This one is the BTC-denominated reward for miners and it's pretty obvious that most of the reward isn't changing.  Until late 2012 that was 50 BTC per block mined and then subsequently 25 BTC.  In 2016 this will drop to 12.5 BTC and that should be a concern to Bitcoin users too.  If we're very observant we notice that this blue trend is actually moving slightly down right now; as the network expansion slows then fewer blocks are mined each day (we get closer to 144 per day).  The other thing that is clear from the blue trend is that transaction fees are currently almost inconsequential to the viability of mining operations.  The total fees paid in a day are far less than even a single block reward."
      ),
      h("h2", {}, "Block reward halving"),
      h(
        "p",
        {},
        "We might look back at the reward halving in 2012 and observe that there wasn't much of a problem back then so why might there be in 2016, but in 2012 things worked out surprisingly well for the network.  The USD-denominated Bitcoin price doubled within a couple of months, while mining was not operating on the sorts of low margins that are common in 2014.  In 2016, unless there's a fortuitous price spike again, or without some additional source of revenue, industrialized mining will be placed under extreme pressures."
      ),
      h(
        "p",
        {},
        "Advocates of decentralization may like to think that this as a good thing, but there are two notable problems:"
      ),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          `If 50% of the network were to be unplugged then the amount of security for the network would drop by 50% and that would in turn risk an attack from that now "dark" hardware.  51% wouldn't be a just a theoretical problem anymore, there would be hardware sitting idle and able to launch just such an attack.`
        ),
        h(
          "li",
          {},
          "Smaller miners would feel the economic pinch much sooner than the larger miners.  The largest operations almost invariably have better economies of scale and can probably weather the loss of income better.  Our 50% sized network would now almost certainly end up in the hands of even fewer industrial miners."
        )
      ),
      h(
        "p",
        {},
        "One potential way to offset the reward change and keep miners incentivised would be to increase the transaction fees.  If the network were to move to being funded largely by fees rather than block rewards then the risks associated with block reward halving could be dramatically reduced."
      ),
      h("h2", {}, "What do transactions really cost?"),
      h(
        "p",
        {},
        "To understand how fees might become a significant incentive for miners we need to understand what the costs of transactions look like in terms of the current mining rewards.  There are a couple of ways we can think about this."
      ),
      h(
        "p",
        {},
        "Let's start with the obvious one: What is the cost to the whole network for an average transaction?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-12-0000/cost-per-trans-log.png" }),
        h("figcaption", {}, "Cost per Bitcoin transaction (log scale)")
      ),
      h(
        "p",
        {},
        "With this measure each transaction costs around 0.045 BTC, or approximately $17 at the end of October 2014.  The network is able to process more transactions per second than it is right now.  It's currently running at about 30% of its capacity and has doubled in the last 12 months.  If we presume that at the next reward halving we're at 60% of the capacity then we'll have twice as many transactions and thus the cost per transaction would be half of our current estimate: i.e. 0.0225 BTC.  In addition our block reward isn't going away completely, it's just halving, so we'd need fees to make up a shortfall of 0.01125 BTC per transaction."
      ),
      h("h2", {}, "Another approach?"),
      h(
        "p",
        {},
        "It seems pretty unrealistic to expect fees of that magnitude based on the current scheme for setting fee levels so perhaps we need to consider some other data.  Let's look at the transaction cost per Bitcoin.  This is a little tricky because transactions don't always make it easy to determine if a transaction output is going to someone else or is simply change being returned to the sender.  Blockchain.info's data does attempt to estimate the actual transaction volume though so we can try to use that here:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-11-12-0000/cost-per-btc-trans.png" }),
        h("figcaption", {}, "Estimated cost per BTC transferred (log scale)")
      ),
      h(
        "p",
        {},
        "The current cost to the network is approximately 0.03 BTC per BTC transferred.  If we were to see a doubling in transaction volumes as predicted earlier, and the transaction value therefore doubled, then the cost would drop to 0.015 BTC per BTC transferred.  As a result if miners were to be given a fee of 0.0075 BTC per BTC transferred then that would offset the losses at the next block reward halving.  The real question is whether a 0.75% transaction fee is something that the network is prepared to accept in order to preserve its security?"
      ),
      h(
        "p",
        {},
        "Of course this isn't the only way in which this particular problem might be averted, but one thing is clear: There will inevitably have to be changes to way in which mining is funded in order to keep things running smoothly."
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-11-02-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-11-02-0000") },
            "7 transactions per second?  Really? (2014-11-02)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-04-03-0000/", onClick: (e) => navigateEvent2(e, "/blog/2014-04-03-0000") },
            "The rewards for a Bitcoin miner (2014-04-03"
          )
        )
      )
    ];
  }
  var blogPost_201411120000 = new BlogPost(
    "The future of Bitcoin transaction fees?",
    "2014-11-12",
    "/blog/2014-11-12-0000",
    blogArticle_201411120000
  );

  // src/blog/2014-12-05-0000/2014-12-05-0000.js
  function blogArticle_201412050000() {
    return [
      h(
        "p",
        {},
        'A few days ago, Ittay Eyal published an intriguing paper, "',
        h(
          "a",
          { href: "http://hackingdistributed.com/2014/12/03/the-miners-dilemma/" },
          "The Miner's Dilemma"
        ),
        '".  It describes an attack where an open mining pool may be attacked using block withholding.  Given that most Bitcoin mining is managed by open mining pools then it seems like it ought to raise a few eyebrows (perhaps more than it has already).  Just how does this attack work though, who wins, who loses and by how much?'
      ),
      h("h2", {}, "Mining pools"),
      h(
        "p",
        {},
        "Before we can really talk about winners and losers we really need to take a simple look at how mining pools pay out to their miners."
      ),
      h(
        "p",
        {},
        `A mining pool needs to use a way to have its contributors demonstrate that they've been working to find Bitcoin blocks.  Given that Bitcoin is designed as a trust-less system this isn't a trivial problem.  The approach that is taken is to have miners submit "shares" where a share is defined to be a proof-of-work solution towards the Bitcoin block that the pool is trying to find but that doesn't necessarily meet the difficulty requirement for a full Bitcoin block.  Shares that don't meet the Bitcoin network's difficulty aren't actually useful (there's no concept of incrementally building a viable solution) but can be used to estimate how much work each pool contributor has performed.`
      ),
      h(
        "p",
        {},
        "Say, for example, the Bitcoin network has a difficulty of 40B (40,000,000,000) and we have a mining pool that has a nominal 1% of the network.  On average the contributors to our pool will find one full block 1.44 times per day (assuming the network isn't growing).  To work out who is contributing what, our mining pool might take submissions that are 100k (100,000) times less difficult (400,000 in this case).  Now the pool would receive 144,000 submissions per day, of which, on average, 1.44 would find full blocks for the pool.  If one miner contributes, say, 1% of our pool's hashing capacity then that miner will be responsible for a nominal 1440 shares per day."
      ),
      h(
        "p",
        {},
        "Mining pools use a variety of different schemes to reward contributions but most use some form of paying out rewards from any full Bitcoin block that the pool finds, based on some proportion of the shares submitted beforehand by its participants.  Let's assume that we're looking at a reasonably simple case where the payout is proportionate to the number of shares submitted since the pool last found a block.  Our pool, on average, finds a block 1.44 times per day and thus receives 100,000 shares between blocks that it finds, of which the last one is the solution to a block.  Our 1% miner will have submitted 1000 of these shares and the pool will pay out a proportionate amount of the mined block reward.  At its most simplistic the pool might charge 0% fees but, say, keep the transaction fees, so if the block reward is 25 BTC then our 1% miner receives a nominal 0.25 BTC every time the pool finds a block; 0.36 BTC per day."
      ),
      h(
        "p",
        {},
        "To the miner this is a far more consistent reward than the one block every 69.4 days that they might hope to achieve on average mining on their own, and carries a much lower variance in terms of potential returns."
      ),
      h(
        "p",
        {},
        "We should note that all of the above is a simplification because mining is a Non-Homogeneous Poisson Process and as such all of the numbers are mean values.  For example our miner may end up submitting 1050 shares for one block and 950 for the next and 1000 for the one after that; it won't be a consistent 1000 for each."
      ),
      h("h2", {}, "Block withholding"),
      h(
        "p",
        {},
        "Block withholding is a scenario in which a miner submits valid lower-difficulty shares but does not submit shares that match full Bitcoin blocks.  If they do this then they still receive a proportion of anything else that the pool earns but prevent the pool from claiming the reward for any blocks that they should have contributed.  In the case of our hypothetical 1% miner again and pool, they would reduce the pool's income by 1% but would still continue to gain 1% of what the pool did earn.  The miner would have harmed the pool by a small amount at a much lower impact to their own returns.  The withholding miner does not get to keep the block as pools protect against this!"
      ),
      h(
        "p",
        {},
        "Intuitively this seems like it would be a bad idea for the miner withholding blocks unless they simply wished to attack the pool.  Eyal's paper shows that this isn't necessarily the case."
      ),
      h(
        "p",
        {},
        "Let's consider a large-scale example.  Imagine that we have a pool with 25% of the network hash rate and it wishes to attack another open pool that has 25% of the network:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-12-05-0000/c1-25-25-yes-no.png" }),
        h("figcaption", {}, "25% mining pool attacks another 25% pool using block withholding")
      ),
      h(
        "p",
        {},
        "The vertical axis shows the percentage gains that the various participants in the network will see above what they would have seen if no-one was conducting an attack.  The horizontal axis shows the percentage of the total network hash rate allocated to the attack.  In this case the maximum value would be 25% as that is the total available to the attacker."
      ),
      h(
        "p",
        {},
        "There are some very striking trends!  First the biggest winners in any such attack are the neutral third parties.  The attack removes hashing from the network and so everyone else finds more of the blocks (albeit more slowly until after the next difficulty change reduces the difficulty).  The more intriguing aspect is that the attacker also gains financially!  At up to 4% of the network hash rate (approximately 16% of the pool's capacity) the attacker achieves a 1.87% increase in their total revenue.  At that same 4%, however, our victim has lost 10.2% of their revenue meaning that this has significantly harmed the other miners in the victim pool."
      ),
      h(
        "p",
        {},
        "There is an interesting quirk in all of this as regards the operator of the victim pool.  If they mine within their own pool then they will also suffer losses from the attack, but if they don't then they may actually see increased income too!  The attacker reduces their own hash rate and so the victim pool is actually going to find a larger percentage of the total blocks.  In the example above, if the attacker shifts 4% of the total network hash rate to the attack then the victim pool's original 25% is now 26.04% of the network and thus sees a total revenue increase of 4.17%.  A pool operator who takes a percentage of mined rewards or takes the transaction fees will actually see a 4.17% increase in their own income even as the victim miners see a significant reduction in theirs."
      ),
      h("h2", {}, "Smaller scale?"),
      h(
        "p",
        {},
        "We might now ask what happens if our pools are smaller.  Say our attacker has 10% of the network hash rate and our victim has 10%:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-12-05-0000/c1-10-10-yes-no.png" }),
        h("figcaption", {}, "A 10% miner attacking a 10% open mining pool using a block withholding attack")
      ),
      h(
        "p",
        {},
        "The curves are similar, they're just scaled down.  In fact the attacker has less scope to win, achieving a maximum gain of 0.28% when deploying 0.55% of the global hash rate during the attack (approximately 5.5% of the pool's capacity).  Conversely though the losses to the victim accumulate faster because a fixed amount of hash rate targeted towards it represents a proportionately larger fraction of the pool's capacity."
      ),
      h(
        "p",
        {},
        "If we consider two pools each of which have 1% of the global hashing capacity then things scale even further.  There is still a tiny margin for an attacker to see a positive reward but it is only at 0.005% of the global hash rate (approximately 0.5% of the pool's capacity).  It's clear that the nominal rewards from this style of attack scale dramatically in percentage terms as the attacker and victim hold larger percentages of the total network capacity."
      ),
      h("h2", {}, "Scaling effects (part 1)"),
      h(
        "p",
        {},
        "The scaling effects we've just considered may seem surprising, but a little thought reveals that they are not.  The attacker wins by gaining a larger share of the victim pool's revenue and at the same time causes the victim pool to actually still generate more revenue.  If the amount of hashing involved in an attack is small, however, then the attacker's switched hashing doesn't affect the global hash rate by very much.  The larger the attack, the larger the effect.  This has other implications that we will return to later."
      ),
      h("h2", {}, "Mutually assured destruction?"),
      h(
        "p",
        {},
        "If one party can attack another then surely the victim might retaliate? There are some wrinkles to this but for now let's just consider that. Here are our original two 25% sized protagonists withholding blocks from each other in similar proportions:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-12-05-0000/c1-25-25-yes-yes.png" }),
        h("figcaption", {}, "Two 25% mining pools performing block withholding attacks against each other")
      ),
      h(
        "p",
        {},
        `Attacker 1 isn't off the chart here, they're just on the same trend line as our previous victim, now "Attacker 2".  Now it's clear that "Everyone Else" would sit back and enjoy the fight.  The more the two antogonists contribute to the fight the quicker both lose!`
      ),
      h(
        "p",
        {},
        'We might assume that the attackers could simply try to harm everyone else too, but the attack only works against open mining pools in which participants can sign up and contribute shares without an element of trust between the mining pool operator and the miners who contribute shares.  This is the wrinkle noted above; if our attacker has 25% of the hash rate but operates a private/closed mining pool then the victim cannot retaliate.  If the "Everyone Else" capacity is found in closed mining pools then they cannot be victims of this type of attack either.'
      ),
      h("h2", {}, "Big vs little?"),
      h(
        "p",
        {},
        "We've seen two large pools involved, but what happens with a large attacker and a small open pool?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-12-05-0000/c1-25-1-yes-no.png" }),
        h("figcaption", {}, "25% miner attacks a 1% pool with a block withholding attack")
      ),
      h(
        "p",
        {},
        "There is a very small period here where the attacker makes a slight gain, but it quickly dissipates.  At the point where 0.33% of the global hash rate has been used (1.33% of the pool's total) the attacker is no longer gaining, but the victim pool's miners sees a 25% reduction in revenue.  At that sort of loss in revenue it would be likely that miners would start seeking other ways to mine more profitably."
      ),
      h("h2", {}, "Little vs big?"),
      h(
        "p",
        {},
        "If this works one way round then can it work the other way round?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-12-05-0000/c1-25-1-no-yes.png" }),
        h("figcaption", {}, "1% miner attacks a 25% mining pool with a block withholding attack")
      ),
      h(
        "p",
        {},
        "Clearly the answer is yes a small attacker can still gain a small amount at the expense of a large victim!  It's worth noting though that in order to do this they must use 12.7% of their total hashing capacity to achieve the largest gain and that the gain in question probably isn't sufficient to be worthwhile."
      ),
      h("h2", {}, "Scaling effects (part 2)"),
      h(
        "p",
        {},
        "So far what we've seen is that large attackers and large victims result in big gains for attackers and that attackers not operating in open pools cannot be victims of retaliation.  We've also seen that small pools can certainly suffer at the hands of large ones but not in ways that are directly profitable to larger pools (other than damaging competitors).  It might seem that this is a clear win for small mining pools, but let's not get too hasty!  There are (at least) 2 problems:"
      ),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          `Small mining pools suffer from significantly worse reward variances as we've seen before in, "`,
          h(
            "a",
            { href: "/blog/2014-06-30-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-06-30-0000") },
            "The gambler's guide to Bitcoin mining"
          ),
          '"'
        ),
        h(
          "li",
          {},
          "The block withholding attack scales up by attacking multiple pools!"
        )
      ),
      h(
        "p",
        {},
        "Let's consider 2 victim mining pools with 12.5% of the total hash rate each, and an attacker that has 25%.  Now if our attacker targets each with 2% of the global hash rate then the effects are identical to using 4% to attack one pool with 25% of the total hash rate.  Similarly attacking 25 pools with 1% of the global hash rate each and targeting 0.16% at each has the same effect.  In fact if an attacker has a reasonable estimate for the hash rate of potential victims then an attack can be made, proportionate to each one's size."
      ),
      h(
        "p",
        {},
        "There is a potential problem for would-be attackers though.  If two attackers target the same victim with a large enough combined attack then they will actually push the potential gains into negative territory for both of them."
      ),
      h("h2", {}, "Countermeasures?"),
      h(
        "p",
        {},
        "The only real way to prevent an attacker or group of attackers from being able to gain from this sort of attack would be to reduce the mining rewards paid by pools for shares rather than for actual full blocks."
      ),
      h(
        "p",
        {},
        "In the case of a 10% pool attacking another 10% pool we would require that shares be paid no more than 90% of the total mined reward in order to prevent an attacker from gaining.  In the case of a 25% pool attacking another 25% pool then the share-only reward would have to be no more than 75% of the total mined reward while a 40% pool attacking another 40% pool would require that share-only rewards be 60% or less of the total earned."
      ),
      h(
        "p",
        {},
        "As we've seen before, though, the problem is that this attack scales so attacking 25 pools of 1% size is the same as attacking one of 25%; the pools couldn't set share payout levels that reduced the vast majority of miners' payouts by 25%, even though a few lucky miners would gain far more for finding full blocks."
      ),
      h("h2", {}, "Bring on the stealth weapons"),
      h(
        "p",
        {},
        "In the scenarios we have considered so far our attacker transfers some of their hashing capacity from mining to attacking so that hashing capacity ceases to find blocks that are declared to the rest of the network.  With very large pools the loss in hash rate should at least raise some eyebrows, especially if the same hashing capacity didn't reappear somewhere else.  With this said, however, statistical variance would certainly mask some of this."
      ),
      h(
        "p",
        {},
        `An alternative, however, would be for an attacker to deploy "stealth" hashing.  This is hashing capacity that has never been used for conventional mining but is brought online solely to attack open pools.  As this capacity would never have contributed to hash rate statistics then it won't be noticed by anyone, potentially including the victim pool, because it can be targeted in small chunks of a few TH/s each.`
      ),
      h(
        "p",
        {},
        "Let's see what this might look like:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2014-12-05-0000/c2-25-25-yes-no.png" }),
        h("figcaption", {}, "A 25% attacker stealth attacks a 25% open pool")
      ),
      h(
        "p",
        {},
        "Consider a case where our attacker adds 5% of the useful global hash rate for the purpose of attacks.  They now control 28.6% of the total hash rate (their new 5% dilutes their old 25%) but are achieving 2.08% more than their 28.6% would normally achieve.  The victim pool (or pools) loses 12.5%, however!  Our attacker knows that they have gained but no-one else is any the wiser, while our victim appears to be suffering from bad luck, and it could take months to statistically demonstrate that this wasn't just bad luck in any meaningful way.  No external observers would be any the wiser unless the victim pool publishes its share data for analysis (which most pools would probably not wish to do for privacy reasons)."
      ),
      h("h2", {}, "More than just a theory?"),
      h(
        "p",
        {},
        "Are we actually seeing this style of attack on mining pools already?  Realistically unless someone published verifiable details of what they had done then it's probably impossible to tell.  Have we seen large-scale attacks?  Perhaps not, but as with so many other Bitcoin network statistics there's a lot of room for things to hide!"
      ),
      h("hr", {}),
      h("h2", {}, "Source code"),
      h(
        "p",
        {},
        "This article was written with the help of data from a C language simulation.  The data was rendered into charts using Excel.  The source code can be found on github: ",
        h(
          "a",
          { href: "https://github.com/dave-hudson/pool-wars" },
          "https://github.com/dave-hudson/pool-wars"
        )
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-06-30-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-06-30-0000") },
            "The gambler's guide to Bitcoin mining (2014-06-30)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-04-03-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-04-03-0000") },
            "The rewards for a Bitcoin miner (2014-04-03)"
          )
        )
      )
    ];
  }
  var blogPost_201412050000 = new BlogPost(
    "Pool wars?",
    "2014-12-05",
    "/blog/2014-12-05-0000",
    blogArticle_201412050000
  );

  // src/blog/2015-01-18-0000/2015-01-18-0000.js
  function blogArticle_201501180000() {
    return [
      h(
        "p",
        {},
        `It's well described how Bitcoin has a one Megabyte block limit; it's defined in the Bitcoin Core source code.  The knowledge of that 1 Mbyte limit has even served in some of my analysis such as "`,
        h(
          "a",
          { href: "/blog/2014-11-12-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-12-0000") },
          "The future of Bitcoin transaction fees?"
        ),
        '", "',
        h(
          "a",
          { href: "/blog/2014-11-11-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-11-0000") },
          "Bitcoin traffic bulletin"
        ),
        '", and "',
        h(
          "a",
          { href: "/blog/2014-11-02-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-02-0000") },
          "7 Transactions per second?  Really?"
        ),
        '".  Turns out that I was wrong; in practice this limit is actually quite a lot smaller!'
      ),
      h("h2", {}, "A puzzle"),
      h(
        "p",
        {},
        'Back in "',
        h(
          "a",
          { href: "/blog/2014-11-11-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-11-0000") },
          "Bitcoin traffic bulletin"
        ),
        `" we saw how first transaction confirmation times were highly dependent on how full mined blocks were.  Essentially anything larger than 30% started to show noticeably slower confirmations than the default 415 seconds that is seen when the blocks are pretty-much empty.  In fact the 415 second number can be larger or smaller for both statistical noise reasons, or if the global hash rate is increasing/decreasing (shorter if it's increasing, longer if it's decreasing).`
      ),
      h(
        "p",
        {},
        "There was a slight puzzle for me; the older data seemed more erratic than I'd have expected, but at the time I'd presumed that this was down to changes in hashing rates and that the older versions of the network had had longer latencies and more jittery propagation."
      ),
      h(
        "p",
        {},
        "A couple of days ago, however, I spotted something very odd while watching a series of blocks (block heights 338939 to 338942); they were all the same size (731 kbytes), but that size wasn't anywhere near 1 Mbyte.  The 731 kbytes size seemed pretty weird too, until I realized that this was a classic computer science numerology problem.  The Bitcoin block size limit is 1,000,000 (1M) bytes, but typically memory sizings aren't done in powers of 10, but instead in powers of 2, so 1 Mbyte of memory is actually 1048576 bytes.  For anyone old enough to remember PC floppy drives I leave you to actually work out the capacity of a 1.44 Mbyte floppy disk (I'll give you a hint, it needs you to use 1k bytes and 1024 bytes :-)).  731k = 731 * 1024 = 748,544 bytes; this is actually 750k bytes minus a small amount."
      ),
      h(
        "p",
        {},
        "Given this puzzle I generated some new data.  It looks at the theoretical block usage vs the mean first confirmation time.  Let's look at it:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-01-18-0000/conf_time_vs_block_size.png" }),
        h("figcaption", {}, "Block usage vs mean confirmation time")
      ),
      h(
        "p",
        {},
        "In the earlier assessment I'd noted that below a 30% block usage level that the block utilization shouldn't really make much difference to the confirmation delay, but in this graph the spikes in one are clearly quite highly correlated with the other.  Correlation and causation are two different things but, even so, this is pretty surprising!"
      ),
      h(
        "p",
        {},
        "If our actual maximum block size limit was actually somewhat less than 1M bytes, though, the estimate block usage numbers would be incorrect and would need to be scaled up!"
      ),
      h("h2", {}, "An interlude on block sizing"),
      h(
        "p",
        {},
        "Why would 750k bytes be being used instead of 1M bytes?  If one or more miner was systematically generating smaller blocks than the theoretical maximum then that would definitely affect all of my earlier estimates on block utilization, mean confirmation times and block scarcity for mining fees."
      ),
      h(
        "p",
        {},
        "A little digging around in the Bitcoin Core git repository turns out to be very useful!  The Bitcoin protocol implements a hard consensus limit of 1M bytes on blocks, but actually has a default size for miners that is actually smaller than this.  Individual transaction selectors (generally mining pool operators) can set the value to anything up to 1M bytes, but there are some defaults."
      ),
      h(
        "p",
        {},
        "Since v0.9.0 (2014-03-09) the default maximum block size to be mined is 750k bytes, with up an addition 50k bytes for high priority transactions (there aren't many of these).  A little more investigation also showed that v0.8.6 had had the default maximum block size at 350k bytes and prior to that the value had been 250k bytes!"
      ),
      h(
        "p",
        {},
        "If we were mining, why might we want to use smaller block sizes?  Well, if we need to announce a mined block to the network it takes time.  If we assume we need to tell 8 peers about any new block and our block is 250k bytes in size, then that's 8 * 250k * 8 = 16M bits.  If our miner had a DSL line with only a 1 Mbps uplink then by the time we've added network protocol overheads then this block will take about 20 seconds to transmit!  That's a very long time, especially in situations where two blocks are found at almost the same time.  If the block had been 1M bytes then it would have taken 80 seconds!  In practice large mining pools will have much faster network connections than this now, but network bandwidth still plays an effect."
      ),
      h(
        "p",
        {},
        'Back to our original problem, however!  The problem with miners selecting a smaller maximum block size is that if the network is heavily loaded then our miner is effectively leaving transactions waiting when they declare a block "full" at some level below 1M bytes.  Far from the 3.2 transactions per second that we thought the network could sustain in "',
        h(
          "a",
          { href: "/blog/2014-11-02-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-02-0000") },
          "7 Transactions per second?  Really?"
        ),
        '" every miner imposing a 750k bytes limit would mean the network capacity was actually only 2.4 TPS!'
      ),
      h("h2", {}, "What is the effective block size limit?"),
      h(
        "p",
        {},
        "With good historical data we can estimate the actual block size limit for various miners.  If we look at the largest block mined by specific pools in given weeks we can estimate the upper limits that they were actually using.  If we multiply these by the fractions of the numbers of blocks each found then we can estimate the actual block size capacity of the network over time:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-01-18-0000/est_block_sz_vs_block_usage.png" }),
        h("figcaption", {}, "Estimated Bitcoin block size limits for 2013 and 2014")
      ),
      h(
        "p",
        {},
        "This isn't a perfect approach.  Smaller pools will see their results skewed because they don't find enough blocks, but the effect is interesting.  Over the last two years the effective block size has steadily been growing, and if anything has, until a few months ago, slightly outpaced the growth in actual block usage."
      ),
      h("h2", {}, "Mining pool behaviour"),
      h(
        "p",
        {},
        "The raw data is also a source of some interesting discoveries.  Individual pool operators sometimes try to optimize things in interesting (and quite different) ways.  Here are some examples for some of the larger pools:"
      ),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          "Antpool never adopted the 350k bytes value and jumped from 250k to 750k in June 2014."
        ),
        h(
          "li",
          {},
          "BTCGuild adopted 475k bytes in March 2013, then 500k bytes from August 2013."
        ),
        h(
          "li",
          {},
          "The now defunct DeepBit pool never went over 100k bytes."
        ),
        h(
          "li",
          {},
          "Discus Fish (F2Pool) switched from 250k bytes to 32k in December 2013.  After 6 weeks they variously tried 48k and 64k sizes for a few weeks each before adopting 916k in March 2014, then 933k in August 2014.  In October 2014 they systematically started mining at 1M bytes; as such they consistently mine the largest blocks of all pools.  Discus Fish also, curiously, mined a very large number of 0 transaction blocks for during the middle of 2014, suggesting some other peculiarities in their block selection."
        ),
        h(
          "li",
          {},
          "Until November 2013 Eligius appears to have tried many quite large block sizes, before adopting a value just over 900k bytes."
        ),
        h(
          "li",
          {},
          "GHash.IO ran with the 750k default for 2 weeks in March 2014 before moving back to 350k until late June.  Their switch to larger blocks coincided with their decline in peak hash rate from a mean of 40% of the network.  Curiously, both times they moved to 750k there was a corresponding large drop (about one sixth) in their share of the network; this could be complete coincidence but perhaps not!"
        ),
        h(
          "li",
          {},
          "Megabigpower has highly erratic maximum block sizes; the variation is seemingly far too large for their share of the network, with smaller pools showing dramatically more stability.  This perhaps implies that they are using some sort of custom maximum block size estimation software."
        ),
        h(
          "li",
          {},
          'Most of the "unknown" hashing seems to be done by miners using the default sizes.'
        )
      ),
      h("h2", {}, "So does this explain our original chart?"),
      h(
        "p",
        {},
        "Let's look at our original one but now with the estimated block usage too:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-01-18-0000/conf_time_vs_est_vs_block_size.png" }),
        h("figcaption", {}, "Block usage vs estimated block usage vs conf delay")
      ),
      h(
        "p",
        {},
        "This is quite striking, even more so if we realize that in late 2013 and early 2014 we were seeing huge hash rate expansions which in turn reduce the confirmation times as blocks were being found much more quickly than one per 10 minutes.  The higher effective block usage (above 30%) also goes a long way to explaining why our original chart was much more highly correlated than we expected."
      ),
      h("h2", {}, "Implications"),
      h(
        "p",
        {},
        "The implications of these results are intriguing.  We can certainly see that the current network can't actually handle even the modest transaction rates we originally assumed, although it's easy for mining pool operators to adjust for this.  That this is up to the majority of mining pool operators is potentially the most interesting realization."
      ),
      h(
        "p",
        {},
        "Back when GHash.IO was approaching 50% of the network there was a lot of concern about what this meant for the potential to double-spend, etc.  In practice, such a risk seems unlikely as that would damage the very ecosystem that supports mining.  A subtlety, however, is that GHash were only actually allowing 350k bytes per transaction.  Where they controlled 40% of the total block space they only actually allowed 35% of that 40% to be used; a net loss to the network of 26% of its total theoretical capacity.  The jump when they switched to 750k byte transactions is actually quite marked in the second chart!"
      ),
      h(
        "p",
        {},
        "The confirmation time statistics suggest that even if, mid 2014, they had tried to use relative scarcity to select higher fee transactions it probably would have had little impact.  The next large pool, if in a position to dictate block scarcity, has the potential to be much more disruptive as a result of transaction selection."
      ),
      h(
        "p",
        {},
        "There is also an interesting implication for Gavin Andresen's proposed protocol fork that would allow larger blocks.  If the majority of mining pools (by total capacity) choose to ignore some new upper limit then the effect will be to retain a much smaller overall cap.  Miners may, indeed, want to do exactly this as block scarcity is the only thing that has any reasonable prospect of helping them achieve higher transaction fees."
      ),
      h(
        "p",
        {},
        "For observers of the Bitcoin network we do seem to have a new health indicator: A periodic report on the mean, minimum and maximum block sizes mined by various pools and their associated statistical likelihoods could be very interesting."
      ),
      h("hr", {}),
      h("h2", {}, "Acknowledgments"),
      h(
        "p",
        {},
        "Many thanks to ",
        h("a", { href: "https://twitter.com/oocBlog" }, "@oocBlog"),
        " (author of the ",
        h("a", { href: "https://organofcorti.blogspot.com" }, "Neighbourhood Pool Watch"),
        ") blog; well worth reading every week).  After I spotted the trends that led me to speculate about block size limits he generated the raw data that I needed to perform my analysis."
      ),
      h("hr", {}),
      h("h2", {}, "Source code"),
      h(
        "p",
        {},
        "When I came to write this article I also wrote a C++ application that would combine all of the raw data into a form I could use with Excel to generate the charts.  The source code, and the source CSV data files can be found on github: ",
        h(
          "a",
          { href: "https://github.com/dave-hudson/the-myth-of-the-megabyte-bitcoin-block" },
          "https://github.com/dave-hudson/the-myth-of-the-megabyte-bitcoin-block"
        )
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-11-12-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-12-0000") },
            "The future of Bitcoin transaction fees? (2014-11-12)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-11-11-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-11-0000") },
            "Bitcoin traffic bulletin (2014-11-11)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-11-02-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-02-0000") },
            "7 Transactions per second?  Really? (2014-11-02)"
          )
        )
      )
    ];
  }
  var blogPost_201501180000 = new BlogPost(
    "The myth of the megabyte Bitcoin block",
    "2015-01-18",
    "/blog/2015-01-18-0000",
    blogArticle_201501180000
  );

  // src/blog/2015-12-19-0000/2015-12-19-0000.js
  function blogArticle_201512190000() {
    return [
      h(
        "p",
        {},
        "Bitcoin blocks take 10 minutes to find don't they?  Well, actually no they don't.  Sometimes they can be found really quickly, but other times they can take a very long time.  Just to make things confusing, the gaps between blocks can change depending on whether the hashing network is stable, expanding or contracting.  What if we need 6 blocks (to get 6 confirmations)?"
      ),
      h(
        "p",
        {},
        "So what should we expect?  What happens during hashing growth phases, and what would happen if the network were to lose large amounts of hashing capacity?"
      ),
      h("h2", {}, "Running like clockwork?"),
      h(
        "p",
        {},
        "In a somewhat perfect world we might hope that our nominal 10 minute gap between blocks would be exactly 10 minutes, but anyone who has ever watched block arrival times will know that that's not what happens:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-12-19-0000/1b_single.png" }),
        h("figcaption", {}, "Probabilities for finding one Bitcoin block")
      ),
      h(
        "p",
        {},
        "The blue probability line shows the incremental probability of finding a block at a given time.  This might seem a little strange until we look at the red, cumulative probability, line.  The cumulative probability indicates how likely it is that we already found a block by a given time, so the blue line makes more sense.  As time progresses it's more and more likely that we already found a block so the number that will be found after a long time reduces significantly."
      ),
      h(
        "p",
        {},
        "In the Bitcoin network our mean block finding time is 10 minutes, but by the time we reach 10 minutes there's a better than 63% probability that we've found a new block, not 50%.  In fact 50% of blocks have been found within 415 seconds (just under 7 minutes)."
      ),
      h(
        "p",
        {},
        "The 37% of the blocks, that take longer than 10 minutes, can take a very long time to find!  At an hour we've still not found a block a little less than 0.25% of the time; that means that typically 1 block in 401 will take more than an hour to find!  There are a few subtleties to this particular number but we'll come back to those in a little while."
      ),
      h(
        "p",
        {},
        "If, like me, you find the 1 in 401 number was something of a surprise (that's about once every 2.8 days on average) then it's perhaps worth looking at some gaps between blocks.  In the 12 day period up to 2015-02-05 (when the data was captured) I quickly located 5 blocks that took more than an hour to find!  The number might be higher as I was doing this manually by checking a blockchain explorer.  For the record these were 340450 (77 mins), 340521 (63 mins), 340544 (67 mins), 341727 (60 mins) and 342002 (72 mins).  Three of these occurred in a single 24 hour period over the 25th and 26th of January."
      ),
      h("h2", {}, "6 confirmations?"),
      h(
        "p",
        {},
        "If a single block can take so long to find, what about the 6 blocks that we need for many simple Bitcoin clients (SPV wallets)?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-12-19-0000/6b_single.png" }),
        h("figcaption", {}, "Probabilities of finding 6 consecutive Bitcoin blocks")
      ),
      h(
        "p",
        {},
        "We'd certainly expect that things will be closer to our anticipated 10 minutes per block and that is indeed the case.  50% of the time we've found 6 blocks by 3400 seconds (a little under 57 minutes).  At 60 minutes we've found about 55% of blocks.  A surprise, however, is that in 10% of cases it takes more than 5560 seconds (more than 1 hour, 32 minutes) to find 6 blocks; in 1% of cases it takes more than 7870 seconds (2 hours, 11 minutes)!  On the flip side of this though, in 10% of cases we get all 6 blocks within 1890 seconds (a little under 32 minutes) and in 1% of cases we have all 6 within 1070 seconds (just under 18 minutes)."
      ),
      h("h2", {}, "The network isn't static!"),
      h(
        "p",
        {},
        `So far none of the results we've seen should come as anything of a shock to anyone who understands the statistics assoicated with a Poisson process.  The real Bitcoin network is somewhat more subtle though because it is really a non-homogeneous Poisson process; underlying hashing capacities change throughout each difficulty period of 2016 blocks.  If we start out at, say, 300 PH/s but add 0.2% new capacity every day, then after 14 days (a little more than the 2016 blocks take) we'd have 308.5 PH/s.  That means that towards the end of the 2016 blocks we're actually going to see blocks found more quickly than at the start.  In addition, as we saw in "`,
        h(
          "a",
          { href: "/blog/2014-06-10-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-06-10-0000") },
          "Lies, damned lies and Bitcoin difficulties"
        ),
        '", the nominal hash rate calculated at the end of each difficulty period lags about a week behind the current hash rate.'
      ),
      h(
        "p",
        {},
        `The 0.2% increase per day isn't a completely random number; it's a good approximation to the underlying trend for the last couple of months.  Comparing this and the "ideal" numbers where there's no change in the network's hash rate we can see the following:`
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-12-19-0000/1b_double.png" }),
        h(
          "figcaption",
          {},
          "Comparison of probabilities for finding a Bitcoin block with 0% and 0.2% per day hash rate expansion"
        )
      ),
      h(
        "p",
        {},
        "The difference isn't all that great.  Our mean block finding time is closer to 9 minutes 45 seconds, while our mean time to see a block take an hour or longer increases to once every 480 blocks."
      ),
      h("h2", {}, "What about more extreme changes in hash rate?"),
      h(
        "p",
        {},
        "A hash rate increase of 0.2% per day doesn't have much effect, but what about 2% per day?  2% seems like a huge number based on recent months, but was quite common in the earlier part of 2014.  At the same time as considering positive increases it seems worth considering negative changes too."
      ),
      h(
        "p",
        {},
        "A +2% per day change corresponds to a nominal 24.8% increase in hash rate over 2016 blocks and takes about 11.2 days.  The rapid increase causes us to find blocks very quickly and thus readjust the difficulty quickly.  A -2% per day change has a much larger impact, however, because our 2016 blocks end up taking nearer to 21 days.  This would correspond to a hash rate reduction of 34.6%."
      ),
      h(
        "p",
        {},
        "The following curves assume a steady state change, i.e.  what would happen if we'd been seeing a steady +2%, 0% or -2% change in the previous difficulty period too.  As such these are more extreme that we would see in the first difficulty period for which the change was occurring; they do match a second or subsequent period:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-12-19-0000/1b_triple.png" }),
        h("figcaption", {}, "Probabilities of finding a single Bitcoin block under -2%, 0% and +2% daily hash rate changes")
      ),
      h(
        "p",
        {},
        "During our +2% expansion we see a mean block time closer to 8 minutes, but with a -2% contraction the mean moves closer to 15 minutes!"
      ),
      h(
        "p",
        {},
        "Now let's look at the same behaviour for our 6 confirmations:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-12-19-0000/6b_triple.png" }),
        h(
          "figcaption",
          {},
          "Probabilities for 6 Bitcoin blocks being found during -2%, 0% and +2% hash rate changes per day"
        )
      ),
      h(
        "p",
        {},
        "As we might expect, the pattern for a single block is mirrored for 6 blocks."
      ),
      h("h2", {}, "Final thoughts"),
      h(
        "p",
        {},
        "The Bitcoin design is surprisingly well adjusted for a network in which hash rates are expanding.  Given that technologies continually improve then that's probably the right bias as a normal schedule of replacing older, less power efficient, hardware with newer, more power efficient models will tend to see global hash rates increase."
      ),
      h(
        "p",
        {},
        "On the surface it looks like it works much less well when we see steady contraction of the global hash rate, but such contractions are much less likely.  In general miners will remove their least power efficient hardware from the network rather than their most efficient, so if the BTC price reduces the impact on the hash rate is significantly dampened."
      ),
      h(
        "p",
        {},
        "There is another interesting aspect to the reduced block finding rate.  One of the theories about the recent decline in the BTC price is that a lot of the downward pressure comes from miners selling newly-mined coins.  If miners start to unplug hardware and the block finding rate falls then some of this pressure will also reduce because fewer coins will be being mined each day.  Whether this actually happens or not may be an interesting indicator of what might happen when the block reward halves in 2016."
      ),
      h("hr", {}),
      h("h2", {}, "Source code"),
      h(
        "p",
        {},
        "The source code for the simulation tool that generated the results for this article can be found on github at: ",
        h(
          "a",
          { href: "github.com/dave-hudson/waiting-for-blocks" },
          "github.com/dave-hudson/waiting-for-blocks"
        )
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2015-02-06-0000", onClick: (e) => navigateEvent2(e, "/blog/2015-02-06-0000") },
            "Waiting for blocks (2015-02-06)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-06-10-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-06-10-0000") },
            "Lies, damned lies and Bitcoin difficulties (2014-06-10)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-24-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-05-24-0000") },
            "Reach for the ear defenders (2014-05-24)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-20-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-05-20-0000") },
            "Hash rate headaches (2014-05-20)"
          )
        )
      )
    ];
  }
  var blogPost_201512190000 = new BlogPost(
    "Waiting for blocks",
    "2015-12-19",
    "/blog/2015-12-19-0000",
    blogArticle_201512190000
  );

  // src/blog/2015-12-20-0000/2015-12-20-0000.js
  function blogArticle_201512200000() {
    return [
      h(
        "p",
        {},
        'In November 2014 I wrote an article, "',
        h(
          "a",
          { href: "/blog/2014-11-11-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-11-0000") },
          "Bitcoin traffic bulletin?"
        ),
        '" that sought to look at what happens if the Bitcoin network started to get congested.  Since then there has been considerable debate about the Bitcoin block size and there are now many proposals to increase block capacity.'
      ),
      h(
        "p",
        {},
        `In the original blog post the network's block capacity was at about 30%.  As of early December 2015 the network's block capacity is at least 58%.  In practice some blocks are mined smaller than the full 1M bytes that could be used (see "`,
        h(
          "a",
          { href: "/blog/2015-01-18-0000", onClick: (e) => navigateEvent2(e, "/blog/2015-01-18-0000") },
          "The myth of the megabyte Bitcoin block"
        ),
        '") and so we may have more block capacity being used:'
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-12-20-0000/blocksizes.png" }),
        h("figcaption", {}, "Block sizes over time")
      ),
      h(
        "p",
        {},
        "The simple Monte Carlo simulation from that earlier post models the effects of loading on first transaction confirmations:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2015-12-20-0000/first-conf-0-100.png" }),
        h(
          "figcaption",
          {},
          "Probabilities for time to a first block confirmation with the Bitcoin network at various load levels (log scale)"
        )
      ),
      h(
        "p",
        {},
        'During 2015 we have seen a few attempts to generate "stress tests" that spam the Bitcoin network with large volumes of transactions.  In each instance transaction confirmation times were seen to increase, and arguably fees increases to match.  This suggests that the network can adapt reasonably well, but service was certainly affected, not least because transactions with small fees could be almost indefinitely delayed.'
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2015-01-18-0000", onClick: (e) => navigateEvent2(e, "/blog/2015-01-18-0000") },
            "The myth of the megabyte Bitcoin block (2015-01-18)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-11-11-0000", onClick: (e) => navigateEvent2(e, "/blog/2014-11-11-0000") },
            "Bitcoin traffic bulletin? (2014-11-11)"
          )
        )
      )
    ];
  }
  var blogPost_201512200000 = new BlogPost(
    "Bitcoin traffic bulletin (redux)",
    "2015-12-20",
    "/blog/2015-12-20-0000",
    blogArticle_201512200000
  );

  // src/blog/2016-01-05-0000/2016-01-05-0000.js
  function blogArticle_201601050000() {
    return [
      h(
        "p",
        {},
        '"Exahash" sounds like it could well have been the hammer of the Norse Gods of old as it defeated all in battle.  In the Bitcoin world of early 2016, however, a mining network that achieves one exahash per second will soon become part of the new folklore.  It will, as others before it, quantitatively destroy all earlier incarnations of itself.'
      ),
      h(
        "p",
        {},
        "Common wisdom that this ever-increasing hash rate makes the Bitcoin network continually stronger, but what does that strength mean?  What is it stronger than?  What guarantees does it offer?  The answer, as so often, is perhaps less clear-cut than we might first imagine!"
      ),
      h("h2", {}, "The nature of Bitcoin hashing (an aside)"),
      h(
        "p",
        {},
        'The Bitcoin network is secured and processes transactions by mining.  Mining comprises two activities, block making and hashing.  Block making is generally the preserve of very large miners or mining pool operators (see "',
        h(
          "a",
          { href: "/blog/2014-06-30-0000", onClick: (e) => navigateEvent(e, "/blog/2014-06-30-0000") },
          "The gambler's guide to Bitcoin mining"
        ),
        `") while hashing is the activity that can be decentralized to many different operators.  For our purposes, though, we're not interested in block making, but instead hashing.`
      ),
      h(
        "p",
        {},
        'Hashing is the process by which computational guesses are made in order to solve the cryptographic puzzle required to mine a Bitcoin block.  The hashing process is the "work" in the "proof-of-work" that is often synonymous with Bitcoin mining.'
      ),
      h(
        "p",
        {},
        'When we talk about "work" we really mean this in a thermodynamic sense.  The work involves performing a deliberately uninteresting computational task that takes useful energy (electricity) and turns it into less useful energy (heat).  The purpose is for the hashing engines to demonstrate their expenditure of real-world-valuable electricity in the chance of obtaining Bitcoins via mining rewards.'
      ),
      h(
        "p",
        {},
        "In theory the system can be gamed by trying to find uses for the less useful heat energy, but in practice this is only used in a very small part of the network and generally doesn't fit well with most heat usage patterns.  Most users don't want continual heat, while Bitcoin mining hardware depreciates in value too fast for users to afford to run it at less than 100% utilization.  Entropy is the major winner."
      ),
      h(
        "p",
        {},
        "While not terribly environmentally friendly the design pattern does work rather well, but there are unanswered questions about long-term implications of proof-of-work networks.  While watching the most recent episode of Star Wars and seeing the First Order's Starkiller Base draining all of the power from a sun I was left wondering if this was the ultimate fate of proof-of-work!"
      ),
      h("h2", {}, "Hash rates"),
      h(
        "p",
        {},
        "Hash rates have been incrementally on the rise for very good economic reasons.  Throughout 2015 their growth rates reflected the lower BTC:USD valuation, but with the increase in the value of Bitcoins and the introduction of new 16nm ASICs there has been room for yet another period of rapid hash rate expansions."
      ),
      h(
        "p",
        {},
        "2009 wasn't very interesting for Bitcoin mining so we take up our story from 2010:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2016-01-05-0000/hash-rate.png" }),
        h("figcaption", {}, "Hash rates in the Bitcoin network from 2010 to 2016")
      ),
      h(
        "p",
        {},
        "The chart is plotted on a logarithmic scale to make it meaningful.  Each vertical graduation is 10x larger than the one immediately below.  The late 2015 plot is apparently showing a big uptick but it remains to be seen just how large this will actually be, but that 1 exahash per second figure (1.0 x 10^18^ hashes per second) is quite staggering.  Generally, these sorts of numbers just don't appear in normal engineering activities.  To put this in perspective, if we had every person on the planet each make the same sorts of guesses that the hashing network does then every one of us would need to make more than 135 million guesses per second to match this same rate."
      ),
      h("h2", {}, "What does proof-of-work actually do?"),
      h(
        "p",
        {},
        "Proof-of-work is intended to secure the Bitcoin network.  It does this by making it computationally very difficult for a bad actor to change historical transactions.  They would have to generate a newer, stronger, proof-of-work than has been done by the good actors within the system.  When we actually talk about this sort of proof, however, what's really meant is that we believe the probability of constructing an alternative timeline for the Bitcoin blockchain becomes sufficiently low that it's not a practical concern.  The mathematics for this are given in the original Satoshi white paper."
      ),
      h(
        "p",
        {},
        "It's generally presumed that newer work makes it incrementally less likely that really old work could be overturned.  This would certainly be true if the network didn't get faster, but what are the actual numbers?"
      ),
      h(
        "p",
        {},
        "We can start by considering the measured hash rates since the start of the Bitcoin network, but rather than looking at the hash rate per second, let's look at two other numbers.  Let's evaluate the total number of hashes computed ever since the first genesis block, and the number of hashes computed on any given day.  Hash rate numbers aren't precise, but statistically, over time, they work out pretty accurately:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2016-01-05-0000/number-of-hashes.png" }),
        h("figcaption", {}, "Numbers of Bitcoin hashes over all time and per day")
      ),
      h(
        "p",
        {},
        "Notice that both traces are plotted on the same axis!"
      ),
      h(
        "p",
        {},
        "The chart tells us something really interesting about how much faster the network is getting over time.  On, or around, 2011-08-31 the total computed hashes hit 100 exahashes (1.0 x 10^20^ hashes).  A little over 2 years later, on, or around, 2013-09-23 the number of hashes computed on a daily basis hit the same number.  Had the network of 2013-09-23 been available before the end of August 2011 it would have been possible to recompute an entirely new Bitcoin history (32 months of work) in a single day!"
      ),
      h(
        "p",
        {},
        "If we look at the two traces it becomes obvious that as the network hashing capacity undergoes significant growth that the gaps become much smaller.  If we consider the 10 zettahash (1.0 x 10^22^) level, the cumulative date was around 2013-10-22, and the daily date was 2014-06-16.  Instead of 24 months required for the 100 exahash level, slightly less than 8 months was required for 10 zettahashes."
      ),
      h("h2", {}, "A new metric"),
      h(
        "p",
        {},
        "What we've just seen is something of an intellectual curiosity, but let's consider a new metric.  How long it would take the network to recompute all of the previous history?  We can do this by plotting the ratio of the total hashes computed over all time to the hashes computed on each day up to that point:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2016-01-05-0000/ratio-of-hashes.png" }),
        h("figcaption", {}, "Ratio of total cumulative hashes to daily hashes")
      ),
      h(
        "p",
        {},
        "We see something new!  During periods of extreme, rapid, expansion the hashing capacity can accelerate to a point where all earlier proofs of work become dramatically less valuable.  Steady network growth in most of 2015 culminated in the network requiring almost 12 months of computation to recompute every block since the genesis block, but only two months later the progression towards 1 exahash/s has seen this fall to under 9 months; the entire blockchain history is apparently less strong than 2 months ago!  In the middle of the extreme expansion from the first wave of ASICs during November 2013 the network could recompute the entire blockchain history of 58 months in under 40 days."
      ),
      h(
        "p",
        {},
        "Far from being a constantly strengthening network, we instead see that the network sometimes undergoes periods in which the cumulative weight of earlier proofs of work can become significantly less valuable, albeit perhaps only for a few months until new work is added.  The lost work is, however, never recovered."
      ),
      h(
        "p",
        {},
        "General threat models for the Bitcoin network consider the risks of a 51% attacker causing problems for new transactions.  If, however, the Bitcoin network is used to anchor other blockchains, the history itself becomes valuable for other reasons, potentially in excess of the value for Bitcoin itself.  In the short term there is no obvious technology to supplant the current ASIC roadmap, but we might have some pause for thought about whether, environmental concerns aside, proof-of-work alone will be sufficient to secure the long-term history of the Bitcoin blockchain."
      ),
      h("hr", {}),
      h("h2", {}, "Related articles"),
      h(
        "ul",
        {},
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-06-30-0000", onClick: (e) => navigateEvent(e, "/blog/2014-06-30-0000") },
            "The gambler's guide to Bitcoin mining (2014-06-30)"
          )
        ),
        h(
          "li",
          {},
          h(
            "a",
            { href: "/blog/2014-05-20-0000", onClick: (e) => navigateEvent(e, "/blog/2014-05-20-0000") },
            "Hash rate headaches (2014-05-20)"
          )
        )
      )
    ];
  }
  var blogPost_201601050000 = new BlogPost(
    "Behold mighty exahash, hammer of the blocks!",
    "2016-01-05",
    "/blog/2016-01-05-0000",
    blogArticle_201601050000
  );

  // src/blog/2016-02-03-0000/2016-02-03-0000.js
  function blogArticle_201602030000() {
    return [
      h(
        "p",
        {},
        "Most participants in the ongoing Bitcoin block size debates have a point of agreement; that a shortage of block space should have an effect on transaction fees.  Arguments aside, then, let's see what has actually been happening. Are fees going through the roof?  Are miners going to be celebrating a potential offset to the block reward halving that looms in July 2016?  The results seem a little surprising!"
      ),
      h("h2", {}, "Rewards for a Bitcoin miner"),
      h(
        "p",
        {},
        "Bitcoin miners earn their per-block rewards in two ways.  They collect a block reward subsidy that halves every 210,000 blocks and they collect the fees assigned each transaction within a block.  Historically the fees have represented a tiny fraction of the total reward."
      ),
      h(
        "p",
        {},
        "Despite being far smaller, they are still actually worth a reasonable amount of money per year to the block makers who collect them.  At the time of writing they represent around $20,000 per day, potentially $7.3M per year."
      ),
      h("h2", {}, "An emerging fee market?"),
      h(
        "p",
        {},
        "If capacity is scarce within the Bitcoin blockchain we would expect to see transaction fees rise dramatically as users seek to ensure their transactions are processed ahead of everyone else's, but are there any strong indications that this has happened?"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2016-02-03-0000/fees-per-tx-btc.png" }),
        h("figcaption", {}, "Fees per Bitcoin transaction in BTC")
      ),
      h(
        "p",
        {},
        "We can see that throughout 2014 the BTC-denominated average fee per transaction steadily declined, stabilized in the first half of 2015 and then jumped in July 2015.  Thereafter the average fee actually started to fall again.  Transaction fees have bounced back up a little in the first few weeks of 2016, but this doesn't appear to be the fee armageddon that was forecast!  If anything fee levels are now back where they were in early 2014."
      ),
      h("p", {}, "The trend is certainly curious, so let's look at the transaction volumes:"),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2016-02-03-0000/tx-per-day.png" }),
        h("figcaption", {}, "Transactions per day in the Bitcoin network")
      ),
      h(
        "p",
        {},
        "As we'd expect, the transaction volume has been steadily increasing (otherwise there would be no block size bickering).  The last 2 months have seen particular jumps, but that may in part be explained by the dramatic increases in hash rates again. Rather than a nominal 10 minute block time we've been seeing nearer to 9 so the available capacity for low-fee or zero-fee transactions has been higher than we'd expect.  Instead of 6 MBytes per hour we've probably had more like 6.6 MBytes per hour of block capacity."
      ),
      h(
        "p",
        {},
        `It's quite odd that the transaction rates have jumped quite so much in the last 7 months though, almost doubling.  This is the very same period in which the average per-transaction fee had jumped up.  The spike in July gives some indication of what happened, however, as this corresponds to the first "Bitcoin flood attack" (see: `,
        h("a", { href: "https://en.bitcoin.it/wiki/July_2015_flood_attack" }),
        "). The flooding event caused the network to adjust fees upwards, but thereafter fees steadily declined again as fee-bearing transactions saw minimal impact on confirmation times."
      ),
      h("p", {}, "The first chart we looked at considered BTC-denominated fees, but what if we look at them in USD?"),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2016-02-03-0000/fees-per-tx-usd.png" }),
        h("figcaption", {}, "Fees per Bitcoin transaction in USD")
      ),
      h(
        "p",
        {},
        "This one actually looks worse.  It appears that the fee levels have steadily been increasing since July 2015, but we're seeing the effect of two different things.  As the BTC-denominated fees started to fade back, the USD price of BTC was increasing so dollar-denominated fees do look like they've been increasing. It's notable though that they're still lower than they were in the first 9 months of 2014."
      ),
      h("h2", {}, "Total costs per transaction"),
      h(
        "p",
        {},
        "Finally, something curious: If we look at the cost of each transaction as measured by the USD-valued total mining rewards for each day and the numbers of transactions per day we see that things have been incredibly stable for the last 12 months:"
      ),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2016-02-03-0000/rewards-per-tx-usd.png" }),
        h("figcaption", {}, "Rewards per transaction in USD")
      ),
      h("h2", {}, "Final thoughts"),
      h(
        "p",
        {},
        "Far from a fee market emerging to inflate transaction costs, we don't appear to have very much evidence of anything dramatic happening yet.  There are a number of possibilities, but one is that the transaction volume doesn't really reflect transactions that most users care about.  Low value fees for unimportant transactions may well be leaving more interesting transactions unaffected by any concerns about capacity.  While the block size squabbles will continue it's unclear that there have yet been any wide-scale implications for current users of the network."
      )
    ];
  }
  var blogPost_201602030000 = new BlogPost(
    "A market for Bitcoin transaction fees?",
    "2016-02-03",
    "/blog/2016-02-03-0000",
    blogArticle_201602030000
  );

  // src/blog/2017-01-06-1400/2017-01-06-1400.js
  function blogArticle_201701061400() {
    return [
      h(
        "em",
        {},
        "Note 2020-03-06: This was originally published as an opinion piece at ",
        h(
          "a",
          { href: "https://www.coindesk.com/what-iot-history-reveals-about-blockchains-challenges" },
          "Coindesk"
        ),
        "."
      ),
      h("hr", {}),
      h(
        "figure",
        {},
        h("img", { src: "/blog/2017-01-06-1400/rock-paintings-art.jpg" }),
        h(
          "figcaption",
          {},
          "Cave paintings via https://www.shutterstock.com/pic-94533745/stock-photo-famous-prehistoric-rock-paintings-of-tassili-najjer-algeria.html"
        )
      ),
      h(
        "p",
        {},
        "2009 saw Satoshi Nakamoto deploy the first Bitcoin node, and within five years its blockchain had become alarge-scale industry."
      ),
      h(
        "p",
        {},
        "Early enthusiasm for new technologies is nothing new.  With most, an initial wave of excitement sees new ideas touted as solutions to a huge range of problems, the hype fades, gives way to skepticism, and ultimately, real applications."
      ),
      h("p", {}, "In the late 1990s, the idea of Internet-connecting every electronic device seemed inescapable."),
      h(
        "p",
        {},
        "Every vending machine, coffee pot, toaster, refrigerator, microwave, and TV, would be cabled to the \u201Cnet\u201D, and a utopian sharing of data would improve life for everyone."
      ),
      h("p", {}, "The reality for what we now term the \u201CInternet of Things\u201D, or IoT, was a little different."),
      h("h2", {}, "It's all about money"),
      h("p", {}, "The original theory of IoT was that data would make everything better."),
      h(
        "p",
        {},
        "Microwave ovens might scan cooking instructions and thus not make mistakes, refrigerators might reorder milk, etc. Automation would liberate users of these appliances, and give them time for other things."
      ),
      h("p", {}, "Unfortunately, the theory hadn't been worked out fully."),
      h(
        "p",
        {},
        "Adding Internet connectivity to a device is never free-of-charge.  In most cases this was a realm of small, low-CPU-powered devices, with no connectivity, so making them Internet-connected was going to cost money."
      ),
      h(
        "p",
        {},
        "In the 20 years since those original ideas, little has changed."
      ),
      h(
        "p",
        {},
        "Let's consider the microwave oven example.  A microwave would need a pretty simple IoT hardware design, so perhaps $5 in parts cost. The first problem is that the $5 turns into nearer $15 by the time we add the margins for the company making the circuit boards, the company building the product and the retailer that sells it."
      ),
      h(
        "p",
        {},
        "Our next problem is that just having the hardware in our microwave oven isn't sufficient.  We need to make it communicate with servers that know how long, and at what power level, each new type of frozen pizza needs to cook.  That implies servers, it implies dev-ops teams, it implies software engineers, and it implies business development people who persuade pizza manufacturers to provide cooking details for each new product they design."
      ),
      h("p", {}, "The infrastructure side has perhaps cost us another $10 per unit."),
      h("h2", {}, "Nice ideas"),
      h("p", {}, "Smart devices are a little like smart contracts."),
      h(
        "p",
        {},
        "They're great when they \u201Cjust work\u201D, but not so great when people make mistakes.  The 1990s vision of IoT involved lots of network cables, but then we got Wi-Fi, and the wires could go away."
      ),
      h(
        "p",
        {},
        "Anyone who knows the technology understands that microwave ovens and 2.4 GHz Wi-Fi don't play nicely together. Similarly, 5 GHz Wi-Fi and solid walls don't play nicely together."
      ),
      h(
        "p",
        {},
        "While our IoT microwave oven might connect to a home router just fine in 95% of homes, the other 5% wouldn'twork reliably, if at all.  Unlike software that tends to be notoriously unreliable, microwave ovens pretty much just work."
      ),
      h(
        "p",
        {},
        "If they don't, then customers get irate and phone the manufacturer (more costs), they return \u201Cfaulty\u201D devices, they leave bad reviews on Amazon and they vow never to buy that brand again."
      ),
      h(
        "p",
        {},
        "The idea of a smart microwave might still look great on a PowerPoint slide, but the niggling details turn an interesting concept into a liability.  It isn't worth the setup time and $50 to a customer, and the trouble isn't worth it for the manufacturer."
      ),
      h("h2", {}, "Same old story"),
      h("p", {}, "We have the same challenges when thinking about uses for blockchains."),
      h(
        "p",
        {},
        "Not every problem needs a blockchain as a solution.  Blockchains cost money in terms of processing, storage and replication technology.  In the case of a decentralized cryptocurrency, such as Bitcoin, the blockchain-like concept is an essential characteristic to build a viable design, but for other problems we need to ask if the blockchain features are doing something valuable."
      ),
      h(
        "p",
        {},
        "If domestic microwaves aren't an option, then maybe refrigerators might be? Domestic ones have many of the same problems as microwaves, but how about commercial refrigeration?  What if we could connect these devices so that if they broke down we could avoid expensive losses?"
      ),
      h(
        "p",
        {},
        "A large industrial cold store might contain hundreds of thousands of dollars of refrigerated products, so signaling breakdowns and avoiding stock losses must be a valuable problem to solve?"
      ),
      h("p", {}, "The maths is compelling, but the problem is that it was 25 years ago, too."),
      h(
        "p",
        {},
        "While they might not have matched our IoT vision, many companies already found approaches to network these devices a long time ago."
      ),
      h(
        "p",
        {},
        "This example has another subtlety.  Food storage is generally subject to regulations, and many countries require that records are kept of the temperatures at which products were stored."
      ),
      h(
        "p",
        {},
        "Without networking, there would be a need for someone to manually record temperatures every few hours, and this is both expensive and error-prone.  Commercial refrigeration equipment also involves service companies and manufacturers providing on-site repairs, so we have more stakeholders for whom access to data is important."
      ),
      h(
        "p",
        {},
        "A na\xEFve view of the problem might well have ignored them.  Unexpected stakeholders introduce unexpected costs, and may resist changes that do not also offer them substantial benefits."
      ),
      h("p", {}, "The implications for blockchains are very similar."),
      h(
        "p",
        {},
        "If a problem is already being solved, then, even if a blockchain might be useful, we need to ask if it offers enough incremental advantages?  Do we know what all the problems are, including the ones that might not be obvious unless we were domain experts?  Are there stakeholders, such as network architects, security experts, data architects, dev-ops teams, etc., who must change existing systems to adopt a new one?  Are there analytical needs that require big-data, relational, graph, or time-series, views of any data that is being processed?"
      ),
      h("h2", {}, "Forever is a long time"),
      h(
        "p",
        {},
        "Leaving aside specific uses of IoT for a moment, it's worth considering an important characteristic of the devices that were supposed to become smart and connected.  These devices don't get replaced very quickly."
      ),
      h(
        "p",
        {},
        "Most of our connected devices get replaced quite quickly.  Vendors provide support for a few years but then expect users to discard them and buy new ones."
      ),
      h(
        "p",
        {},
        "The problem is we don't do this with most of our electrical items.  We typically only replace them when they fail. By making them connected we introduce entirely new modes of failure."
      ),
      h(
        "p",
        {},
        "One such problem is how do we keep older devices working?  Typically, manufacturers don't receive any form of revenue once a device is sold, so what is the incentive to keep providing software updates once those devices are out of warranty?"
      ),
      h(
        "p",
        {},
        "Another problem is that, even if we might want to pay for updates and bug fixes, it may not be economically feasible to provide them.  Older devices will have less powerful hardware that may not lend itself to new features."
      ),
      h(
        "p",
        {},
        "A final problem is that our manufacturer may not have considered the possibility of a device becoming compromised."
      ),
      h(
        "p",
        {},
        "The recent Mirai botnet has undoubtedly highlighted these issues, but how many toaster manufacturers have the level of security engineering skill to secure, and continue to secure, an IoT device against advanced adversaries?"
      ),
      h(
        "p",
        {},
        "These are all governance problems.  How will our IoT device, once installed, continue to function, and avoid becoming a problem?"
      ),
      h("h2", {}, "Parallel problems"),
      h(
        "p",
        {},
        "The parallels for blockchains are, again, striking."
      ),
      h(
        "p",
        {},
        "With Bitcoin, the block size has seen miners incentivized to restrict block expansion to maximize mining rewards, while the ",
        h("a", { href: "https://www.coindesk.com/understanding-dao-hack-journalists" }, "DAO hack"),
        " incentivized users to want their coins back."
      ),
      h(
        "p",
        {},
        "When we consider the deployment of blockchains into other types of applications, then how are these sorts of governance issues to be reviewed and resolved?  If we consider systems that might potentially operate for many years, then what does it mean to have immutable storage indefinitely?  How will the inevitable mistakes of various human users be corrected?  What are the incentives for participants to keep systems running correctly?"
      ),
      h(
        "p",
        {},
        "In the case of commercial deployments, what are the implications for rolling out updates and upgrades across organizations that have different priorities?"
      ),
      h("h2", {}, "A new hype?"),
      h(
        "p",
        {},
        "Our journey through the history of IoT has been somewhat cautionary, and there are many unanswered questions, but this is not the story of a lost war."
      ),
      h(
        "p",
        {},
        "Twenty years ago, Internet radio stations had barely surfaced, TiVo had yet to produce a set-top box, and ideas of 4k video on-demand streaming were distant science fiction."
      ),
      h(
        "p",
        {},
        "Fast forward 20 years later, and designers have leveraged advances in processing, power management, wide-area networking, wireless networking, storage, display technologies and distributed cloud storage, to construct new end-user experiences."
      ),
      h(
        "p",
        {},
        "Smart TVs and smartphones are barely recognizable from earlier CRT TVs and crude mobile phones, and yet both have a clear lineage to the original idea of connected things."
      ),
      h("p", {}, "IoT arrived but not quite as expected."),
      h(
        "p",
        {},
        "Business empires based on the concepts of VHS tapes and DVDs were displaced.  Users gained access to far more content, with lower costs and dramatically improved convenience.  IoT technologies were not used in isolation, but were combined to solve real problems for the people who ultimately pay for the solutions, customers."
      ),
      h("p", {}, "This, then, is part of the challenge for blockchains."),
      h(
        "p",
        {},
        "The commercial refrigeration systems slowly changed too.  Internet connectivity was a better approach than the ad-hoc methods used 20 years ago, and so replaced earlier designs when they reached natural replacement cycles.  Likewise, mature and more capable blockchain designs may well have opportunities to replace other technologies in the future."
      ),
      h(
        "p",
        {},
        "Bitcoin stands as the first example of a viable blockchain solution to a well-defined problem.  As with many first-generation designs it has also served to highlight challenges, and its ultimate success or failure will depend on its ability to see them resolved."
      ),
      h("p", {}, "The challenge for other blockchains might be similar, but won't be the same."),
      h(
        "p",
        {},
        "Blockchain technology will be well served by recognizing, and confronting the hardest problems that we know about, rather than imagining that we can resolve them later.  We know that issues such as security, privacy, deployment and governance need to be addressed."
      ),
      h(
        "p",
        {},
        "At the same time, we must avoid the temptation to use blockchains, and blockchain ideas, where they are not the best solutions, and champion those where they are."
      )
    ];
  }
  var blogPost_201701061400 = new BlogPost(
    "What IoT history reveals about blockchain's challenges",
    "2017-01-06 14:00",
    "/blog/2017-01-06-1400",
    blogArticle_201701061400
  );

  // src/blog/2020-01-27-2336/2020-01-27-2336.js
  function blogArticle_202001272336() {
    return [
      h(
        "p",
        {},
        "A few days ago I decided to move away from my old Joomla-based blog site and set up my own static web site.  After some investigation I settled on using Hugo.  I was impressed by some of the web sites I'd found that were using it.  Also my expertise in CSS, and JavaScript were pretty limited and Hugo didn't appear to need much of either."
      ),
      h(
        "p",
        {},
        'As I started to build the site I found myself treading a famililar path.  Every example I looked at did things in different ways so it was hard to work out how to put the learnings together in a coherent way.  As is the norm for busy engineers, the developers got things to work and then moved on to other things.  "Documentation is boring!"'
      ),
      h(
        "p",
        {},
        "In some instances I could look at git histories and discern more of the developers' intents, but all too often I ended up with a frustrating effort to reverse engineer what they'd ended up building.  It's not like this was a surprise - I've done this dozens, maybe hundreds of times.  But I wish, as an industry, we could do better.  I've worked with many engineers and tried to persuade them we should, so maybe I can persuade you too?"
      ),
      h("h2", {}, "Names matter"),
      h(
        "p",
        {},
        'As the joke goes, "there are two hard problems in computer sciences, cache invalidation, naming things, and off-by-one errors".'
      ),
      h(
        "p",
        {},
        "When it comes to understanding something, however, names really matter.  We want them to make sense and not be surprising.  The original theme files I'd picked up had some rather odd names.  For example the ",
        h("code", {}, "<head>"),
        " tag had a partial HTML snippet file called ",
        h("code", {}, "header.html"),
        " while the HTML header was called ",
        h("code", {}, "head.html"),
        ".  These are things that confused me over the last couple of days and would have done so again.  They weren't big sources of confusion, but every incremental time would have been more time wasted for me.  More importantly, they'd have been an incremental source of confusion to anyone else who read the code for this site."
      ),
      h("h2", {}, "Good source code is as simple as possible"),
      h(
        "p",
        {},
        "Developers seem to love to go to one of two extremes.  They either refactor nothing and leave large rambling blocks of code that are impossible to follow, or they refactor everything, turning trivial one and two line snippets into functions or methods."
      ),
      h(
        "p",
        {},
        "On the first extreme, large amounts of duplicate code is just a recipe for future problems.  Bugs don't end being fixed everywhere, or there's just way more code to understand than we should want.  If two blocks of code do the same thing then make it one block of code and save future maintainers from having to guess if they're the same or not."
      ),
      h(
        "p",
        {},
        "In the other extreme, if refactoring will result in more lines of source code than not, then is it really making life easier for anyone?"
      ),
      h("h2", {}, "Great source code is consistent"),
      h(
        "p",
        {},
        "One of the things that's most frustrating to me is lack of consistency.  Doing the same thing in different ways just makes it harder for everyone who comes after you.  Future readers will wonder what makes one different to the other and worry about what they've not understood."
      ),
      h(
        "p",
        {},
        "Great software, like great architecture, or art, should feel coherent.  It should appear to be the work of a single mind.  It has a singular style."
      ),
      h(
        "p",
        {},
        "It doesn't really matter what the style is, it should just always feel the same.  When ",
        h("code", {}, "addFoo()"),
        ", ",
        h("code", {}, "subtractFoo()"),
        ", and ",
        h("code", {}, "multiplyFoo()"),
        ", are suddenly joined by ",
        h("code", {}, "FooDivide()"),
        ", the inconsistency is grating.  We're left wondering how and why this last one is different from the others.  Even if we eventually conclude it isn't, we've expended unecessary time and mental effort thinking about it."
      ),
      h("h2", {}, "Self documenting code completely misses the point of comments"),
      h(
        "p",
        {},
        "This also brings me to a rant about commenting of code.  There's a school of thought that \u201Cself documenting\u201D code is the best approach, but I'd argue that that's ridiculous.  How do we tell the difference between buggy code and correct code?  How do we tell our future selves about things that we shouldn't do because they don't work well?  How do we hint at things that might want to happen in the future?  "
      ),
      h(
        "p",
        {},
        "Yes, the commit logs in git, or whatever revision control system we're using, might provide some hints, but when was the last time you saw a long commentary about why code is the way it is in those logs?"
      ),
      h(
        "p",
        {},
        "There are certainly bad comments.  There are those that don't match up with the code, or just describe obvious syntactic characteristics.  But just because it's possible to write bad comments doesn't offset the huge benefit of good ones."
      ),
      h(
        "p",
        {},
        "Great comments explain why the code is the way it's written.  They describe the paths not taken and the dragons that might be lurking there.  They provide the backstory for the code and can offer references to papers, articles, or standards.  They help a future reader understand all the thinking that went into it."
      ),
      h("h2", {}, "Unconvinced? Here's a test"),
      h(
        "p",
        {},
        "I don't expect to have convinced anyone yet, but here's a test that might help persuade you.  Take any significant piece of software that you've written and find another developer who doesn't already understand it.  Your role is to answer any questions about your software, while their role is to read it and explain back to you how each part works."
      ),
      h(
        "p",
        {},
        "What I've always find interesting about doing this (and it works much better in person) is the dialogue that invariably happens.  You reader will likely seek clarifications.  Often they'll end up saying to themselves things like \u201Cerr, oh, hang on, no, that's not what it's doing\u201D.  Sometimes they're completely baffled.  Occasionally they'll find bugs.  Almost never do they scroll quickly through the code just describing it!"
      ),
      h(
        "p",
        {},
        "Of course, in this test, you're the one that wrote the code, so you understand it completely.  As you watch your counterpart struggle, though, you may find yourself offering insights that are neither obvious from the code structure, nor in the comments."
      ),
      h("h2", {}, "Source code needs to be written for people"),
      h(
        "p",
        {},
        "So, finally, here's the thing that I wish more software developers thought about."
      ),
      h(
        "p",
        {},
        "The objective of writing good source code isn't to make a compiler or interpreter happy, it's for the benefit of future readers.  Those people are our most important audience."
      )
    ];
  }
  var blogPost_202001272336 = new BlogPost(
    "Understanding other people's code",
    "2020-01-27 23:36",
    "/blog/2020-01-27-2336",
    blogArticle_202001272336
  );

  // src/blog/blog.js
  var blogContent = [
    blogPost_201403090000,
    blogPost_201403120000,
    blogPost_201403170000,
    blogPost_201403230000,
    blogPost_201404030000,
    blogPost_201404280000,
    blogPost_201404300000,
    blogPost_201405200000,
    blogPost_201405240000,
    blogPost_201406050000,
    blogPost_201406100000,
    blogPost_201406150000,
    blogPost_201406230000,
    blogPost_201406300000,
    blogPost_201411020000,
    blogPost_201411110000,
    blogPost_201411120000,
    blogPost_201412050000,
    blogPost_201501180000,
    blogPost_201512190000,
    blogPost_201512200000,
    blogPost_201601050000,
    blogPost_201602030000,
    blogPost_201701061400,
    blogPost_202001272336
  ];
  function navPrevNext(prevStr, prevHRef, nextStr, nextHRef) {
    return h(
      "nav",
      { className: "prev-next" },
      h("h2", {}, "More blog posts"),
      h(
        "table",
        { className: "meta-nav" },
        h(
          "tr",
          {},
          h(
            "td",
            { className: "prev" },
            !prevStr ? "" : h(
              "a",
              {
                className: "icon",
                href: prevHRef,
                onClick: (e) => navigateEvent2(e, prevHRef)
              },
              chevronLeftIcon()
            )
          ),
          h(
            "td",
            { className: "prev-text" },
            !prevStr ? "" : h("a", { href: prevHRef, onClick: (e) => navigateEvent2(e, prevHRef) }, prevStr)
          ),
          h(
            "td",
            { className: "next-text" },
            !nextStr ? "" : h("a", { href: nextHRef, onClick: (e) => navigateEvent2(e, nextHRef) }, nextStr)
          ),
          h(
            "td",
            { className: "next" },
            !nextStr ? "" : h(
              "a",
              {
                className: "icon",
                href: nextHRef,
                onClick: (e) => navigateEvent2(e, nextHRef)
              },
              chevronRightIcon()
            )
          )
        )
      )
    );
  }
  function blogArticlePage(index) {
    let prevArticle = index > 0 ? blogContent[index - 1] : null;
    let thisArticle = blogContent[index];
    let nextArticle = index < blogContent.length - 1 ? blogContent[index + 1] : null;
    let prevTitle = prevArticle ? prevArticle.title : null;
    let prevHRef = prevArticle ? prevArticle.hRef : null;
    let nextTitle = nextArticle ? nextArticle.title : null;
    let nextHRef = nextArticle ? nextArticle.hRef : null;
    return h(
      "div",
      { className: "container" },
      pageHeader(),
      h(
        "article",
        { className: "article" },
        articleTitle(thisArticle.title, thisArticle.dateTime),
        ...thisArticle.articleFunction()
      ),
      navPrevNext(prevTitle, prevHRef, nextTitle, nextHRef),
      pageFooter()
    );
  }
  function blogLink(href, title, meta) {
    return h(
      "div",
      { className: "blog-post" },
      h(
        "span",
        { className: "title" },
        h("a", { href, onClick: (e) => navigateEvent2(e, href) }, title)
      ),
      h("span", { className: "meta" }, meta)
    );
  }
  function blogPage() {
    let pageView = [];
    let headlineYear = "";
    for (let i = blogContent.length - 1; i >= 0; i--) {
      const { hRef, title, dateTime } = blogContent[i];
      const blogYear = dateTime.slice(0, 4);
      if (headlineYear != blogYear) {
        headlineYear = blogYear;
        pageView.push(h("h2", {}, headlineYear));
      }
      pageView.push(blogLink(hRef, title, dateTime));
    }
    return h(
      "div",
      { className: "container" },
      pageHeader(),
      h(
        "article",
        { className: "article" },
        articleTitle("Blog posts"),
        h("div", { className: "blog-posts" }, ...pageView)
      ),
      pageFooter()
    );
  }
  function getBlogRoutes() {
    let blogRoutes = {};
    for (let i = 0; i < blogContent.length; i++) {
      blogRoutes[blogContent[i].hRef] = () => blogArticlePage(i);
    }
    return blogRoutes;
  }

  // src/projects/projects.js
  function projectsPage() {
    return h(
      "div",
      { className: "container" },
      pageHeader(),
      h(
        "article",
        { className: "article" },
        articleTitle("Open source projects", "2024-06-10 21:30"),
        h(
          "p",
          {},
          "I've been involved in building open source software since the early 90s.  Unfortunately I can't find links for some of them, but here are ones for which I do."
        ),
        h("h2", {}, "countdown"),
        h(
          "p",
          {},
          'This one was a programming challenge at r3 to build some software to identify solutions to the "Countdown" numbers game as quickly as possible.  The idea of the game is to take 6 randonly chosen numbers from a set of 24 available numbers (1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 25, 50, 75, 100) and find a way to get to a larger random number in the range of 100 to 999, using only simple addition, subtraction, multiplication, and division.'
        ),
        h(
          "p",
          {},
          " I wrote this one in C++ and spent a few hours coming up with ways to shrink the problem search space: ",
          h(
            "a",
            { href: "" },
            "https://github.com/dave-hudson/countdown"
          ),
          ".  It's pretty quick but I never attempted to tune it to the instruction level!"
        ),
        h("h2", {}, "c8"),
        h(
          "p",
          {},
          'c8 is a high performance arbitrary precision natural numbers, integers, and rational numbers library written in "modern" C++.  The git repo is here: ',
          h(
            "a",
            { href: "https://github.com/dave-hudson/c8" },
            "https://github.com/dave-hudson/c8"
          ),
          ".  There's also a project wiki here: ",
          h(
            "a",
            { href: "https://github.com/dave-hudson/c8/wiki" },
            "https://github.com/dave-hudson/c8/wiki"
          )
        ),
        h(
          "p",
          {},
          "When I built this code I also tracked the development journey on the wiki.  This includes all my notes on how I was performance tuning things, down to the machine instruction level in many cases: ",
          h(
            "a",
            { href: "https://github.com/dave-hudson/c8/wiki/Dev-Notes" },
            "https://github.com/dave-hudson/c8/wiki/Dev-Notes"
          )
        ),
        h("h2", {}, "gcc (Ubicom processor backends)"),
        h(
          "p",
          {},
          "From 2001 to 2012 I maintained the backends for Ubicom's IP2k and Ubicom32 processor family versions of gcc. I no longer have links for the IP2k version, but the 32-bit Ubicom32 version can be found here: ",
          h(
            "a",
            { href: "https://git.codelinaro.org/clo/external-ubicom/ubicom32-toolchain" },
            "https://git.codelinaro.org/clo/external-ubicom/ubicom32-toolchain"
          )
        ),
        h(
          "p",
          {},
          "The Ubicom32 processor family was very unusual.  All versions were heavily multithreaded (between 8 and 12 threads), executing in a single pipeline.  Threads were interlaced so each instruction could be operating on a separate thread context.  Used carefully this could make things incredibly efficient as most pipeline hazards could be hidden by other threads.  The ISA was also very unusual in that it supported a memory-to-memory architecture where many instructions could include 2 memory references in a single 32-bit RISC instruction."
        ),
        h("h2", {}, "Liquorice"),
        h(
          "p",
          {},
          "Liquorice was a very small operating system and IPv4 network stack, written entirely from scratch.  It was designed to run on 8-bit Atmel AVR and 32-bit x86 processors."
        ),
        h(
          "p",
          {},
          "The project ran through much of 2000, but I stopped working on the public version when I joined Ubicomat the end of 2000.  The project evolved as a commercial operating system and network stack called ipOS.  While ipOS started out very similar to Liquorice, it quickly diverged as we simplified concepts eliminated the software threading, and implemented much better design patterns to support some of the networking.  Liquorice has some interesting ideas, and is a very small IP stack: ",
          h(
            "a",
            { href: "https://github.com/dave-hudson/liquorice" },
            "https://github.com/dave-hudson/liquorice"
          )
        ),
        h("h2", {}, "VSTa"),
        h(
          "p",
          {},
          "VSTa (short for Valencia's Simple Tasker) was a self-hosting microkernel operating system build in the 1990s.  It had a lot of novel ideas, a simple and elegant kernel, and featured user-space device drivers and filesystems.  Unusually, it also had a kernel debugger so if anythign went wrong it would drop into the debugger instead of just giving a kernel panic message."
        ),
        h(
          "p",
          {},
          "It had a services model inspired by Plan 9, and had a largely complete GNU toolchain so it was capable of building itself.  I was largely active in updating libc, porting tools, writing drivers, and performance tuning the kernel form 1993 to 1995"
        ),
        h(
          "p",
          {},
          "Andy Valencia (the guy behind the project) has an archive of the code and the mailing lists here: ",
          h(
            "a",
            { href: "https://sources.vsta.org:7100/vsta/index" },
            "https://sources.vsta.org:7100/vsta/index"
          )
        ),
        h("h2", {}, "mkdosfs (Linux)"),
        h(
          "p",
          {},
          "I wrote the first 2 versions of mkdosfs back in 1993 and 1994.  Eventually other maintainers folded this into the dosfstools repo, and can be found here (my original notes are in the change logs): ",
          h(
            "a",
            { href: "https://github.com/dosfstools/dosfstools" },
            "https://github.com/dosfstools/dosfstools"
          )
        )
      ),
      pageFooter()
    );
  }

  // src/app.js
  console.log("SCRIPT RELOADED!");
  function homePage() {
    return h(
      "div",
      { className: "container" },
      pageHeader(),
      h(
        "article",
        { className: "article" },
        articleTitle("davehudson.io"),
        h(
          "p",
          {},
          "Welcome to my (Dave Hudson's) space in the Internet!"
        ),
        h("h2", {}, "What's new?"),
        h(
          "p",
          {},
          "Pretty much everything on this site is currently being reworked.  I will also be adding some new blog posts about the JavaScript engine I built to serve up this site."
        ),
        h("h2", {}, "hashingit.com"),
        h(
          "p",
          {},
          "The site started out as my blog about Bitcoin mining under the original site name hashingit.com."
        ),
        h(
          "p",
          {},
          "If you've arrived here via an old link from the hashingit.com blog, please take a look at ",
          h("a", { href: "/blog", onClick: (e) => navigateEvent2(e, "/blog") }, "Blog"),
          ".  You should find all the original articles there."
        ),
        h("h2", {}, "Projects"),
        h(
          "p",
          {},
          "Over many years I've been involved with a lot of open source projects.  You can find more details at ",
          h("a", { href: "/projects", onClick: (e) => navigateEvent2(e, "/projects") }, "Projects"),
          "."
        )
      ),
      pageFooter()
    );
  }
  function notFoundPage(path) {
    return h(
      "div",
      { className: "container" },
      pageHeader(),
      h(
        "article",
        { className: "article" },
        articleTitle(`404: Page "${path}" not found`),
        h("p", {}, "This is unlikely to be the page you were looking for!"),
        h(
          "p",
          {},
          "If you've arrived here via an old link from the hashingit.com blog, please take a look at ",
          h("a", { href: "/blog", onClick: (e) => navigateEvent2(e, "/blog") }, "Blog"),
          ".  You should find all the original articles there."
        )
      ),
      pageFooter()
    );
  }
  var routes = {
    "": homePage,
    "/about": aboutPage,
    "/projects": projectsPage,
    "/blog": blogPage
  };
  var rootVNode = null;
  function handleLocation() {
    let path = window.location.pathname;
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    let pageFunction = routes[path];
    if (pageFunction === void 0) {
      pageFunction = () => notFoundPage(path);
    }
    const newVNode = pageFunction();
    const app = document.querySelector("#app");
    updateElement(app, null, rootVNode, newVNode, 0);
    rootVNode = newVNode;
    console.log(`navigated to ${path}`);
  }
  function navigateEvent2(e, path) {
    e.preventDefault();
    const scrollPosition = {
      y: window.scrollY,
      x: window.scrollX
    };
    window.history.pushState({ scrollPosition }, "", path);
    handleLocation();
    window.scrollTo(0, 0);
  }
  function routeInit() {
    const blogRoutes = getBlogRoutes();
    Object.assign(routes, blogRoutes);
    window.onpopstate = (e) => {
      handleLocation();
      if (!e.state) {
        window.scrollTo(0, 0);
      } else {
        const scrollPosition = e.state.scrollPosition;
        window.scrollTo(scrollPosition.x, scrollPosition.y);
      }
    };
    handleLocation();
  }
  document.addEventListener("DOMContentLoaded", routeInit());
})();
