def get_origins(name):
    """Return the origins list for the given entry.

    Origins were previously stored at the top level of the data files but
    now live under the ``anatomy`` block.
    """
    try:
        from press.jinja_helpers import get_desc
    except Exception as exc:  # pragma: no cover - fallback for tests
        raise RuntimeError('get_desc is unavailable') from exc
    return get_desc(name)['anatomy']['origins']
