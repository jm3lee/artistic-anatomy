{% from "templates/translations.jinja" import translations %}
{% from "templates/insertions.jinja" import insertions %}
{% from "templates/origins.jinja" import origins %}
{% from "templates/bony_landmarks.jinja" import bony_landmarks %}

## Illustrations

<figure>
<a href="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/richer026.webp">
<img
src="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/richer026.webp"
alt="Richer, Artistic Anatomy, Plate 19"
loading="lazy"/>
<figcaption>
Richer, Artistic Anatomy, Plate 19
</figcaption>
</a>
</figure>

<figure>
<a href="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/grays/Gray207.png">
<img
src="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/grays/Gray207.png"
alt="Gray's Anatomy: Muscle attachment points on humerus"
loading="lazy"/>
<figcaption>
Gray's Anatomy: Muscle attachment points on humerus
</figcaption>
</a>
</figure>

Source: [Wikipedia](https://upload.wikimedia.org/wikipedia/commons/a/ad/Gray207.png)


## Bony Landmarks

{{ bony_landmarks('humerus') }}

## Muscle Origins {{'{#origins}'}}

{{ origins('humerus') }}

## Muscle Insertions {{'{#insertions}'}}

{{ insertions('humerus') }}

{{ translations('humerus') }}

## Notes

{{ linktitle('subscp') }} is the only {{ linktitle('rotator-cuff') }} muscle that inserts on the anterior
surface of the humerus.

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Humerus)
