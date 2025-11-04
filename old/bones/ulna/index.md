{% from "src/templates/macros.jinja" import bony_landmarks, insertions, anchor %}

## Illustrations

{{ figure("ulna-fig1") }}

{{ figure("ulna-fig2") }}

## Bony Landmarks

{{ bony_landmarks('ulna') }}

## Muscle Origins {{ anchor('origins') }}

### By Bony Landmarks

* **Coronoid Process ({{ linktitle('medial') }} border)**
  * {{ linktitle('pronator-teres') }} (ulnar head)

* **{{ linktitle('posterior') }} border of ulnar shaft**
  * {{ linktitle('flexor-carpi-ulnaris') }} (ulnar head)

* **Shaft (interosseous border)**
  * Extensor indicis (via interosseous membrane attachment)

* **Shaft ({{ linktitle('posterior') }} surface)**
  * Extensor pollicis longus (via interosseous membrane attachment)

* **Supinator crest (proximal ulna)**
  * Supinator

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('ulna') }}

## Examples

### Styloid Process

<img
src="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/bones/ulna-0000.jpg"
alt="Diogenes, Jean-Leon Gerome, 1860"
loading="lazy"/>

## References

- {{ linktitle('ulna-wikipedia') }}
