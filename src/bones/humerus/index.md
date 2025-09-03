{% from "src/templates/translations.jinja" import translations %}
{% from "src/templates/insertions.jinja" import insertions %}
{% from "src/templates/origins.jinja" import origins %}
{% from "src/templates/bony_landmarks.jinja" import bony_landmarks %}
{% from "src/templates/figure.jinja" import figure %}
{% from "src/templates/anchor.jinja" import anchor %}

## Illustrations

{% set src = "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/richer026.webp" %}
{% set alt = "Richer, Artistic Anatomy, Plate 19" %}
{% set caption = "Richer, Artistic Anatomy, Plate 19" %}
{% set href = "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/richer026.webp" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href
) }}

{% set src = "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/grays/Gray207.png" %}
{% set alt = "Gray's Anatomy: Muscle attachment points on humerus" %}
{% set caption = "Gray's Anatomy: Muscle attachment points on humerus" %}
{% set href = "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/grays/Gray207.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href
) }}

Source: [Wikipedia](https://upload.wikimedia.org/wikipedia/commons/a/ad/Gray207.png)


## Bony Landmarks

{{ bony_landmarks('humerus') }}

## Muscle Origins {{ anchor('origins') }}

{{ origins('humerus') }}

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('humerus') }}

{{ translations('humerus') }}

## Notes

{{ linktitle('subscp') }} is the only {{ linktitle('rotator-cuff') }} muscle that inserts on the anterior
surface of the humerus.

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Humerus)
