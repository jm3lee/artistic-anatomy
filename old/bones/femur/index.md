:robot:
{% from "src/templates/macros.jinja" import insertions, origins, bony_landmarks, anchor %}

## Illustrations

{{ figure("femur-fig1") }}

## Bony Landmarks

{{ bony_landmarks('femur') }}

## Muscle Origins {{ anchor('origins') }}

{{ origins('femur') }}

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('femur') }}

## References

* {{ linktitle('femur-wikipedia') }}
* {{ linktitle('gf') }}, 32–34
* [Richer, Plate 26](https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate26.webp)
