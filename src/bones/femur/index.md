{% extends "src/templates/template.html.jinja" %}
{% block content %}
:robot:
{% from "src/templates/macros.jinja" import translations, insertions, origins, bony_landmarks, figure, anchor %}

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

## Muscle Origins {{ anchor('origins') }}

{{ origins('femur') }}

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('femur') }}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Femur)
* {{ linktitle('gf') }}, 32–34
* [Richer, Plate 26](https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate26.webp)
{% endblock %}
