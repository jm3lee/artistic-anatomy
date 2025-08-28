{% from "templates/figure.jinja" import figure %}

## Summary

The infraclavicular {{ link('fossa') }} is a small, triangular depression just below
the lateral third of the {{ linkicon('clavicle') }}, between the {{ linkicon('pecmaj') }}
and {{ linkicon('dt') }} muscles.  It marks the uppermost part of the
deltopectoral groove and is most visible when the arm is slightly abducted.

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/5/54/Gray1194.png?20110825210459" %}
{% set alt = "Diagram depicting Torticollis" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Gray1194.png'>Henry Vandyke Carter</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Gray1194.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

## References

- {{ linktitle('dt') }}
- {{ linktitle('pecmaj') }}
- {{ linktitle('gf') }}, 144, 157.
- [Wikipedia](https://en.wikipedia.org/wiki/Infraclavicular_fossa)
