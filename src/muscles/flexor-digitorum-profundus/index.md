{% from "templates/summary.jinja" import summary %}
{% from "templates/figure.jinja" import figure %}

{{summary("fdp")}}

The flexor digitorum profundus lies deep to the
{{ link('flexor-digitorum-superficialis') }}. Its broad origin on the ulna and
interosseous membrane sends four tendons to the fingers. Each tendon passes
through the split in the superficial flexor to insert on the distal phalanx,
allowing the fingertips to bend.

It works with {{ link('flexor-digitorum-superficialis') }} to flex the digits
and is an antagonist to the {{ link('extensor-digitorum') }}.

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flexor_digitorum_profundus.png/128px-Flexor_digitorum_profundus.png" %}
{% set alt = "Flexor digitorum profundus" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Flexor_digitorum_profundus.png'>Gray's Anatomy</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Flexor_digitorum_profundus.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=128
) }}

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Flexor_digitorum_profundus_muscle)
