:robot:
{% from "src/templates/translations.jinja" import translations %}
{% from "src/templates/insertions.jinja" import insertions %}
{% from "src/templates/origins.jinja" import origins %}
{% from "src/templates/bony_landmarks.jinja" import bony_landmarks %}
{% from "src/templates/figure.jinja" import figure %}
{% from "src/templates/anchor.jinja" import anchor %}

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

## Muscle Origins {{ anchor('origins') }}

{{ origins('femur') }}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Femur)
* {{ linktitle('gf') }}, 32–34
* [Richer, Plate 26](https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate26.webp)
