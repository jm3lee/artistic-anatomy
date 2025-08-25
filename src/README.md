---
author: Brian Lee
---
`alias r='make -f redo.mk'`

To start a local nginx to view pandoc output, run

```sh
r up
```

then, go to http://localhost to view a local copy of the book.

## Docker

To login to docker registry on DigitalOcean:

```sh
doctl auth init       # one time setup
docker registry login
```
