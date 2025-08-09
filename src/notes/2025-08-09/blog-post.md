# Structuring my research notes

A recurring problem throughout my career has been finding effective ways to keep track of all my research notes
as I work on a new problem.

This week I'm going to try something new and add them to this site (davehudson.io).  We'll have to see if this
works or not!

## Things I tried before

In the past, I have tried putting notes on a wiki (e.g.
[the `c8` wiki](https://github.com/dave-hudson/c8/wiki/Dev-Notes)).  For a while I stored them all in Notion.
I've also tried putting them on a Kindle Scribe.

More traditionally, I have dozens and dozens of hardbacked notebooks where I've handwritten everything about a
project (I still do like handwritten notes).

Each of these has had some positives, but ultimately none of them has worked as well as I'd like.

### Handwritten notes

Pros:

- organic and low friction.

Cons:
- pretty-much write-only because they're impossible to index, cross-link, or search
- not practical when I'm travelling (the old books are always somewhere else)
- can't store code or files
- impossible to share

### Wiki approach

Pros:

- solves the code and file storage problem
- easy to share access (these are open source notes so this is important!)

Cons:

- high friction because it's hard to manually edit and maintain all the links
- content is constrained to whatever the wiki platform supports (e.g. syntax highlighting obscure code/data formats)
- limited ability to style content how I'd like it

### Notion

Pros:

- had a nice mobile UI and worked everywhere.

Cons:

- same content limits as wikis
- same styling issues as wikis
- the syncing isn't reliable enough and I got fed up having to manually fix things up
- still fairly high friction to use
- difficult to widely share access

## What I'm doing this time

What I'm going to do now is a little different.  It's something I would never have attempted before because
it would have had all the same problems as wikis and Notion.  I'm now going to add all my notes to this
site, but have AI do most of the heavy lifting.

My first two notes give some hints about how I plan to make this work (see
[notes/2025-08-07](notes/2025-08-07) and [notes/2025-08-08](notes/2025-08-08)).

Let's look at the various problems and give them a rating!

### Open access (sharing)

This site has open access so it makes it easy for people to find and read the notes.  That also helps me because
I've always got access to this site on all my devices and when I'm travelling.

Rating: **A** - checks all the boxes

### Sharing code and files

This one is also easy - I can embed code into notes and include files.  Importantly I can leverage AI to help
me remove sources of friction in doing this.  An example is in the notes from Thursday
([notes/2025-08-07](notes/2025-08-07)) where I had an LLM rework my file embedding code into a simple component
that fits into this site's very simple virtual DOM implementation.

Rating: **A** - also checks all the boxes

### Flexible styling

One of the nice things about having an AI maintain the site is it's able to make styling changes for me.  This
isn't always perfect, but it's surprisingly good.  There are several example of this from Thursday's notes again.

This approach means I'm not constrained by anyone else's sense of how things should look, and I can do completely
custom things if necessary.

The site already uses custom syntax highlighting of code, and as pretty-much the whole site is built using
TypeScript then this opens up styling almost anything I can imagine.

Rating: **A** - yes!

### Ease of updating (friction)

There is a certain amount of work involved in typing notes as I go along, and this always seems less satisfying
that handwriting notes.  The upside is in capturing code fragments, console outputs, etc., I can record
far more information.  Ultimately, this makes a small amount of friction well worthwhile.

Previously, this would have been a problem.  There wouldn't have been a small amount of friction, there'd have
been a lot of it.

The current site design means adding a new page actually involves creating a directory,
creating a file, and modifying 3 other files.  That new file would also involve quite a lot of HTML-like markup.

Fortunately the software I've been building for the last 9 months (Humbug) provides its LLMs with all the tools
they need to take on this sort of task without much supervision.  As an added bonus, the AI can read content
from a Markdown file and create the new notes page based on that.  That means all I have to do is keep my notes
in a Markdown file and tell the LLM its contents when I ask for the new page.

A first version of the prompt is in [notes/2025-08-08](notes/2025-08-08).

Rating: **B** - not perfect, but workable for now, and can be improved over time

### Indexing and searching

I've not looked at a solution for this yet, but this feels like AI will make this fairly easy to do in the
future!

Rating: **F** - you can't win them all :-)

## Wrapping up

Only time will tell if this approach works well or not.  I'm hopeful, however, that if I'm not doing exactly
this in a few months then it will be something derived from it.

You might ask why I'm suddenly so keen to be sharing my research notes this way, but that's a story for next time!
