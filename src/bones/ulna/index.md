{% from "templates/bony_landmarks.jinja" import bony_landmarks %}
{% from "templates/figure.jinja" import figure %}
{% from "templates/insertions.jinja" import insertions %}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Gray213.png/512px-Gray213.png?20050901191340" %}
{% set alt = "Gray213" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Gray213.png'>Henry Vandyke Carter</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Gray213.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Gray214.png/512px-Gray214.png?20070123213145" %}
{% set alt = "Gray214" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Gray214.png'>Henry Vandyke Carter</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Gray214.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

## Bony Landmarks

{{ bony_landmarks('ulna') }}

## Muscle Insertions <a id="insertions" href="#insertions"><small>#</small></a>

{{ insertions('ulna') }}

## Muscle Origins

### By Bony Landmarks

* **Coronoid Process ({{ linktitle('medial') }} border)**
  * {{ linktitle('protrs') }} (ulnar head)

* **{{ linktitle('posterior') }} border of ulnar shaft**
  * {{ linktitle('fcu') }} (ulnar head)

* **Shaft (interosseous border)**
  * Extensor indicis (via interosseous membrane attachment)

* **Shaft ({{ linktitle('posterior') }} surface)**
  * Extensor pollicis longus (via interosseous membrane attachment)

* **Supinator crest (proximal ulna)**
  * Supinator

## Examples

### Styloid Process

<img
src="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/bones/ulna-0000.jpg"
alt="Diogenes, Jean-Leon Gerome, 1860"
loading="lazy"/>

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Ulna)
