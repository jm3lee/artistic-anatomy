## Quickstart

1. Edit `docker-compose.yml`. Adjust `image` as necessary. *In the future,
   provide users with templates or wizards. Need examples.*
2. Edit `redo.mk`. Update the list of services.
3. Edit documents under `src/`.
4. Optionally customize `src/pandoc-template.html` for your project.
5. Edit `docker` rule in `redo.mk` if you'd like to push docker images to a
   container registry.

### General Setup

```
alias r='make -f redo.mk'
r seed
r shell-up   # start build container
r up
```

The `shell-up` target launches the `shell` service in the background so that
subsequent builds use `docker compose exec` rather than starting a fresh
container each time. The shell image now runs `bash -c \"sleep infinity\"` by
default so the container remains alive for these `exec` calls.

## template params

- `status`: "Reviewed", "Pending Review"
