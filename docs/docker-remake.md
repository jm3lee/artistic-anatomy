# docker-remake

`docker-remake` is a helper script used to force a clean rebuild of one or more
Make targets inside the project's Docker environment. It deletes the specified
files or directories and then calls [`docker-make`](../bin/docker-make) with the
same arguments.

## Usage

```bash
bin/docker-remake TARGET...
```

- `TARGET...` — one or more paths or make targets to remove before running
  `docker-make`.

### Example

```bash
# Regenerate the HTML for a specific page
bin/docker-remake build/intro.html
```

This is handy when build artifacts become stale or corrupted and you need to
force Pandoc and the other build steps to recreate them from scratch.

