{% from "src/templates/summary.jinja" import summary %}
{% from "src/templates/figure.jinja" import figure %}

{{summary("pecmaj")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Gray410.png/512px-Gray410.png?20060722170416" %}
{% set alt = "pectoralis major muscle" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Gray410.png'>Henry Vandyke Carter</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Gray410.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

## References

- {{ linktitle('infraclavicular-fossa') }}
- [Wikipedia](https://en.wikipedia.org/wiki/Pectoralis_major)
