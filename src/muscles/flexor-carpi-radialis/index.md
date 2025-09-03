{% from "src/templates/summary.jinja" import summary %}
{% from "src/templates/figure.jinja" import figure %}

{{summary("fcr")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flexor-carpi-radialis.png/128px-Flexor-carpi-radialis.png?20070724213721" %}
{% set alt = "Flexor-carpi-radialis" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Flexor-carpi-radialis.png'>Grays Anatomy, modified by en:user Selket</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Flexor-carpi-radialis.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=128
) }}

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Flexor_carpi_radialis_muscle)
