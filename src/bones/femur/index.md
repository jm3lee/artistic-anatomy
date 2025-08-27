:robot:
{% from "templates/translations.jinja" import translations %}
{% from "templates/insertions.jinja" import insertions %}
{% from "templates/origins.jinja" import origins %}
{% from "templates/bony_landmarks.jinja" import bony_landmarks %}

## Illustrations

<figure>
<a href="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate26.webp">
<img
src="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate26.webp"
alt="Richer, Plate 26 showing femur"
loading="lazy"/>
<figcaption>
Richer, Plate 26
</figcaption>
</a>
</figure>

## Bony Landmarks

{{ bony_landmarks('femur') }}

## Muscle Insertions

{{ insertions('femur') }}

## Muscle Origins {{'{#origins}'}}

{{ origins('femur') }}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Femur)
* {{ linktitle('gf') }}, 32–34
* [Richer, Plate 26](https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate26.webp)
