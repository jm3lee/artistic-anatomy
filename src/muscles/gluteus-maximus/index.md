{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import summary, figure %}

{{summary("gmax")}}

## Illustrations

<img
src="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/muscles/gmax-0000.png"
alt="Albinus, gluteus maximus"
loading="lazy"/>

## Examples

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Raffaello_Santi_-_Cupid_and_the_Three_Graces_%28detail%29.jpg/512px-Raffaello_Santi_-_Cupid_and_the_Three_Graces_%28detail%29.jpg?20141003042450" %}
{% set alt = "Raffaello Santi - Cupid and the Three Graces (detail)" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Raffaello_Santi_-_Cupid_and_the_Three_Graces_(detail).jpg'>Raphael</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Raffaello_Santi_-_Cupid_and_the_Three_Graces_(detail).jpg" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

{% set src = "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/artists/raphael/resized/400x/1157295-1724769870.webp" %}
{% set alt = "Raphael, The Three Graces c.1517-18" %}
{{ figure(
    src=src,
    alt=alt
) }}

## References

* {{ linktitle('hc77') }}, 40, 44, 48-49.
  * **38**: Rubens. (A). Back view.
  * **50**: Raphael, the Three Graces, (D). 3/4 back view.
{% endblock %}
