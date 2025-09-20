{% from "src/templates/macros.jinja" import insertions, bony_landmarks, figure, anchor %}

The clavicle, or collar bone, is a slender S-shaped bone that connects the
sternum to the scapula. Acting as a strut, it keeps the upper limb away from the
thorax and allows greater range of motion at the shoulder.

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Clavicle_-_anterior_view.png/512px-Clavicle_-_anterior_view.png?20130117095616" %}
{% set alt = "poooo" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Clavicle_-_anterior_view.png'>Anatomography</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Clavicle_-_anterior_view.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

## Bony Landmarks

{{ bony_landmarks('clavicle') }}

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('clavicle') }}

## Related Muscles

- {{ linktitle('dt') }}
- {{ linktitle('pecmaj') }}
- {{ linktitle('trz') }}

## References

* {{ linktitle('gf') }}, 17
* {{ linktitle('clavicle-wikipedia') }}
