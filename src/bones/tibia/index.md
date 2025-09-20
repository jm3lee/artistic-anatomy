{% from "src/templates/macros.jinja" import insertions, origins, figure, anchor %}

## Illustrations

{% set src = "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/grays/Gray258.webp" %}
{% set alt = "Gray258" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Gray258.png'>Henry Vandyke Carter</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Gray258.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href
) }}

## Muscle Origins {{ anchor('origins') }}

{{ origins('tibia') }}

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('tibia') }}

## Notes

No other major muscles insert directly on the tibia itself.
The {{ linktitle('soleus') }} originates on the posterior surface of the tibia
and fibula along the interosseous membrane but inserts primarily on the tarsal
bones rather than the tibia.

## References

* {{ linktitle('tibia-wikipedia') }}
* Richer, plate 27
