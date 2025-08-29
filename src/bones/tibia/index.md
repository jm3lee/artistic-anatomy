{% from "templates/insertions.jinja" import insertions %}
{% from "templates/origins.jinja" import origins %}
{% from "templates/figure.jinja" import figure %}

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

## Muscle Origins <a id="origins" href="#origins"><small>#</small></a>

{{ origins('tibia') }}

## Muscle Insertions <a id="insertions" href="#insertions"><small>#</small></a>

{{ insertions('tibia') }}

## Notes

No other major muscles insert directly on the tibia itself.
The {{ linktitle('soleus') }} originates on the posterior surface of the tibia
and fibula along the interosseous membrane but inserts primarily on the tarsal
bones rather than the tibia.

## References

* [Tibia (Wikipedia)](https://en.wikipedia.org/wiki/Tibia)
* Richer, plate 27
