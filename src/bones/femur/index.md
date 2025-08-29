:robot:
{% from "templates/translations.jinja" import translations %}
{% from "templates/insertions.jinja" import insertions %}
{% from "templates/origins.jinja" import origins %}
{% from "templates/bony_landmarks.jinja" import bony_landmarks %}
{% from "templates/figure.jinja" import figure %}

## Illustrations

{% set src = "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate26.webp" %}
{% set alt = "Richer, Plate 26 showing femur" %}
{% set caption = "Richer, Plate 26" %}
{% set href = "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate26.webp" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href
) }}

## Bony Landmarks

{{ bony_landmarks('femur') }}

## Muscle Insertions

{{ insertions('femur') }}

## Muscle Origins <a id="origins" href="#origins"><small>#</small></a>

{{ origins('femur') }}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Femur)
* {{ linktitle('gf') }}, 32–34
* [Richer, Plate 26](https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate26.webp)
